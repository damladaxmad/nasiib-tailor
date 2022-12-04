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

const IdsMenu = (props) => {

  const [state, setState] = useState(1)
  const menus = useSelector((state) => state.menus.menus);
  const [menu, setMenu] = useState(menus[0]?._id);
  const menuHandler = (e) => {
    setMenu(e.target.value);
  };

  const [disabled, setDisabled] = useState(false)

  const assignHandler = async() => {
    setDisabled(true)
    props.hideModal(menu)
  }


  return (
    <MyModal onClose = {props.hideModal} width = "300px" left = "36.8%"
    background="rgb(0,0,0, 0.24)">
        <div style = {{padding:"20px 0px", display: "flex",
    flexDirection: "column", gap: "16px", width: "380px",
    alignItems: "center"}}>

   <FormControl style = {{width: "290px",}}>
          <Select
            style={selectStyle}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={menu}
            onChange={menuHandler}
          >
            {menus?.map((menu, index) => (
              <MenuItem value={menu._id} key={index}>
                {menu.name}
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

export default IdsMenu;
