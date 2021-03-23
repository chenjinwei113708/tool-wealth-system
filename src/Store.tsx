import React, { createContext, useReducer } from 'react';

const defaultState: IStore = {
  userInfo: {
    username: '',
    roleId: 0,
    isAdmin: false,
  },

  loading: false,
};

const Context = createContext({
  state: defaultState,
  dispatch: (() => ({})) as React.Dispatch<IAction>
});

const reducer = (state: IStore, action: IAction): IStore => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...(action.payload || {})
        }
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state;
  }
}

const Provider: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}
    >
      { props.children }
    </Context.Provider>
  )
}

export { 
  Context, 
  Provider,
};
