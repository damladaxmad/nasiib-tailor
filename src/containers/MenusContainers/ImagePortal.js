import axios from "axios"
import { useEffect, useState } from "react"
import { constants } from "../../Helpers/constantsFile"
import MyModal from "../../Modal/Modal"
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Menu, MenuItem } from "@material-ui/core";
import IdsMenu from "./IdsMenu";


const ImagePortal = (props) => {

    const [image, setImage] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const [imagePortal, setImagePortal] = useState(false)
    const [idsMenu,setIdsMenu] = useState(false)
    const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

    useEffect(()=> {
        axios.get(`${constants.baseUrl}/files/${props.product}`,
        {responseType: 'blob'}).then((res)=> {
          setImage(URL.createObjectURL(res.data))
        })
      }, [props.product])

      const optionHadler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const deleteImage = async(product) => {
        let remainedProducts = []
        await axios.get(`${constants.baseUrl}/menus/${props.whichMenu.id}`).then((res) => {
          res.data?.data?.menu?.menuProducts?.map(m => {
            if (m != product) remainedProducts.push(m)
          })
        })

        axios.patch(`${constants.baseUrl}/menus/${props.whichMenu.id}`, {menuProducts: remainedProducts}).then(res => {
          alert("Successfully Deleted Image.")
          props.resetPics()
          props.hideModal()
        }).catch(err => {
          alert(err.response?.data?.message)
        })
      }

      const moveImage = async(product, menu) => {
        let remainedProducts = []
        await axios.get(`${constants.baseUrl}/menus/${menu}`).then((res) => {
          remainedProducts = res.data.data.menu.menuProducts
          remainedProducts.push(product)
        })
       await axios.patch(`${constants.baseUrl}/menus/${menu}`, {menuProducts: remainedProducts}).then(res => {
          alert("Successfully Moved Image.")
          props.resetPics()
          props.hideModal()
        }).catch(err => {
          alert(err.response?.data?.message)
        })

        deleteImage(product)
     
      }

      const openMenuPortal = () => {
        setIdsMenu(true)
      }

    return (
        <MyModal onClose = {()=> props.hideModal()} left = "36%">
            <div style = {{display: "flex", flexDirection: "column",
        alignItems: "flex-end", gap: "15px"}}>
             <BiDotsVerticalRounded style = {{fontSize: "18px", cursor: "pointer"}} 
            onClick = {optionHadler}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
              />
               <img src = {image} style = {{width: "400px", height: "300px",
        borderRadius: "6px", cursor: "pointer"}}
       />

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
          deleteImage(props.product)
        } }>Delete Image</MenuItem>
        <MenuItem onClick={() => {
          handleClose()
          // moveImage(props.product)
          openMenuPortal()
        } }>Move Image</MenuItem>
      </Menu>

        {idsMenu && <IdsMenu hideModal = {(menu)=> {
          moveImage(props.product, menu)
          setIdsMenu(false)
        }}/>}

      </div>
        </MyModal>
    )
}

export default ImagePortal