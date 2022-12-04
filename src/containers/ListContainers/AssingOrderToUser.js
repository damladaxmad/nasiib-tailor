import React, { useEffect, useState } from "react";
import { FastField, useFormik } from "formik";
import axios from "axios";
import MyModal from "../../Modal/Modal"
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../../Helpers/constantsFile";
import { FormControl, MenuItem, Select } from "@mui/material";
import useFetch from "../../funcrions/DataFetchers";
import { setUsers } from "../../redux/actions/usersActions";

const selectStyle = { height: "40px", color: "#B9B9B9", width: "100%" };

const AssignOrderToUser = (props) => {

  const [state, setState] = useState(1)
  const users = useSelector((state) => state.users.users);
  const [user, setUser] = useState(users[0]?._id);
  const userHandler = (e) => {
    setUser(e.target.value);
  };

  const [disabled, setDisabled] = useState(false)

  const serviceOrder = (order) => {
    if (order.status != "pending") return
    axios
      .patch(`${constants.baseUrl}/orders/${order.id}`, {
        status: "on-service"
      })
      .then(() => {
        alert("Successfully made Order on-service");
        props.change();
        props.back()
      }).catch(err => {alert(err.response.data.message)});
  };

  const assignHandler = async() => {
    setDisabled(true)
    const res = await axios.post(`${constants.baseUrl}/services/assign-service-to-user/${props.serviceId}/${user}`).then(()=> {
        props.hideModal()
        alert(`Succesfully Assigned service to user`)
        setDisabled(false)
        props.change()
        // props.back()
      }
      ).catch((err)=> {
        props.hideModal()
        alert(err.response.data.message);
        setDisabled(false)
      })
      serviceOrder(props.order)
  }


  return (
    <MyModal onClose = {props.hideModal} width = "300px">
        <div style = {{padding:"20px 0px", display: "flex",
    flexDirection: "column", gap: "16px", width: "380px",
    alignItems: "center"}}>

   <FormControl style = {{width: "290px",}}>
          <Select
            style={selectStyle}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            onChange={userHandler}
          >
            {users?.map((user, index) => (
              <MenuItem value={user._id} key={index}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  <button
        disabled = {disabled}
        style={{
          width: "290px",
          fontSize: "20px",
          backgroundColor: disabled ? "lightgrey" : "#2F49D1",
          fontWeight: "600",
          color: "white",
          height: "40px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick = {assignHandler}
      >
        Assign
      </button>
      </div>
    </MyModal>
  );
};

export default AssignOrderToUser;
