import '../styles/globals.scss';
import { RootModel, StoreProvider, setupMobx } from '../store/index';
import { useEffect } from 'react';

setupMobx();
const store = new RootModel();

function MyApp({ Component, pageProps }) {
  const initUserDetails = async () => {
    await store.auth.getUserData();
  };

  useEffect(() => {
    initUserDetails();
  }, []);

  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
