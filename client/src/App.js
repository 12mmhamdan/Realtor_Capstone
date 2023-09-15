// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import Login from './pages/Login';
import Register from './pages/RegisterForm';
import { Navbar } from './components/Navbar.js';
import { PropertySearchForm } from './pages/PropertySearchForm';
import EditUser from './pages/EditUser';
import { DeleteUser } from './pages/DeleteUser';
import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
    document.body.className = isDarkMode ? 'light' : 'dark';
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
        <Router>
          <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/propertysearch" element={<PropertySearchForm />} />
            <Route path="/edituser" element={<EditUser />} />
            <Route path="/deleteuser" element={<DeleteUser />} />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
