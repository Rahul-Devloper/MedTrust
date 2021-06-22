import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Dashboard = () => {
  useEffect(() => {
    // Extract the JWT that is sent from the server and set it to the browser cookie
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
    </div>
  );
};

export default Dashboard;
