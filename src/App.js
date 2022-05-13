import { Route, Routes } from 'react-router-dom'
import './App.css'
import FeedsPage from './pages/feed/FeedsPage';
// import CreateFeed from './pages/feed/CreateFeed';
import LoginPage from './pages/login/LoginPage'
import ProjectManagerSidebar from './pages/project_manager/ProjectManager';
import TechnicalAdminSidebar from "./pages/technical_admin/TechnicalAdmin";

const App = () => {
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
