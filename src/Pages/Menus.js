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
import MenuContainer from "../containers/MenusContainers/MenuContainer";
import { setMenus } from "../redux/actions/menusActions";
import AddNewMenu from "../containers/MenusContainers/AddNewMenu";
import ViewProducts from "../containers/MenusContainers/ViewProducts";
import { FaSleigh } from "react-icons/fa";


const Menus = () => {

  const [newMenus, setNewMenus] = useState(false)
  const [buttonName, setButtonName] = useState('Add New Menus')
  const [update, setUpdate] = useState(false)
  const [showCornerIcon, setShowCornerIcon] = useState(false)
  const [updatedMenu, setUpdatedMenu] = useState(null)
  const [del, setDel] = useState(1);
  const [state, setState] = useState("")
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const menus = useSelector((state) => state.menus.menus);
  const [viewProducts, setViewProducts] = useState(false)
  const [products, setProducts] = useState()

  const changeHandler = () => {
    setDel(state => state + 1)
  }

  const dispatch = useDispatch()
  dispatch(setMenus(useFetch("menus", del, "menus")))

  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1)


  const addMenuHandler = () => {
    setQuery('')
    if (buttonName == "Add New Menus"){
      setNewMenus(true)
      setButtonName("Go To Menus")
      return
    } else if (buttonName == "Go To Menus") {
      setNewMenus(false)
      setButtonName("Add New Menus") 
      setUpdate(false)
      setViewProducts(false)
    }   
  }

  const handler = (data) => { 
 
    if (data?.length > 0) {
      return data.filter(
        (std) =>
        std.name.toLowerCase().includes(query.toLocaleLowerCase())
      );
    } else {
      return
    }  
  };


  const updateHandler = (menu) => {
    setNewMenus(true)
    setButtonName("Go To Menus")
    setUpdate(true)
    setUpdatedMenu(menu)
  }

  const resetFomr = () => {
    setForce(state => state + 1)
  }

  useEffect(()=> {
    setState("Loading...")
  }, [force])



  useEffect(()=> {
  }, [del])

    useEffect(()=> {
    if (query != '') {
      setState("No matching menus!")
    }
  }, [query])

  const showProfileHandler = () => {
    setButtonName("Go To Menus")
  }

  const hideModal = () => {
    setNewMenus(false)
    setButtonName("Add New Menus")
  }

  const viewProductsHandler = (products) => {
    setViewProducts(true)
    setProducts(products)
    setButtonName("Go To Menus")
  }
  const [menu, setMenu] = useState()

  let newProducts = []
  menus?.map(m => {
    if (m?.id == menu?.id) 
    newProducts = m.menuProducts
  })


  const resetPics = () =>  {
    changeHandler()
  }

  useEffect(()=> {

  }, [newProducts])


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
        
        <Typography style = {{fontWeight: "600",
    fontSize: '25px'}}> {newMenus ? "Create New Menus" :
    viewProducts ? "View Products" : "Menus"}</Typography>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick = {() => {
            if (activeUser.privillages.includes('Add New Menus'))
            addMenuHandler()
            else alert("You have no access!")
          }}
          startIcon={
            newMenus || viewProducts ? <BiArrowBack
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
          value={query}
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
        <div style={{ display: "flex", gap: "20px" }}>
 
        </div>
      </div>

      {newMenus && <AddNewMenu hideModal = {hideModal} change = {changeHandler}/>}
      {viewProducts &&  <div style = {{
            width: "95%",
          margin: "30px auto",
          display: "flex",
          gap: "38px",
          flexWrap: "wrap",
          background: "white",
          borderRadius: "6px",
          padding: "20px"
        }}>
          {newProducts?.map(product => (
            <ViewProducts product = {product} whichMenu = {menu} 
            resetPics = {resetPics}/>
          ))}
        </div>
      
     }

     {!viewProducts && <div style = {{
            width: "95%",
          margin: "30px auto",
          display: "flex",
          gap: "38px",
          flexWrap: "wrap"
        }}>

        {handler(menus)?.map(menu => (
          <MenuContainer menu = {menu} change = {changeHandler}
          viewProducts = {(products)=> viewProductsHandler(products)}
          whichMenu = {(menu) => setMenu(menu)}/>
        ))}

      </div>}
  

    

    </div>
  );
};

export default Menus;
