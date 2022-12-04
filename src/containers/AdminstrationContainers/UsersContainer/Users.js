import React, { useState, useEffect, useReducer } from "react"
import { FormControl, MenuItem, Menu} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "@mui/material";
import axios from "axios";
import { setUsers } from "../../../redux/actions/usersActions";
import useFetch from "../../../funcrions/DataFetchers";
import Table from "../../../utils/Table";

const Users = (props) => {

  const dispatch = useDispatch();
  const [state, setState] = useState('')

  const columns = [
    { title: "Employee Name", field: "name", width: "4%" },
    { title: "Username", field: "username" },
    { title: "User Password", field: "Password" },
  ]

  const parentDivStyle = { display: "flex", alignItems: "center",
    justifyContent: "space-between",  gap: "0px", padding: "20px",
    background: "white", width: "95%", margin: "auto",
    marginTop: "20px", borderRadius: "8px 8px 0px 0px",
  }

  const searchStyle = { width: "400px", height: "40px",
    padding: "10px", fontSize: "16px", borderRadius: "8px",
    background: "#EFF0F6", border: "none",
  }

  const selectStyle = {  height: "40px", color: "#B9B9B9",
  width: "150px"}

  const statusArr = ["All", "Active", "Inactive"]
    const [status, setStatus] = useState(statusArr[0]);
    const [query, setQuery] = useState("");
    const users = useSelector((state) => state.users.users);
    const [force, setForce] = useState(1)

    const change = () => {
      setForce(state => state + 1)
    }
  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  dispatch(setUsers(useFetch("users", force, "users")))

  const handler = (data) => { 
    if (data?.length > 0) {
      return data.filter(
        (std) =>
        std.username.toLowerCase().includes(query) ||
        std.name.toString().toLowerCase().includes(query)
      );
    } else {
      return
    }  
  };

  useEffect(()=> {
    setState('Loading...')
  }, [force])

  useEffect(()=> {
    if (users?.length < 1)
    setState("No users found!")
  }, [users])

  useEffect(() => {
    if (query != "") {
      setState("No matching users!");
    }
  }, [query]);

   
  return (
<>
    <div
    style={parentDivStyle}
  >
    <input
      type="text"
      placeholder="Search"
      style={searchStyle}
      onChange={(e) => setQuery(e.target.value)}
    />
   

  </div>
  
      <Table data = {handler(users)} 
      change = {change} state =  {state} columns = {columns}
      url = "users" name = "User"/>
      </>
  )
}

  export default Users