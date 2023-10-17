"use client";
import React, { useEffect } from "react";
import "./dashboard.scss";
import { useAppSelector } from "@/redux/hooks";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <div>
      <span>{user.name}</span>
    </div>
  );
};

export default Dashboard;
