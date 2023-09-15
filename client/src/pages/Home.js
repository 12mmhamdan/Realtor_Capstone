import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies, } from "react-cookie";
import { useNavigate, Link, } from "react-router-dom";
import { Button } from "antd";


export const Home = () => {
    const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data based on userID from localStorage
    const userID = window.localStorage.getItem("userID");
    if (userID) {
      // Fetch user data using the user's ID from your API
      axios
        .get(`http://localhost:3001/Auth/users/${userID}`, {
          headers: {
            Authorization: `${cookies.access_token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [cookies.access_token]);

  const handleLogout = () => {
    removeCookies("access_token"); // Remove the "access_token" cookie
    window.localStorage.clear();
    navigate("/login");
  };
  const handleButtonClick = () => { navigate('/login'); };
  return (
    
    <div style= {{margin: "0 auto"}}>
        <div>
            <div className={`hero-section `}>
                <div className="hero-content">
                <h1>Welcome To Real Estate Data {user.username}!</h1>
                <p>Discover and Find More Info On Real Estate Properties</p>
                {cookies.access_token ? null : 
                    <Button type="primary" size="large" onClick={handleButtonClick}>
                    Login to Start Searching Property Data
                    </Button>
                }
                </div>
            </div>
        </div>
        

    </div>
  );
};
