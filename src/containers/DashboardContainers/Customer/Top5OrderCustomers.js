import { Typography } from "@material-ui/core"

const Top5OrderCustomers = (props) => {

    console.log(props.data)

    return (
        <div style = {{background: "white", padding: "24px", 
        borderRadius: "9px", display: "flex", flexDirection: "column",
        gap: "8px", width: "320px"}}>
            <Typography style = {{color: "#3245E9", fontWeight: "bold"}}>
              Customer Orders
            </Typography>
            <Typography style = {{fontWeight: "600", fontSize: "22px"}}>
            Top order customers
            </Typography>

            {props.data?.map((order, index) => {
                return <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", gap: "14px",}}>
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> {index + 1}. </Typography>
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> {order.username} </Typography>
                    </div>
                    <Typography style = {{ fontSize: "15px",
                color: "#575656"}}> {order.orders} </Typography>
                </div>
                })}


        </div>
    )
}

export default Top5OrderCustomers