import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import useFetch from "../../funcrions/DataFetchers";
import image from "../../assets/images/vip.jpg";
import { display } from "@mui/system";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";
import Service from "./Service";

const CustomerOrders = (props) => {
  const [orders, setOrders] = useState();
  const [state, setState] = useState(true)

  useEffect(() => {
    axios
      .get(`${constants.baseUrl}/customers/orders/${props.data._id}`)
      .then((res) => {
        setOrders(res.data.orders);
        setState(false)
      })
      .catch((err) => {
        alert("failed to get request.");
      });
  }, []);

  // Getting the number of items
  let items = 0;
  let services = [];
  orders?.map((order) => {
    Array.prototype.push.apply(services, order.services);
  });

  services.map(service => {
    items += service.quantity
  })

  const customerInfo = [
    { title: "Name:", content: props.data.name },
    { title: "Phone:", content: props.data.phone },
    { title: "Orders:", content: orders?.length ? orders?.length : "0" },
    { title: "Items:", content: items },
  ];

  return (
    <div
      style={{
        width: "95%",
        margin: "30px auto",
        display: "flex",
        gap: "45px",
        flexWrap: "wrap",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          background: "white",
          borderRadius: "6px",
          padding: "15px 0px",
          justifyContent: "space-around",
          border: "1.5px solid lightGrey",
          flexWrap: "wrap"
        }}
      >
        {customerInfo.map((info) => (
          <div style={{ display: "flex", gap: "20px" }}>
            <Typography style={{ fontWeight: "600", fontSize: "16px" }}>
              {info.title}
            </Typography>
            <Typography
              style={{
                fontSize: "16px",
              }}
            >
              {info.content}
            </Typography>
          </div>
        ))}
      </div>
      {state ? <p> Loading...</p> : services?.length < 1 ? <p>No Orders to display!</p> : null}
      <div
        style={{
          display: "flex",
          width: "100%",
        //   justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "45px",
        }}
      >
        {services?.reverse().map((service) => {
          return (<Service service={service} deadline = {orders?.date}
            kind = "customer"/>)
        })}
      </div>
    </div>
  );
};

export default CustomerOrders;
