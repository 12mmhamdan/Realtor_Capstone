// Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  HomeOutlined,
  UserOutlined,
  SearchOutlined,
  TeamOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { Menu, Switch } from 'antd';

export const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const logout = () => {
    setCookies('access_token', '');
    window.localStorage.clear();
    navigate('/');
  };

  const loggedIn = cookies.access_token;

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: (
        <>
          {!loggedIn ? (
            <Link to="/Login">Login/Register</Link>
          ) : (
            <Link onClick={logout} to="/">
              Logout
            </Link>
          )}
        </>
      ),
      key: 'login',
      icon: <UserOutlined />,
    },
  ];

  if (loggedIn) {
    items.push(
      {
        label: <Link to="/EditUser">Edit User</Link>,
        key: 'edituser',
        icon: <TeamOutlined />,
      },
      {
        label: <Link to="/PropertySearch">Properties Record</Link>,
        key: 'propertysearch',
        icon: <SearchOutlined />,
      }
    );
  }

  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      {items.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      ))}
      <Menu.Item key="themeSwitch" icon={null} style={{ float: 'right' }}>
        <BulbOutlined />
        <Switch
          checkedChildren=""
          unCheckedChildren=""
          onChange={toggleTheme}
          checked={isDarkMode}
        />
      </Menu.Item>
    </Menu>
  );
};
