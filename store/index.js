import React, { createContext, useContext } from 'react';
import { RootModel } from './root.model';

const Index = createContext(null);

const StoreProvider = ({ children, store }) => {
  return <Index.Provider value={store}>{children}</Index.Provider>;
};

const useStore = () => {
  const context = useContext(Index);
  if (!context) {
    throw new Error('StoreContext was not provided');
  }

  return context;
};

const setupMobx = () => {
  // mobx.configure({
  //   useProxies: 'always',
  //   enforceActions: 'always',
  //   computedRequiresReaction: true,
  //   reactionRequiresObservable: true,
  //   observableRequiresReaction: true,
  // });
};

export { StoreProvider, useStore, RootModel, setupMobx };
