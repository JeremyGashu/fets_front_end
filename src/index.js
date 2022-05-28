import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createLogger } from 'redux-logger'

import Web3 from 'web3/dist/web3.min.js'
import ProjectMappingABI from './abis/ProjectUserMapping.json'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createReactEditorJS } from 'react-editor-js'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { setContractsActionCreator } from './actions';
import { contractsReducer } from './reducers/contracts';


export const ReactEditorJS = createReactEditorJS()

export const queryClient = new QueryClient()

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  combineReducers({ contractsReducer }),
  applyMiddleware(...middleware),
)

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
web3.eth.requestAccounts().then(accounts => {
  console.log(accounts)
  //TODO save the address here
  const mappingContract = new web3.eth.Contract(ProjectMappingABI.abi, ProjectMappingABI.networks[5777].address)
  //TODO save instance of each contract

  store.dispatch(setContractsActionCreator({ mappingContract }))
  // const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)

  // this.setState({ todoList })
  // const taskCount = await todoList.methods.taskCount().call()
  // setInfo({ taskCount })
  // for (var i = 1; i <= taskCount; i++) {
  //   const task = await todoList.methods.tasks(i).call()
  //   this.setState({
  //     tasks: [...this.state.tasks, task]
  //   })
  // }
})


// store.dispatch(getCryptos())
// store.dispatch(fetchTransactions())


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
