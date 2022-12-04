import { Typography } from "@material-ui/core"
import { useDispatch } from "react-redux"
import OrderLists from "../containers/OrderContainers/OrderLIsts"
import React, {useState} from "react"
import useFetch from "../funcrions/DataFetchers"
import { setCustomers } from "../redux/actions/customersActions";
import { setStyles } from "../redux/actions/stylesActions";
import { setMenus } from "../redux/actions/menusActions";

const NewOrders = () => {

    const [state, setState] = useState(0)
    const dispatch = useDispatch()

    dispatch(setCustomers(useFetch("customers/customers-with-transactions", state, "customers")))
    dispatch(setStyles(useFetch("styles", state, "styles")))
    dispatch(setMenus(useFetch("menus", state, "menus")))

    return (
        <div
        id="uni"
        style={{
          height: "100%",
          width: "95%",
          margin: "0px auto",
          display: "flex",
          gap: "14px",
          flexDirection: "column",
        }}
        >
        <Typography style = {{fontWeight: "600",
    fontSize: '25px'}}> New Order </Typography>
        <OrderLists />
        
        </div>
    )
}

export default NewOrders