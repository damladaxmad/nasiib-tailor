
import { useEffect, useState } from "react"
import MyModal from "../../../Modal/Modal"
import { Menu, MenuItem } from "@material-ui/core";
import axios from "axios";
import { constants } from "../../../Helpers/constantsFile";
import { Button } from "@mui/material";


const ImagePopUp = (props) => {

    const [image, setImage] = useState()

    useEffect(()=> {
        axios.get(`${constants.baseUrl}/files/${props.product}`,
        {responseType: 'blob'}).then((res)=> {
          setImage(URL.createObjectURL(res.data))
        })
      }, [props.product])

    //   const openMenuPortal = () => {
    //     setIdsMenu(true)
    //   }

    return (
        <MyModal onClose = {()=> props.hideModal()} left = "41.5%"
        background="rgb(0,0,0, 0.24)">
            <div style = {{display: "flex", flexDirection: "column",
        alignItems: "flex-end", gap: "15px"}}>
               
        <img src = {image} style = {{width: "320px", height: "240px",
        borderRadius: "6px", cursor: "pointer"}}
       />

       <div style = {{display: "flex", gap: "15px"}}>

      <Button style = {{border: "1px solid #F2994A", borderRadius: "6px",
        width: "45%", height: "30px"}}
        onClick = {()=>{props.hideModal()}}
         > Cancel</Button>

       <Button variant="contained" style = {{background: "#3245E9", borderRadius: "6px",
        width: "45%", height: "30px"}}
        onClick = {()=> props.onOk()}> Ok</Button>

        </div>


      </div>
        </MyModal>
    )
}

export default ImagePopUp