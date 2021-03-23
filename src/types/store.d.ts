interface IStore {
  userInfo: {
    username: string;
    isAdmin: boolean;
    roleId: number;
  }

  loading: boolean;
}

interface IBaseAction {
  type: string;
  payload: any;
}

interface SET_USER_INFO_ACTION extends IBaseAction {
  type: 'SET_USER_INFO';
  payload: Pick<IStore, 'userInfo'>['userInfo']
}

interface SET_LOADING extends IBaseAction {
  type: 'SET_LOADING';
  payload: boolean;
}

type IAction = SET_USER_INFO_ACTION | SET_LOADING