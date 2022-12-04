import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import { Select, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { setEmployees } from "../redux/actions/employeesActions";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";
import Table from "../utils/Table";
import Register from "../utils/Register";
import { setCustomers } from "../redux/actions/customersActions";
import CustomerOrders from "../containers/CustomerContainers/CustomerOrders";
import Transactions from "../containers/CustomerContainers/Transactions";

const Customers = () => {
  const [newCustomers, setNewCustomers] = useState(false);
  const [buttonName, setButtonName] = useState("Add New Customers");
  const [update, setUpdate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const statusArr = ["All", "Deen", "Clear"];
  const [status, setStatus] = useState(statusArr[0]);
  const [updatedCustomer, setUpdatedCustomer] = useState(null);
  const [del, setDel] = useState(1);
  const [showOrders, setShowOrders] = useState(false);
  const [customerInfo, setCustomerInfo] = useState();
  const [state, setState] = useState("");
  const [showTransactions, setShowTransactions] = useState(false);
  const [instance, setInstance] = useState();
  const activeUser = useSelector((state) => state.activeUser.activeUser);
  const columns = [
    { title: "ID", field: "customerId" },
    { title: "Full Name", field: "name", width: "4%" },
    { title: "Phone Number", field: "phone" },
    { title: "Balance", field: "balance" },
  ];
  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Phone", type: "text", name: "phone" },
  ];

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    customer
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeHandler = () => {
    setDel((state) => state + 1);
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers.customers);
  dispatch(
    setCustomers(
      useFetch("customers/customers-with-transactions", del, "customers")
    )
  );
  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1);

  const addCustomerHandler = () => {
    setQuery("");
    if (buttonName == "Add New Customers") {
      setNewCustomers(true);
      setButtonName("Go To Customers");
      setShowOrders(false);
      return;
    } else if (buttonName == "Go To Customers") {
      setShowOrders(false);
      setShowTransactions(false);
      setNewCustomers(false);
      setButtonName("Add New Customers");
      setUpdate(false);
    }
  };

  const handler = (data) => {
    if (data?.length > 0) {
      if (query == "") {
        return data.filter((std) => {
          if (status == "Deen") return std.balance > 0;
          else if (status == "Clear") return std.balance == 0;
          else return std.balance >= 0 || std.balance <= 0;
        });
      } else {
        return data.filter(
          (std) =>
            (status == "Deen"
              ? std.balance > 0
              : status == "Clear"
              ? std.balance == 0
              : std.balance >= 0 || std.balance <= 0) &&
            (std.name.toLowerCase().includes(query) ||
              std.phone.toLowerCase().includes(query))
        );
      }
    } else {
      return;
    }
  };

  const updateHandler = (customer) => {
    setNewCustomers(true);
    setButtonName("Go To Customers");
    setUpdate(true);
    setUpdatedCustomer(customer);
  };

  const resetFomr = () => {
    setForce((state) => state + 1);
  };

  useEffect(() => {
    setState("Loading...");
  }, [force]);

  useEffect(() => {
    if (customers?.length < 1) setState("No customers found!");
  }, [customers]);

  useEffect(() => {}, [del]);

  useEffect(() => {
    if (query != "" || status != "All") {
      setState("No matching customers!");
    }
  }, [query, status]);

  const showOrdersHandler = (customer) => {
    setShowOrders(true);
    setButtonName("Go To Customers");
    setCustomerInfo(customer);
  };

  const hideModal = () => {};

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        margin: "0px auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#EFF0F6",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          margin: "auto",
        }}
      >
        <Typography style={{ fontWeight: "600", fontSize: "25px" }}>
          {" "}
          {newCustomers
            ? "Create New Customers"
            : showOrders
            ? "Customer Details"
            : showTransactions
            ? "Customer Transactions"
            : "Customers"}
        </Typography>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick={() => {
            if (activeUser.privillages.includes("Add New Customers"))
              addCustomerHandler();
            else alert("You have no access!");
          }}
          startIcon={
            newCustomers || showOrders || showTransactions ? (
              <BiArrowBack
                style={{
                  color: "white",
                }}
              />
            ) : (
              <MdAdd
                style={{
                  color: "white",
                }}
              />
            )
          }
        >
          {buttonName}
        </Button>
      </div>
      {!showOrders && !showTransactions && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            padding: "20px",
            background: "white",
            width: "95.3%",
            margin: "auto",
            marginTop: "20px",
            borderRadius: "8px 8px 0px 0px",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              width: "400px",
              height: "40px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "none",
            }}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FormControl style={{ padding: "0px", margin: "0px" }}>
            <Select
              style={{ height: "40px", color: "#B9B9B9", width: "172px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={statusHandler}
            >
              {statusArr.map((status, index) => (
                <MenuItem value={status} key={index}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      {showOrders && <CustomerOrders data={customerInfo} />}
      {showTransactions && <Transactions instance={instance} name="customer" />}
      {!showOrders && !showTransactions && (
        <Table
          data={handler(customers)}
          showTransactions={(instance) => {
            setShowTransactions(true);
            setInstance(instance);
            setButtonName("Go To Customers");
          }}
          change={changeHandler}
          update={updateHandler}
          showOrders={(customer) => showOrdersHandler(customer)}
          state={state}
          columns={columns}
          url="customers"
          name="Customer"
        />
      )}
      {newCustomers && (
        <Register
          update={update}
          instance={updatedCustomer}
          reset={resetFomr}
          hideModal={() => {
            setUpdate(false);
            setNewCustomers(false);
            changeHandler();
            setButtonName("Add New Customers");
          }}
          fields={fields}
          url="customers"
          name="Customer"
          change={changeHandler}
        />
      )}
    </div>
  );
};

export default Customers;
