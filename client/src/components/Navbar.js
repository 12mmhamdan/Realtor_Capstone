
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { HomeOutlined,  UserOutlined, SearchOutlined} from '@ant-design/icons';
import { Menu } from 'antd';


export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
      const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/");
    };


    const items = [
        {
          label: (
            <Link to="/">Home</Link>
          ),
          key: 'home',
          icon: <HomeOutlined />
        },
        {
            label: (
                <>
                  {!cookies.access_token ? (
                    <Link to="/Login">Login/Register</Link>
                  ) : (
                    <Link onClick={logout}> Logout </Link>
                  )}
                </>
              ),
            key: 'login',
            icon: <UserOutlined />
          },
          {
            label: (
            <Link to="/PropertySearch">Search For Properties</Link>
            ),
            key: 'propertysearch',
            icon: <SearchOutlined /> 
          },
      ];

  
    const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
    
        return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
        
    
    };