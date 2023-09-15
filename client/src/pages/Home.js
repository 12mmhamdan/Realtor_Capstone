import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies, } from "react-cookie";
import { useNavigate, Link, } from "react-router-dom";
import { Card, Button, Typography } from "antd";

const { Title, Text } = Typography;

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

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h1 center>Welcome To Real Estate Data {user.username}!</h1>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <Card
          title="User Information"
          extra={<Button onClick={handleLogout}>Logout</Button>}
        >
          
          <Link to="/edituser">
            <Button type="primary">Edit Profile</Button>
          </Link>{" "}
          <Link to="/deleteuser">
            <Button type="primary" danger>Delete Account</Button>
          </Link>
        </Card>
      )}
    </div>
  );
};
