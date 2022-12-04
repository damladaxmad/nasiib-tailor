import React, { useEffect, useState } from "react";
import StatCard from "../containers/DashboardContainers/Summary/StatCard";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import WeeklyChart from "../containers/DashboardContainers/Weekly/WeeklyChart";
import OrderUpdates from "../containers/DashboardContainers/Weekly/OrderUpdates";
import RevenueStats from "../containers/DashboardContainers/Weekly/RevenueStats";
import Top5Employees from "../containers/DashboardContainers/Monthly/Top5Employees";
import Top5DeenCustomers from "../containers/DashboardContainers/Customer/Top5DeenCustomers";
import { setDashboard } from "../redux/actions/dashboardActions";
import useFetch from "../funcrions/DataFetchers";
import Top5OrderCustomers from "../containers/DashboardContainers/Customer/Top5OrderCustomers";

const Dashboard = () => {
  const dashboard = useSelector((state) => state.dashboard.dashboard);

  const dispatch = useDispatch()
  const [state, setState] = useState(1)
  dispatch(setDashboard(useFetch("dashboard", state, "dashboard")))

  const myDate = [
    {label: "sample", value: 0, isMoney: false},
    {label: "sample", value: 0, isMoney: false},
    {label: "sample", value: 0, isMoney: false},
    {label: "sample", value: 0, isMoney: false},
    {label: "sample", value: 0, isMoney: false},
    {label: "sample", value: 0, isMoney: false},
    {label: "sample", value: 0, isMoney: false},
    {label: "sample", value: 0, isMoney: false},
 
]

  return (
    <div
      id="uni"
      style={{
        height: "100%",
        width: "95%",
        margin: "0px auto",
        display: "flex",
        gap: "32px",
        flexDirection: "column",
      }}
    >
      <Typography style={{ fontWeight: "600", fontSize: "25px" }}>
        {" "}
        Dashboard{" "}
      </Typography>
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {dashboard?.summary.map((d, index) => (
          <StatCard value={d} key={index} type = "summary"/>
        ))}
        {!dashboard?.summary && myDate.map((d, index) => (
          <StatCard value={d} key={index} type = "summary"/>
        ))}

      </div>

      <Typography
        style={{
          fontWeight: "600",
          color: "#928E8E",
          fontSize: "25px",
          marginTop: "40px",
        }}
      >
        {" "}
        Weekly Statistics
      </Typography>

      <div
        style={{
          display: "flex",
          width: "97.5%",
          justifyContent: "space-between",
        }}
      >
        <WeeklyChart data={dashboard?.weekly?.weeklyOrders} />
        <OrderUpdates data={dashboard?.weekly?.newOrderUpdates} />
        <RevenueStats data={dashboard?.weekly?.revenueStats} />
      </div>

      <Typography
        style={{
          fontWeight: "600",
          color: "#928E8E",
          fontSize: "25px",
          marginTop: "40px",
        }}
      >
        Monthly Statistics
      </Typography>

      <div
        style={{
          display: "flex",
          width: "98.5%",
          gap: "50px",
          flexWrap: "wrap",
        }}
      >
        <Top5Employees data={dashboard?.monthly?.top5Employees} />

        <div
          style={{
            display: "flex",
            gap: "30px",
            width: "50%",
            flexWrap: "wrap",
          }}
        >
          <StatCard
            value={{
              label: "orders",
              value: dashboard?.monthly?.thisMonthOrders,
              isMoney: false,
            }}
          />
          <StatCard
            value={{
              label: "revenue",
              value: dashboard?.monthly?.revenue,
              isMoney: true,
            }}
          />
           <StatCard
            value={{
              label: "recievable",
              value: dashboard?.monthly?.recievable,
              isMoney: true,
            }}
          />

          <StatCard
            value={{
              label: "net profit",
              value:
                dashboard?.monthly?.revenue - dashboard?.monthly?.recievable,
              isMoney: true,
            }}
          />
        </div>
      </div>

      <Typography
        style={{
          fontWeight: "600",
          color: "#928E8E",
          fontSize: "25px",
          marginTop: "40px",
        }}
      >
        Customer Statistics
      </Typography> 

         <div
        style={{
          display: "flex",
          width: "98.5%",
          gap: "50px",
          flexWrap: "wrap",
        }}
      >
        <Top5DeenCustomers data={dashboard?.other?.top5Customers} /> 
        <Top5OrderCustomers data={dashboard?.other?.top5CustomersByOrder} /> 
        </div>
    </div>
  );
};

export default Dashboard;
