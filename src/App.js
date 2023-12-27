import logo from './logo.svg';
import './App.css';
import Login from './Component/login';
import Register from './Component/Registre';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import DemandList from './Component/ListDemand';

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
        <Route path="/ListDemande" element={<DemandList />} />


        <Route element={<ProtectedRoute />} >
         

         
        </Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
