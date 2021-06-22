import React, { useEffect } from "react";
import { Navbar } from "../../components";

const Dashboard = () => {
  useEffect(() => {
    // Extract the JWT that is sent from the server and set it to the browser cookie
  }, []);

  return (
    <>
      <Navbar />
      <h1>User Dashboard</h1>
    </>
  );
};

export default Dashboard;
