import shaatiImage from "../../assets/images/shaati.webp";
import surwaalImage from "../../assets/images/surwaal.jpg";
import futishaariImage from "../../assets/images/futishaari.jpg";
import qamiisImage from "../../assets/images/qamiis.jpg";
import jaakadImage from "../../assets/images/jaakad.jpg";
import customImage from "../../assets/images/customImage.webp";
import jumloImage from "../../assets/images/vip.jpg";
import { Button, Typography } from "@material-ui/core";
import { useState } from "react";
import OrderForm from "./OrderForms/OrderForm";
import CustomForm from "./OrderForms/customForm";
import JumloForm from "./OrderForms/JumloForm";

const types = [
  { typeName: "Shaati", typeImage: shaatiImage },
  { typeName: "Surwaal", typeImage: surwaalImage },
  { typeName: "Futishaari", typeImage: futishaariImage },
  { typeName: "Qamiis", typeImage: qamiisImage },
  { typeName: "Jaakad", typeImage: jaakadImage },
  // { typeName: "Isku Joog", typeImage: jaakadImage },
  { typeName: "Custom", typeImage: customImage },
  { typeName: "Jumlo", typeImage: jumloImage },
];

const OrderLists = (props) => {
    const [orderForm, setOrderForm] = useState(false)
    const [customForm, setCustomForm] = useState(false)
    const [jumloForm, setJumloForm] = useState(false)
    const [type, setType] = useState()

  return (
    <div style = {{display: "flex", gap: "40px", flexWrap: "wrap",
    marginTop: "20px"}}
    class = "myDiv">

        {(orderForm && type.typeName != "Custom") && <OrderForm hideModal = {()=> setOrderForm(false)}
        type = {type} />}
        {(customForm && type.typeName == "Custom") && <CustomForm hideModal = {()=> setCustomForm(false)}
        type = {type} />}
        {(jumloForm && type.typeName == "Jumlo") && <JumloForm hideModal = {()=> setJumloForm(false)}
        type = {type} />}

      {types.map((type) => (
        <div
          style={{
            width: "210px",
            display: "flex",
            flexDirection: "column",
            padding: "12px",
            background: "white",
            borderRadius: "8px",
            gap: "10px"
          }}
        >
          <Typography style={{ fontWeight: "600", fontSize: "16px" }}>
            {" "}
            {type.typeName}
          </Typography>
          <img
            src={type.typeImage}
            style={{
              width: "100%",
              height: "160px",
              borderRadius: "8px"
            }}
          />
          <Button
            variant="contained"
            style={{
              background: "#3245E9",
              borderRadius: "6px",
              height: "35px",
              color: "white",
              fontSize:"16px"
            }}
            onClick = {()=> {
              (type.typeName != "Custom" && type.typeName != "Jumlo") &&setOrderForm(true)
              type.typeName == "Custom" && setCustomForm(true)
              type.typeName == "Jumlo" && setJumloForm(true)
              setType(type)
            }}
          >
            {" "}
            ORDER
          </Button>
        </div>
      ))}
    </div>
  );
};

export default OrderLists;
