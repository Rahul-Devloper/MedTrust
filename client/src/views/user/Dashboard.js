import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const Dashboard = () => {
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");

  useEffect(() => {
    // Extract the JWT that is sent from the server and set it to the browser cookie
    Cookies.set("token", token, { expires: 0.02 });
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  );
};

export default Dashboard;
