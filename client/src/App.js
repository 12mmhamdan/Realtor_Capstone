import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth'; // Import the Auth component
import Login from './pages/Login'; // Import the Login component
import Register from './pages/RegisterForm'; // Import the Register component
import { Navbar } from './components/Navbar.js';
import { PropertySearchForm } from './pages/PropertySearchForm';
import EditUser from './pages/EditUser';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/propertysearch' element={<PropertySearchForm />}/>
          <Route path='/edituser' element={<EditUser />}/>
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;