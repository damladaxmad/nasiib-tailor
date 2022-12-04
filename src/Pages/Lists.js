import React, { useState, useEffect, useReducer } from "react"
import {Tabs, Tab, Box} from "@mui/material"
import Users from "../containers/AdminstrationContainers/UsersContainer/Users"
import Access from "../containers/AdminstrationContainers/AccessContainers/Access";
import { useDispatch, useSelector } from "react-redux";
import CompanyInfo from "../containers/AdminstrationContainers/CompanyInfoContainer/CompanyInfo";
import ImportProducts from "../containers/AdminstrationContainers/ImportContainers/ImportProducts";
import ListOptions from "../containers/ListContainers/ListOptions";
import { Details } from "@material-ui/icons";
import ListDetails from "../containers/ListContainers/ListDetails";
import { setOrders } from "../redux/actions/ordersActions";
import useFetch from "../funcrions/DataFetchers";

const Lists = () => {

  const statusArr = ["All", "Active", "Inactive"]
  const [query, setQuery] = useState("")
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const orders = useSelector(state => state.orders.orders)
  const [order, setOrder] = useState()
  console.log(order)
  const [value, setValue] = React.useState("pending");
  const [details, setDetails] = useState(false)
  const [change, setChange] = useState(1)
  const dispatch = useDispatch()
  dispatch(setOrders(useFetch("orders", [value, change], "orders")))

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const filterer = (data, type) => { 
 
    if (data?.length > 0) {
      if (type != "taken") {
        return data.filter(
          (std) =>
          std.status == type && std.name.toLowerCase().includes(query.toLocaleLowerCase())
          || std.status == type && std.customer?.name.toLowerCase().includes(query.toLocaleLowerCase())
          || std.status == type && std.orderNumber.toString().includes(query.toLocaleLowerCase())
          );
      }
      else if (type == "taken") {
        return data.filter(
          (std) =>
          (std.status == type || std.status ==  "invoiced") && std.name.toLowerCase().includes(query.toLocaleLowerCase())
          || (std.status == type || std.status == "invoiced") && std.customer?.name.toLowerCase().includes(query.toLocaleLowerCase())
          || (std.status == type || std.status == "invoiced") && std.orderNumber.toString().includes(query.toLocaleLowerCase())
          );
      }  
    } else {
        return
    }  
  };

  const detailHandler = (order) => {
    setOrder(order)
    setDetails(true)
    console.log(order)
  }

  const changeHandler = () => {
    setChange(state => state + 1)
  }

  useEffect(()=> {
  }, [change])

  
  return (
    <div
    style={{
      height: "100%",
      width: "100%",
      margin: "0px auto",
      display: "flex",
      gap: "0px",
      flexDirection: "column",
    }}
  >
    {!details && <div style = {{display: "flex", alignItems: "center",
    width: "95%", margin: "auto"}}>
        
     <Box sx={{ width: "95%", margin: "auto" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="black"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            disableFocusRipple = {true}
          >
            
       
          {activeUser.privillages?.includes("Order Lists") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="pending" label="Pending"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages.includes("Order Lists") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="on-service" label="On Service"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages?.includes("Order Lists") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="finished" label="Finished"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages?.includes("Order Lists") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="taken" label="Taken"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          </Tabs>
        </Box>
        <input
          type="text"
          placeholder="Search"
          style={{
            width: "40%",
            height: "40px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "white",
            border: "none",
          }}
          onChange={(e) => setQuery(e.target.value)}
        />
        </div>}

        {details && <ListDetails back = {()=> {
        setQuery('')
        setDetails(false)
      }} order = {order}
        change = {changeHandler}
        key = {order.id}/>}
        {(value == "pending" && !details) && <ListOptions orders = {filterer(orders, "pending")}
        details = {(order)=> detailHandler(order)} />}
        {(value == "on-service" && !details) && <ListOptions orders = {filterer(orders, "on-service")}
        details = {(order)=> detailHandler(order)}/>}
        {(value == "finished" && !details) && <ListOptions orders = {filterer(orders, "finished")}
        details = {(order)=> detailHandler(order)}/>}
        {(value == "taken" && !details) && <ListOptions orders = {filterer(orders, "taken")}
        details = {(order)=> detailHandler(order)}/>}
   
    </div>
  );
};

export default Lists;
