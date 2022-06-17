import Layout from "../components/Layout";
import "../styles/globals.css";
import store from "../features/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
