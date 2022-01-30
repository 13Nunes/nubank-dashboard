// Basic
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Views
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";

const RouteCfg = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteCfg;
