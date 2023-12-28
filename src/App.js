import logo from './logo.svg';
import './App.css';
import Login from './Component/login';
import Register from './Component/Registre';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import DemandList from './Component/ListDemand';
import { Demandes } from './Component/CreateDemnade';
import DemandUser from './Component/ListUserDemande';
import UserRoute from './Component/ProtectedRoute/UserRoute.jsx'
import AdminRoute from './Component/ProtectedRoute/AdminRoute.jsx'
import NotFoundPage from './Component/ProtectedRoute/NoFoundPage.jsx'


function App() {

  function AppHeader() {
  

    const location = useLocation();
    const isLoginPage = location.pathname === '/';
    const isRegisterPage = location.pathname === '/register';
    if (isLoginPage||isRegisterPage) {
      return null; // Don't render the header on the login page
    }
  
    return ;
  }

  return (
    <Router>
    <div className="App">
    

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route  element={<AdminRoute/>} >
        <Route path="/ListDemande" element={<DemandList />} />
        </Route>
        <Route  element={<UserRoute/>} >
        <Route path="/ListUserDemande" element={<DemandUser />} />
        <Route path="/CreateDemande" element={<Demandes />} />
        <Route path="/ListUserDemande" element={<DemandUser />} />
        </Route>
        <Route path="/NotFoundPage" element={<NotFoundPage   />} />



        <Route element={<ProtectedRoute />} >
         

         
        </Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
