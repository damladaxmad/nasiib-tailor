import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import MyModal from "../../Modal/Modal"
import { useSelector } from "react-redux";
import { constants } from "../../Helpers/constantsFile";

const PaymentForm = (props) => {

  const activeUser = useSelector(state => state.activeUser.activeUser)

  const [disabled, setDisabled] = useState(false)
  const loginArr = [
    { label: "Enter Amount", type: "number", name: "amount" },
  ];

  const validate = (values) => {
    const errors = {};

    if (!values.amount && values.amount != 0) {
      errors.amount = "Field is Required";
    }
    if (values.amount > props.balance) {
      errors.amount = "Amount cannot be bigger than the balance!"
    }
    return errors;
  };

  const apiHandler = async(url, message) => {
    const res = await axios.post(url, {user: activeUser.username}).then(()=> {
        props.hideModal()
        alert(message)
        setDisabled(false)
        props.change()
        props.back()
      }
      ).catch((err)=> {
        props.hideModal()
        alert(err.response.data.message);
        setDisabled(false)
      })
  }

  const formik = useFormik({
    initialValues: {
      amount: props.balance,
    },
    validate,
    onSubmit: async (values, { resetForm }) =>  {
      setDisabled(true)
    if (values.amount != 0) {
      await apiHandler(`${constants.baseUrl}/orders/payment/${props.orderId}/${values.amount}`, "Succesfully Payed")
    }
    if (props.balance > values.amount) {
        apiHandler(`${constants.baseUrl}/orders/invoice-order-to-customer/${props.orderId}/${activeUser.username}`, "Successfully Invoiced")
    }
    if (props.balance <= values.amount) {
        apiHandler(`${constants.baseUrl}/orders/take-order/${props.orderId}`, "Successfully Taken")
    }
    },
  });

  return (
    <MyModal onClose = {props.hideModal} width = "300px">
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", gap: "16px", flexWrap: "wrap",
      justifyContent: "center", flexDirection: "column", width: "380px",
      padding:"20px 0px",
      alignItems: "center"
     }}
    >
      {loginArr.map((a, index) => (
        <div>
          <input
            placeholder={a.label}
            id={a.name}
            name={a.name}
            type={a.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[a.name]}
            style={{
              width: "290px",
              height: "50px",
              padding: "15px",
              fontSize: "16px",
              border: "1px solid grey",
              borderRadius: "6px",
            }}
            key={index}
          />
          {formik.touched[a.name] && formik.errors[a.name] ? (
              <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
            ) : null}
        </div>
      ))}

      <button
        disabled = {disabled}
        style={{
          width: "290px",
          fontSize: "20px",
          backgroundColor: disabled ? "lightgrey" : "#2F49D1",
          fontWeight: "600",
          color: "white",
          height: "50px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        type="submit"
      >
        Pay Order
      </button>
    </form>
    </MyModal>
  );
};

export default PaymentForm;
