import { Button, Menu, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MenuItem } from "@material-ui/core";
import React, {useEffect, useState} from "react"
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";
import AddNewMenu from "./AddNewMenu";
import AddNewProducts from "./AddNewProducts";
import { deleteFunction } from "../../funcrions/deleteStuff";
import { useSelector } from "react-redux";

const MenuContainer = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [id, setId] = useState()
  const [update, setUpdate] = useState(false)
  const [menuImage, setMenuImage] = useState()
  const [newProducts, setNewProducts] = useState(false)
  const [change, setChange] = useState(1)
  const activeUser = useSelector(state => state.activeUser.activeUser)

  useEffect(()=> {
    axios.get(`${constants.baseUrl}/files/${props.menu.coverImageUrl}`,
    {responseType: 'blob'}).then((res)=> {
      setMenuImage(URL.createObjectURL(res.data))
      console.log(res.data)
    })
  }, [change, props.menu])
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteMenu = async() => {
   await deleteFunction(
      `Delete ${props.menu.name}`,
      props.menu.name,
      `${constants.baseUrl}/menus/${props.menu.id}`,
      props.change
    ); 
    handleClose()
  }
  
  const updatedMenu = () => {
    setId(props.menu.id)
    handleClose()
    setUpdate(true)
  }

  const hideModal = () => {
    setUpdate(false)
    setNewProducts(false)
    props.change()
  }

  const optionHadler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const addNewProducts = () => {
    setId(props.menu.id)
    setNewProducts(true)
  }

  useEffect(()=> {

  },[props.menu])
  
    return (
        <div 
        class = "myDiv"
        style = {{
           background: "white",
           width: "22%",
           padding: "12px",
           borderRadius: "6px",
           display: "flex",
           flexDirection: "column",
           gap: "10px"
        }}>
          {!props.menu.name && <p> No menu to display!</p>}
            <div style = {{display: 'flex', alignItems: "center", 
        justifyContent: "space-between", width: '100%'}}>
          <Typography style = {{fontSize: "14px", fontWeight: "600"}}>
            {props.menu.name.toUpperCase()} </Typography>
            <BiDotsVerticalRounded style = {{fontSize: "18px", cursor: "pointer"}} 
            onClick = {optionHadler}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
              />
            </div>
          
          <img src = {menuImage} style = {{width: "100%", height: "130px",
        borderRadius: "6px"}}
       />

          <div style = {{display: "flex", flexDirection: "row",
        justifyContent: "space-between"}}>
            <Button style = {{border: "1px solid #F2994A", borderRadius: "6px",
        width: "45%", height: "30px"}}
        onClick = {()=>{
          if (activeUser.privillages.includes("View Menu")) {
          props.viewProducts(props.menu.menuProducts)
          props.whichMenu(props.menu)
          }
          else alert("You have no access!")
        }}> View</Button>
            <Button variant="contained" style = {{background: "#3245E9", borderRadius: "6px",
        width: "45%", height: "30px"}}
        onClick = {addNewProducts}> ADD</Button>
          </div>

        {update && <AddNewMenu id = {props.menu.id} hideModal = {hideModal} 
        update = {2} name = {props.menu.name}/>}
        {newProducts && <AddNewProducts id = {id} hideModal = {hideModal}/>}

          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {
          handleClose()
          if (activeUser.privillages.includes("Update Menu")){
            updatedMenu()
          } else {
            alert("You hae no access!")
          }
        } }>
          Update Menu</MenuItem>
        <MenuItem onClick={() => {
          handleClose()
          if (activeUser.privillages.includes("Delete Menu")){
            deleteMenu()
          } else {
            alert("You hae no access!")
          }
        } }>Delete Menu</MenuItem>
      </Menu>


        </div>
    )
}

export default MenuContainer