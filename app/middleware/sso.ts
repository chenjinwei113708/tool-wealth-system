import { ParameterizedContext, Next } from 'koa';
import jwt from 'jsonwebtoken';
import nodeUrl from 'url';
import md5 from 'md5';
import axios from 'axios';
import conf from 'conf'

interface SSOConfig {
  whiteList?: string[];
  ssoEnv?: string;
  excludePrefix?: string[];  // 默认会对非 `/api` 开头的请求不进行权限校验，若需对某些开头对url进行权限校验则加上
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

const http = axios.create({});
// 重置
http.interceptors.request.use(config => config);
http.interceptors.response.use(res => res);

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
    try {
      clearSSOStatus(ctx);
    } catch (err) {}
    throw new SSOError('no auth', 203);
  }
}

export function SSOAuthMiddleware (config?: SSOConfig) {
  const whiteList = config?.whiteList || defaultWhiteList;
  const excludePrefix = config?.excludePrefix || [];
  const ssoEnv = config?.ssoEnv || 'prod';
  console.log('sso env: ', ssoEnv);

  return async function (ctx: ParameterizedContext, next: Next) {
    const url = ctx.url;
    if (whiteList.includes(url)) {
      return next();
    }
    if (url.indexOf('/api/') !== 0) {
      if (!excludePrefix.length || excludePrefix.every(prefix => url.indexOf(prefix) === -1)) {
        return next();
      }
    }

    // 检查cookie或者post的信息或者url查询参数或者头信息
    const referer = ctx.headers.referer || '';
    const refererSearchParams = new nodeUrl.URLSearchParams(referer);
    const token =
      ctx.cookies.get('sso-token') ||
      ctx.headers['sso-token'] ||
      ctx.query['token'] ||
      refererSearchParams.get('token');
    const username = ctx.cookies.get('sso-username') || ctx.headers['sso-username'] || ctx.query['username'] || refererSearchParams.get('username');

    let ssoLogin = false;
    let ssoInfo = null;
    try {
      if (token) {
        const resData = await http({
          url: `${conf.network.ssoCenter}/api/sso/verify`,
          method: 'POST',
          headers: {
            'sso-sign': md5(`${token}${username}`),
          },
          data: {
            token,
            username,
          }
        })
          .then(res => res.data)
          .catch(e => {
            return null;
          });

        if (resData?.isSuccess) {
          const data = resData.data;
          ssoInfo = data.userInfo;
          ssoLogin = true;
          ctx.ssoUsername = username as string;

          if (!ctx.cookies.get('sso-token') && ssoInfo.expireAt) {
            ctx.cookies.set('sso-token', token as string, {
              expires: new Date(ssoInfo.expireAt)
            });
            ctx.cookies.set('sso-username', username as string, {
              expires: new Date(ssoInfo.expireAt)
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
