import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
