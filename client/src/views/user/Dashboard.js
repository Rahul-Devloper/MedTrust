import React, { useEffect } from "react";
import { UserNavbar } from "../../components";

const Dashboard = () => {
  useEffect(() => {
    // Extract the JWT that is sent from the server and set it to the browser cookie
  }, []);

  return (
    <>
      <UserNavbar />
      <h1>User Dashboard</h1>
    </>
  );
};

export default Dashboard;
