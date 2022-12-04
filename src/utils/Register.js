import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button, FormControl, MenuItem } from "@mui/material";
import {AiOutlinePlus} from "react-icons/ai"
import Modal from "../Modal/Modal";
import { constants } from "../Helpers/constantsFile";
import { useSelector } from "react-redux";
import EmplooyeeTitle from "../containers/EmplooyeeContainers/EmployeeTitle";

const Register = (props) => {

  const types = ["Shaati", "Surwaal", "Qamiis", "Jaakad", "Futishaari"]
  const [type, setType] = useState("")

  const typeHandler = (e) => {
    setType(e.target.value)
  }

  const validate = (values) => {
    const errors = {};

   if (props.name !== "Expense") {
     if (!values.name) {
       errors.name = "Field is Required";
     }
   }

   if (props.name == "Expense") {

    // if (!values.description) {
    //   errors.description = "Field is Required";
    // }
    if (!values.date) {
      errors.date = "Field is Required";
    }
    if (!values.amount) {
      errors.amount = "Field is Required";
    }
    if (!values.to) {
      errors.to = "Field is Required";
    }
  }

    return errors;
  };

  const formik = useFormik({
    initialValues: props.name == "Employee" ? {
      phone: props.update ? props.instance.phone : "",
      name: props.update ? props.instance.name : "",
      role: props.update ? props.instance.role : "",
    } : props.name == "Styles" ?  {
      type: props.update ? props.instance.type : "",
      name: props.update ? props.instance.name : "",
      description: props.update ? props.instance.description : "",
    }
    : {
        name: props.update ? props.instance.name : "",
        phone: props.update ? props.instance.phone : "",
        deadline: props.update ? props.instance.deadline : "",
        type: props.update ? props.instance.type : ""
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (props.name == "Styles" && !props.styleType) values.type = type
      if (props.name == "Styles" && !values.description) values.description = values.name
      if (props.name == "Styles" && props.styleType) values.type = props.styleType
      if (props.update){
        axios.patch(`${constants.baseUrl}/${props.url}/${props.instance._id}`, values).then((res) => {
          alert("Successfully Updated")
          resetForm();
          props.reset()
          props.hideModal()
          props.name == "Employee" && props.change()
        }).catch((err) => {
          alert(err.response?.data?.message);
        });
        props.reset()
      } else {
        
        axios.post(`${constants.baseUrl}/${props.url}`, values).then((res) => {
          alert("Successfully Created")
          resetForm();
          // (props.name == "Customer" || props.name == "Vendor")&&props.reset()
          props.hideModal()
          props.change()
        }).catch((err) => {
          alert(err.response.data.message);
          // props.reset()
        });
        // props.change()
          props.hideModal()
          // props.reset()
      }    
    
    },
  });

 
  return (
    <Modal onClose = {props.hideModal} pwidth = {props.name == "Expense" ?"630px" : "450px"}
    left = {props.name == "Expense" ? "32%" : "35%"}>
       <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <h2>{props.update ? `${props.name} Update` : `${props.name} Creation`}</h2>
     

        <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", gap: "16px",
      flexDirection: props.name == "Expense" ? "row" : "column", alignItems: "center",
    flexWrap: props.name == "Expense" ? "wrap" : "nowrap" }}
      >
        {props.fields?.map((a, index) => (
          <div>
            <TextField
              variant="outlined"
              label={a.label}
              id={a.name}
              name={a.name}
              type={a.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[a.name]}
              style={{ width: "290px", color: "black" }}
              key={index}
            />
            {formik.touched[a.name] && formik.errors[a.name] ? (
              <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
            ) : null}
          </div>
        ))}

      {(props.name == "Styles" && !props.styleType) &&  <FormControl
              style={{
                padding: "0px",
                margin: "0px",
                width: "290px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <TextField
                select
                style={{width: "100%", color: "black"}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Select a type"
                onChange={typeHandler}
              >
               {types?.map((type, index) => (
                  <MenuItem value={type} key={index}>
                    {type}
                  </MenuItem>
                ))
              }
              </TextField>

              
            </FormControl>}

        <Button
          style={{
            width: "290px",
            fontSize: "16px",
            backgroundColor: "#2F49D1",
            color: "white",
            marginLeft: props.name == "Expense" && "200px"
          }}
          type="submit"
          variant="contained"
        >
          {props.update ? `Update ${props.name}` : `Create ${props.name}`}
        </Button>
      </form>

      </div>
    </Modal>
  );
};

export default Register;
