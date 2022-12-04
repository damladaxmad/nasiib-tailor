import { Button } from "@material-ui/core";
import { Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../../Helpers/constantsFile";
import { setUsers } from "../../redux/actions/usersActions";
import Service from "../CustomerContainers/Service";
import AssignOrderToUser from "./AssingOrderToUser";
import "./list.css";
import PaymentForm from "./PaymentForm";

const ListDetails = (props) => {
  const activeUser = useSelector((state) => state.activeUser.activeUser);
  const [paymentForm, setPaymentForm] = useState(false);
  const [assign, setAssign] = useState(false);
  const dispatch = useDispatch();

  const information = [
    {title: "Name", content: props.order?.customer?.name},
    {title: "Phone", content: props.order?.customer?.phone},
    {title: "Balance", content: `$${props.order?.balance}`},
    {title: "Deadline", content: moment(props.order?.deadline).format("YYYY/MM/DD")},
  ]
  const orderActions = () => {
    if (
      props.order?.status == "on-service" &&
      activeUser.privillages?.includes("Finish Order")
    ) {
      axios
        .post(`${constants.baseUrl}/orders/finish-order/${props.order?.id}`)
        .then(() => {
          alert("Successfully Finished Order");
          props.change();
          props.back()
        });
    }
    if (
      props.order?.status == "finished" &&
      activeUser.privillages?.includes("Take Order")
    ) {
      setPaymentForm(true);
    }
    if (
      props.order?.status == "pending" &&
      activeUser.privillages?.includes("Assign Order")
    ) {
      setAssign(true);
    }
    // else {
    //   alert("You have no access!")
    // }
  };

  const cancelOrder = () => {
    axios
      .patch(`${constants.baseUrl}/orders/${props.order?.id}`, {
        status: "cancelled"
      })
      .then(() => {
        alert("Successfully Cancelled Order");
        props.change();
        props.back()
      }).catch(err => {alert(err.response.data.message)});
  };
 

  const fetchUsers = async () => {
    const response = await axios
      .get(`${constants.baseUrl}/users`)
      .catch((err) => {
        alert(err.response.data.message);
      });
    dispatch(setUsers(response.data.data.users));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const isFinish = () => {
    let isFinished = true
    props.order?.services?.map(service => {
      if (service.status != "finished") return isFinished = false
    })

    return isFinished

  }


  useEffect(()=> {
    console.log("Change is happening..")
  }, [props.order])


  return (
    <div
      class="myDiv"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "95%",
        margin: "auto",
        gap: "80px",
      }}
    >
      {paymentForm && (
        <PaymentForm
          hideModal={() => setPaymentForm(false)}
          orderId={props.order?.id}
          balance={props.order?.balance}
          change={() => props.change()}
          back={() => props.back()}
        />
      )}
      {assign && (
        <AssignOrderToUser
          hideModal={() => setAssign(false)}
          orderId={props.order?.id}
          change={() => props.change()}
          back={() => props.back()}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px",
        flexWrap: "wrap", height: "230px"
      // height: "150px", overflowY: props.order?.services?.length > 3 && "scroll" 
      }}>
          {props.order?.services?.map((service) => (
            <div
              style={{
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90px",
                height: "30px",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              {service.type}
            </div>
          ))}

          <div
            style={{
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "90px",
              height: "30px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            {props.order.orderNumber < 10
              ? "00"
              : props.order.orderNumber < 100
              ? "0"
              : null}
            {props.order.orderNumber}
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            gap: "10px",
            width: "300px",
            height: "165px"
          }}
        >
          {information.map(info => (
            <div style={{ display: "flex", gap: "20px", 
            gap: "30px",  }}>
            <Typography style={{ fontWeight: "600", fontSize: "16px" }}>
              {info.title}:
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

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Button
            variant="contained"
            style={{
              color: "white",
              borderRadius: "8px",
              background: "#3245E9",
              width: "100px",
            }}
            onClick={() => props.back()}
          >
            Back
          </Button>

          {(props.order?.status != "taken" && props.order?.status != "invoiced" 
          && props.order?.status != "pending" 
          && isFinish()) && <Button
            variant="contained"
            style={{
              color: "white",
              borderRadius: "8px",
              background: "#F2994A",
              width: "100px",
            }}
            onClick={orderActions}
          >
            {props.order?.status == "on-service"
              ? "finish"
              : "take"}
          </Button>}
          <Button
            variant="contained"
            style={{
              color: "white",
              borderRadius: "8px",
              background: "#F2994A",
              width: "100px",
            }}
            onClick={cancelOrder}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <p style={{ fontSize: "22px", fontWeight: "700", margin: "0px" }}>
          Services
        </p>
        <div style={{ display: "flex", gap: "100px", flexWrap: "wrap" }}>
          {props.order?.services.map((service, index) => (
            <Service service={service} deadline={props.order.deadline} 
            order = {props.order}
            key = {index} kind = "list"
            change = {()=> props.change()}
            back={() => props.back()}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default ListDetails;
