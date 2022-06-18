import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css'
import FeedsPage from './pages/feed/FeedsPage';
// import CreateFeed from './pages/feed/CreateFeed';
import LoginPage from './pages/login/LoginPage'
import ProjectManagerSidebar from './pages/project_manager/ProjectManager';
import TechnicalAdminSidebar from "./pages/technical_admin/TechnicalAdmin";
import './configs/blockchain'
import BoardingPage from './pages/boarding/BoardinPage';
import FeedDetailPage from './pages/feed/FeedDetailPage';
import FinancialManagerSidebar from './pages/financial_manager/FinancialManager';
import ProcurementManagerSidebar from './pages/procurement_manager/ProcurementManager';
import ExternalAuditorSidebar from './pages/external_auditor/ExternalAuditor';


const App = () => {

  // let authData = localStorage.getItem('authData')
  // if (authData) {
  //     let userInfo = JSON.parse(authData)
  //     console.log(userInfo)
  // }

  useEffect(() => {
    // loadBlockchainData()
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={<BoardingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/technical-admin/*' element={<TechnicalAdminSidebar />} />
        <Route path='/project-manager/*' element={<ProjectManagerSidebar />} />
        <Route path='/financial-manager/*' element={<FinancialManagerSidebar />} />
        <Route path='/procurement-manager/*' element={<ProcurementManagerSidebar />} />
        <Route path='/external-auditor/*' element={<ExternalAuditorSidebar />} />
        <Route path='/feeds/*' element={<FeedsPage />} />
        <Route path='/feed-detail/:id' element={<FeedDetailPage />} />


      </Routes>

      {/* <CreateFeed /> */}
    </>
  )
}
export default App;
