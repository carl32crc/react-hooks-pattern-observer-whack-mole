// system
import React from 'react';

import GameCore from './GameCore';


const _baseContext = {
  game: {},
  setGame: () => {},
  scoreboard: {},
  setScoreBoard: () => {},
};

const Context = React.createContext(_baseContext);

const Provider = props => (
  <Context.Provider 
    value={{
      ..._baseContext,
      ...props.value,
    }}>
    {props.children}
    </Context.Provider>
);

const withMe = (propsMap = []) => WrappedComponent => props => (
  <Context.Consumer>
    {contextProps => <WrappedComponent game={contextProps} {...props} />}
  </Context.Consumer>
);

export { Context, Provider, withMe };