import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select, Typography} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";
import Table from "../utils/Table";
import Register from "../utils/Register";
import { setStyles } from "../redux/actions/stylesActions";

const Styles = () => {

  const [newStyles, setNewStyles] = useState(false)
  const [buttonName, setButtonName] = useState('Add New Styles')
  const [update, setUpdate] = useState(false)
  const [showCornerIcon, setShowCornerIcon] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updatedStyle, setUpdatedStyle] = useState(null)
  const [del, setDel] = useState(1);
  const [state, setState] = useState("")
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const columns = [
    { title: "Name", field: "name",},
    { title: "Type", field: "type" },
    { title: "Description", field: "description", width: "4%"}
  ]
  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Description", type: "text", name: "description" }
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, style) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeHandler = () => {
    setDel(state => state + 1)
  }

  const dispatch = useDispatch()
  const styles = useSelector((state) => state.styles.styles);
  dispatch(setStyles(useFetch("styles", del, "styles")))
  
  const statusArr = ["All", "Active", "Inactive"]
  const [status, setStatus] = useState(statusArr[0]);
  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1)

  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  const addStyleHandler = () => {
    setQuery('')
    if (buttonName == "Add New Styles"){
      setNewStyles(true)
      setButtonName("Go To Styles")
    
      return
    } else if (buttonName == "Go To Styles") {

      setNewStyles(false)
      setButtonName("Add New Styles") 
      setUpdate(false)
    }
  }

  const handler = (data) => { 
 
    if (data?.length > 0) {
      return data.filter(
        (std) =>
        std.name.toLowerCase().includes(query.toLocaleLowerCase()) ||
        std.type.toLowerCase().includes(query.toLocaleLowerCase())
      );
    } else {
      return
    }  
  };

  const updateHandler = (style) => {
    setNewStyles(true)
    setButtonName("Go To Styles")
    setUpdate(true)
    setUpdatedStyle(style)
    console.log(style.name)
  }

  const resetFomr = () => {
    setForce(state => state + 1)
  }

  useEffect(()=> {
    setState("Loading...")
  }, [force])

  useEffect(()=> {
    if (styles?.length < 1)
    setState("No styles found!")
  }, [styles])

  useEffect(()=> {
  }, [del])

    useEffect(()=> {
    if (query != '') {
      setState("No matching styles!")
    }
  }, [query])


  const hideModal = () =>{
  }

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
   
   <Typography style={{ fontWeight: "600", fontSize: "25px" }}> {newStyles ? "Create New Styles" : "Styles"}</Typography>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick = {() => {
            if (activeUser.privillages.includes('Add New Styles'))
            addStyleHandler()
            else alert("You have no access!")
          }}
          startIcon={
            newStyles ? <BiArrowBack
              style={{
                color: "white",
              }}
            /> : <MdAdd
            style={{
              color: "white",
            }}
          />
          }
        >
          {buttonName}
        </Button>
      </div>
      
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
      
      </div>

     <Table data={handler(styles)} 
      change = {changeHandler} 
      update = {updateHandler} 
      state = {state} columns = {columns} url = "styles"
      name = "Styles"/>
      {newStyles && <Register update = {update}
      instance = {updatedStyle} reset = {resetFomr}  hideModal = {()=> {
        setUpdate(false)
        setNewStyles(false)
        changeHandler()
        setButtonName("Add New Styles")
      }}
      fields = {fields}  url = "styles"
      name = "Styles"
      change = {changeHandler} />}

    </div>
  );
};

export default Styles;