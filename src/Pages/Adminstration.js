import React, { useState, useEffect, useReducer } from "react"
import {Tabs, Tab, Box} from "@mui/material"
import Users from "../containers/AdminstrationContainers/UsersContainer/Users"
import Access from "../containers/AdminstrationContainers/AccessContainers/Access";
import { useDispatch, useSelector } from "react-redux";
import CompanyInfo from "../containers/AdminstrationContainers/CompanyInfoContainer/CompanyInfo";
import ImportProducts from "../containers/AdminstrationContainers/ImportContainers/ImportProducts";
import { Button } from "@material-ui/core";
import Register from "../utils/Register";
import {MdAdd} from "react-icons/md"
import { setUsers } from "../redux/actions/usersActions";
import useFetch from "../funcrions/DataFetchers";

const Adminstration = () => {

  const fields  = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter username", type: "text", name: "username" },
    { label: "Enter Password", type: "password", name: "password" },
  ];

  const statusArr = ["All", "Active", "Inactive"]
  const activeUser = useSelector(state => state.activeUser.activeUser)

  const [value, setValue] = React.useState("users");
  const [newUser, setNewUser] = useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const addHandler = () => {
    setNewUser(true)
  }

  const [change, setChange] = useState(1)
  const [myChange, setMyChange] = useState(1)

  const changeHandler = () => {
    setChange(state => state + 1)
  }

  const dispatch = useDispatch()
  dispatch(setUsers(useFetch("users", change, "users")))
  useEffect(() => {
    console.log(`chang is happening ${change}`)
  })
  
  return (
    <div
    style={{
      display: "flex",
      height: "100%",
      width: "100%",
      margin: "0px auto",
      gap: "0px",
      flexDirection: "column",
    }}
  >
    <div style = {{display: "flex", width: "95%", margin: "auto",
  justifyContent: "space-between"}}>
     <Box sx={{ width: "95%", margin: "auto" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="black"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            disableFocusRipple = {true}
          >
            
       
          {activeUser.privillages?.includes("Users") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="users" label="Users"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages.includes("Access") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="access" label="Access"
            style={{ fontSize: "16px", fontWeight: "700" }} />}
          </Tabs>
        </Box>
        {value == "users" && <Button
          style={{
            width: "250px",
            fontSize: "14px",
            backgroundColor: "#2F49D1",
            color: "white",
            height: "40px"
          }}
          startIcon = {
            <MdAdd
                style={{
                  color: "white",
                }}
              />
          }
          variant="contained"
          onClick={addHandler}
        >
         add new user
        </Button> }

        </div>
    {value == "users" && <Users key = {change}/>}
    {value == "access" && <Access/>}

    {newUser && (
        <Register
          hideModal={() => {
            setNewUser(false)
          }}
          fields={fields}
          url="users"
          name="User"
          change={changeHandler}
        />
      )}
    </div>
  );
};

export default Adminstration;
