import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createLogger } from 'redux-logger'

import Web3 from 'web3/dist/web3.min.js'
import ProjectMappingABI from './abis/ProjectUserMapping.json'
import ProjectABI from './abis/Project.json'
import SubProjectABI from './abis/SubProject.json'
import TaskABI from './abis/Task.json'
import PaymentInfoABI from './abis/PaymentInformations.json'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createReactEditorJS } from 'react-editor-js'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { setContractsActionCreator, saveContractAddress } from './actions';
import { contractsReducer } from './reducers/contracts';


export const ReactEditorJS = createReactEditorJS()

export const queryClient = new QueryClient()

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  combineReducers({ contracts: contractsReducer }),
  applyMiddleware(...middleware),
)

const web3 = new Web3(Web3.givenProvider || "https://ropsten.infura.io/v3/29935ed5b45743c2ac82eee5bbfcdecf")
web3.eth.requestAccounts().then(accounts => {
  console.log(accounts)
  //TODO save the address here
  const mappingContract = new web3.eth.Contract(ProjectMappingABI.abi, ProjectMappingABI.networks[5777].address)
  const projectContract = new web3.eth.Contract(ProjectABI.abi, ProjectABI.networks[5777].address)
  const subProjectContract = new web3.eth.Contract(SubProjectABI.abi, SubProjectABI.networks[5777].address)
  const taskContract = new web3.eth.Contract(TaskABI.abi, TaskABI.networks[5777].address)
  const paymentInfoContract = new web3.eth.Contract(PaymentInfoABI.abi, PaymentInfoABI.networks[5777].address)
  console.log(projectContract)

  store.dispatch(setContractsActionCreator({ mappingContract, projectContract, subProjectContract, taskContract, paymentInfoContract }))
  store.dispatch(saveContractAddress(accounts[0] || '0x0'))

})

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
          <ToastContainer />
        </React.StrictMode></BrowserRouter>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
