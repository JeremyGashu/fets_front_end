import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createReactEditorJS } from 'react-editor-js'

export const ReactEditorJS = createReactEditorJS()



export const queryClient = new QueryClient()


ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
        <ToastContainer />
      </React.StrictMode></BrowserRouter>
  </QueryClientProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
