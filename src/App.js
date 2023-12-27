import logo from './logo.svg';
import './App.css';
import Login from './Component/login';
import Register from './Component/Registre';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import { Route, Router, Routes, useLocation } from 'react-router-dom';

function App() {

  function AppHeader() {
  

    const location = useLocation();
    const isLoginPage = location.pathname === '/';
    const isRegisterPage = location.pathname === '/register';
    if (isLoginPage||isRegisterPage) {
      return null; // Don't render the header on the login page
    }
  
    return null;
  }

  return (
    <Router>
    <div className="App">
    

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute/>} >
         

         
        </Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
