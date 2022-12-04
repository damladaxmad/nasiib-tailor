import { Menu, MenuItem } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { constants } from "../../Helpers/constantsFile"
import ImagePortal from "./ImagePortal"



const ViewProducts = (props) => {
    const [image, setImage] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const [imagePortal, setImagePortal] = useState(false)
    const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

    const updateMenu = (product) => {
      let remainedProducts = []
      props.whichMenu.menuProducts?.map(m => {
        if (m != product) remainedProducts.push(m)
      })
      axios.patch(`${constants.baseUrl}/menus/${props.whichMenu.id}`, {menuProducts: remainedProducts}).then(res => {
        alert("Successfully Deleted Image.")
        props.resetPics()
      }).catch(err => {
        alert(err.response?.data?.message)
      })
    }
  
    useEffect(()=> {
      axios.get(`${constants.baseUrl}/files/${props.product}`,
      {responseType: 'blob'}).then((res)=> {
        setImage(URL.createObjectURL(res.data))
      })
    }, [props.product])

    const optionHadler = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  

    return (
      <>
        {imagePortal && <ImagePortal hideModal = {()=> setImagePortal(false)} 
        product = {props.product} whichMenu = {props.whichMenu} 
        resetPics = {() => props.resetPics()}
        product = {props.product}/>}

        <img src = {image} style = {{width: "20%", height: "130px",
        borderRadius: "6px", cursor: "pointer"}}
        onClick = {()=> setImagePortal(true)} />
      
      </>
    )

}


export default ViewProducts