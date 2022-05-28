import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css'
import FeedsPage from './pages/feed/FeedsPage';
// import CreateFeed from './pages/feed/CreateFeed';
import LoginPage from './pages/login/LoginPage'
import ProjectManagerSidebar from './pages/project_manager/ProjectManager';
import TechnicalAdminSidebar from "./pages/technical_admin/TechnicalAdmin";
import Web3 from 'web3/dist/web3.min.js'
import ABI from './abis/Project.json'

const App = () => {
  // const [info, setInfo] = useState()

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    const accounts = await web3.eth.requestAccounts()
    console.log(accounts)
    //TODO save the address here
    const projectContract = new web3.eth.Contract(ABI.abi, ABI.networks[5777].address)
    //TODO save instance of each contract
    console.log(projectContract)
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
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/technical-admin/*' element={<TechnicalAdminSidebar />} />
        <Route path='/project-manager/*' element={<ProjectManagerSidebar />} />
        <Route path='/feeds/*' element={<FeedsPage />} />
      </Routes>

      {/* <CreateFeed /> */}
    </>
  )
}
export default App;
