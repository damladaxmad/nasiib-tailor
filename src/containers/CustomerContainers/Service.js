import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";
import moment from "moment/moment";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MenuItem, Menu } from "@material-ui/core";
import { useSelector } from "react-redux";
import AssignOrderToUser from "../ListContainers/AssingOrderToUser";

const Service = (props) => {
  const [image, setImage] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const [assignService, setAssignService] = useState(false)
  const [change, setChange] = useState(1)
  const [localService, setLocalService] = useState(null)
  const [notFinish, setNotFinish] = useState(false)

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    axios
      .get(`${constants.baseUrl}/files/${props.service.imageUrl}`, {
        responseType: "blob",
      })
      .then((res) => {
        setImage(URL.createObjectURL(res.data));
      });
  }, []);


  useEffect(() => {
    if (change == 1) return
    axios.get(`${constants.baseUrl}/services/${props.service.id}`).then(res => {
      setLocalService(res.data.data?.service)
    })
  }, [change])

  console.log(localService)
 
  const optionHadler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const assingService = () => {
    setAssignService(true)
  }

  const finishService = async() => {
    await axios.post(`${constants.baseUrl}/services/finish-service/${props.service?.id}`).then((res) => {
      alert("Successfully finished service!")
      setChange(state => state + 1)
    })
  }


  return (
    <div
    class = "myDiv"
      style={{
        width: "255px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        gap: "15px",
      }}
    >
      {assignService && <AssignOrderToUser hideModal = {()=> {
        setAssignService(false)}} 
        serviceId = {props.service?.id} 
        order = {props.order}
        back = {() => props.back()}
        change = {() => setChange(state => state + 1)}
      />}
      <div style = {{padding: "10px", display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        gap: "15px",}}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography style={{ color: "#3245E9", fontWeight: "600" }}>
          {" "}
         {props.service.type}
        </Typography>

      <div style = {{display: "flex", alignItems: "center", gap: "10px"}}>
        <Typography style = {{
          color: "#8B8B8B"
        }}> {constants.moneySign}{props.service.unitPrice} / {props.service.quantity}</Typography>

       { props.kind == "list" && <BiDotsVerticalRounded style = {{fontSize: "18px", cursor: "pointer",
        fontWeight: "600"}} 
            onClick = {optionHadler}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
              /> }
        </div>
      </div>

      <div>
      <img
        src={image}
        style={{ width: "100%", height: "150px", borderRadius: "8px" }}
      />
           <p style = {{fontSize: "14px",
        margin: "0px", color: "#8B8B8B"}}> {props.service?.menu?.name}</p>
      </div>
   
      <div>
        <Typography style={{ fontWeight: "600", fontSize: "14px" }}>
          {" "}
          Styles:
        </Typography>

        <div style={{ display: "flex", gap: "12px", marginTop: "10px",
      flexWrap: "wrap" }}>
          {props.service?.styles?.map((style) => (
            <div style = {{background: "#F0F2FA",
            borderRadius: "6px", padding: "6px"}}>
            <p
              style={{
                margin: "0px",
                fontSize: "13px",
              }}
            >
              {style}
            </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Typography style={{ fontWeight: "600", fontSize: "14px" }}>
          {" "}
          Sizes:
        </Typography>

        <div style={{ display: "flex", gap: "25px", marginTop: "10px",
      flexWrap: "wrap" }}>
          {props.service.sizes.map((size) => (
            <div
              style={{ display: "flex", flexDirection: "row", gap: "4px",
            flexWrap: "wrap" }}
            >
              <Typography style={{ fontWeight: "550" }}>
                {size.title.toUpperCase()}
              </Typography>:
              <Typography > {size.value}</Typography>
            </div>
          ))}
        </div>
      </div>
      </div>
        
        {props.kind == "list" && <div style={{width: "100%", background: "#E2E2E2",
      borderRadius: "0px 0px 8px 8px", padding: "6px 10px", display: "flex",
      gap: "10px", justifyContent: "space-between",
      marginTop: "auto"}}> 
      {props.kind == "list" && <Typography style = {{fontWeight: "500",
    fontSize: "14px"}}> 
    {!localService ? props.service?.servedUser ? props.service?.servedUser?.name : "Not assigned" :
    localService?.servedUser ? localService?.servedUser?.name : "Not assigned" }</Typography> }

      <Typography style = {{fontWeight: "600",
    fontSize: "14px", color: (props.service?.status == "finished" || localService?.status == "finished") ? "green" : "#3245E9"}}> 
    {!localService ? props.service?.status : localService?.status}</Typography>
      </div> }

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {(!localService ? props.service?.status == "pending" : 
        localService?.status == "pending") && <MenuItem onClick={() => {
          handleClose()
          if (activeUser.privillages.includes("Assign Order")){
            assingService()
          } else {
            alert("You hae no access!")
          }
        } }>
          Assign Service</MenuItem> }

        {(!localService ? props.service?.status == "on-service" : 
        localService?.status == "on-service") && <MenuItem onClick={() => {
          handleClose()
          if (activeUser.privillages.includes("Finish Order")){
            finishService()
          } else {
            alert("You hae no access!")
          }
        } }>
          Finish Service</MenuItem>}
        
      </Menu>
    </div>
  );
};

export default Service;
