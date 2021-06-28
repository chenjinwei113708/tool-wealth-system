import { ParameterizedContext, Next } from 'koa';
import jwt from 'jsonwebtoken';

interface SSOConfig {
  whiteList?: string[];
}

const defaultWhiteList = ['/api/login', '/api/logout'];

const jwtPublicKey = 
`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCq2qGM+NugycKmrypta+tSIvSz
pWZnMagt4fUkDvRlpWNklUGmsX1k3nH/wB5g3Af3VGaUCXdS9PX3cNWL8T9VaJqs
NA2iZQbw3NeKW3hGwCqhJLSF1NmRx+KRaTKfOZnvz9IiHlBxuisCm9uvDVpwQlOz
ltj0k2jirGadwGCLZQIDAQAB
-----END PUBLIC KEY-----
`;

export class SSOError implements Error {
  constructor (private msg: string, private errorCode: number = 500) {
    this.msg = msg;
    this.errorCode = errorCode;
  }

  get name () {
    return 'SSOError';
  }

  get message () {
    return this.msg;
  }

  get code () {
    return this.errorCode;
  }

  toString () {
    return `${this.errorCode},${this.msg}`;
  }
}

export const clearSSOStatus = (ctx: ParameterizedContext) => {
  ctx.cookies.set('sso-token', '', {
    expires: new Date(Date.now() - 1000)
  });
  ctx.cookies.set('sso-username', '', {
    expires: new Date(Date.now() - 1000)
  });
}

export function SSOAuthVerifyMiddleware () {

  return function (ctx: ParameterizedContext, next: Next) {
    if (ctx.ssoLogin && ctx.ssoInfo) {
      return next();
    }
    throw new SSOError('no auth', 203);
  }
}

export default function SSOMid (config?: SSOConfig) {
  const whiteList = config?.whiteList || defaultWhiteList;

  return function (ctx: ParameterizedContext, next: Next) {
    const url = ctx.url;
    if (whiteList.includes(url) || url.indexOf('/api/') !== 0) {
      return next();
    }

    // 检查cookie或者post的信息或者url查询参数或者头信息
    const token =
      ctx.cookies.get('sso-token') ||
      ctx.headers['sso-token'];
    const username = ctx.cookies.get('sso-username') || ctx.headers['sso-username'];

    let ssoLogin = false;
    let ssoInfo = null;
    try {
      if (token) {
        const decode = jwt.verify(token as string, jwtPublicKey, { algorithms: ['RS256'] }) as any;
        if (decode.userInfo?.username === username) {
          ssoInfo = decode.userInfo;
          ssoLogin = true;

          if (!ctx.cookies.get('sso-token') && decode.userInfo.expireAt) {
            ctx.cookies.set('sso-token', token as string, {
              expires: new Date(decode.userInfo.expireAt)
            });
            ctx.cookies.set('sso-username', username as string, {
              expires: new Date(decode.userInfo.expireAt)
            });
          }
        }
      }
    } catch (e) {}

    ctx.ssoLogin = ssoLogin;
    ctx.ssoInfo = ssoInfo;

    return next();
  }
}
