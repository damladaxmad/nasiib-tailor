import { Button, Typography } from "@material-ui/core"
import { useEffect } from "react"
import image from "../../assets/images/vip.jpg"

const ListOptions = (props) => {

    useEffect(()=> {

    }, [props.orders])
    
    return (
        <div style = {{ width: "95%",
        margin: "30px auto",
        display: "flex",
      }}>
          {!props.orders ? <p> Loading...</p> : 
          props.orders?.length < 1 ? <p style = {{width: "50%"}}> No orders to display</p> : null  }
          <div style={{
          display: "flex",
          gap: "25px",
          width: "100%",
          flexWrap: "wrap",
        }}>
            {props.orders?.map(order => (
            <ListOrder details = {(order)=> {
                  props.details(order)
                }} order = {order} />
              ))}
            </div>
        </div>
    )
}

const ListOrder = (props) => {

    return (
        <div class = "myDiv"
        style={{
            width: "290px",
            background: "white",
            display: "flex",
            flexDirection: "row",
            borderRadius: "8px",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px",
            gap: "0px",
            cursor: "pointer"
          }}
          onClick = {()=> props.details(props.order)}>

            <div style={{display: "flex", gap: "14px", alignItems: "center"}}>
     
        <p style = {{fontSize: "18px", fontWeight: "600",
        margin: "0px", color: "#ABA9A9",}}> 0{props.order.orderNumber}</p>
        
        <div>
          <p style = {{fontSize: "16px", fontWeight: "bold",
        margin: "0px"}}> {props.order.name.substring(0, 16)}
        {props.order.name.length <= 16 ? null : "..." }</p>
          <p style = {{fontSize: "14px",
        margin: "0px", color: "#8B8B8B"}}> {props.order.customer?.name.substring(0, 18)}
        {props.order.customer?.name.length <= 18 ? null : "..." }</p>
        </div>

        </div>
        
        <p style = {{fontSize: "18px", fontWeight: "bold",
        margin: "0px", color: "blue", cursor: "pointer"}} 
       > details</p>
            
        </div>

    )
}

export default ListOptions