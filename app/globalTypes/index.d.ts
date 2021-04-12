import { ParameterizedContext, DefaultContext } from 'koa';
import Validator from 'better-validator';
import 'koa';
import { IResData } from '../util/util';

declare module 'koa' {
  interface DefaultState {}

  interface DefaultContext {
    userId: number;
    username: string;
    params: any;
    validator: ReturnType<typeof Validator.create>;

    checkValidator: () => void;
    resHandler: (this: ParameterizedContext, data: IResData, statusCode?: number, encrypt?: boolean) => void;
  }
}

declare module 'koa-router' {
  interface IRouterParamContext<StateT = any, CustomT = {}> extends DefaultContext {
    // userId: string;
    // username: string;

    // resHandler: (this: ParameterizedContext, data: IResData, statusCode?: number, encrypt?: boolean) => void;
  }
}