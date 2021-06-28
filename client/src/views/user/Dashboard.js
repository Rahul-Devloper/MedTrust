import React, { useEffect } from "react";
import { NormalNavbar } from "../../components";

const Dashboard = () => {
  useEffect(() => {
    // Extract the JWT that is sent from the server and set it to the browser cookie
  }, []);

  return (
    <>
      <NormalNavbar />
      <h1>User Dashboard</h1>
    </>
  );
};

export default Dashboard;
