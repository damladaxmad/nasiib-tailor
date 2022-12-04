import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { formatMs, Typography } from "@material-ui/core";
import { constants } from "../../../Helpers/constantsFile";
import axios from "axios";

const SizesForm = (props) => {


  const arr = props.type == "Surwaal" ?  
   [
    { label: "Enter Amount", type: "number", name: "l" },
    { label: "Enter Amount", type: "number", name: "p" },
    { label: "Enter Amount", type: "number", name: "t" },
    { label: "Enter Amount", type: "number", name: "c" },
    { label: "Enter Amount", type: "number", name: "k" },
  ] : props.type == "Isku Joog" ?  [
    { label: "Enter Amount", type: "number", name: "l1" },
    { label: "Enter Amount", type: "number", name: "p1" },
    { label: "Enter Amount", type: "number", name: "m" },
    { label: "Enter Amount", type: "number", name: "s" },
    { label: "Enter Amount", type: "number", name: "k1" },
    { label: "Enter Amount", type: "number", name: "l2" },
    { label: "Enter Amount", type: "number", name: "p2" },
    { label: "Enter Amount", type: "number", name: "t" },
    { label: "Enter Amount", type: "number", name: "c" },
    { label: "Enter Amount", type: "number", name: "k2" },
  ] :
  [
    { label: "Enter Amount", type: "number", name: "l" },
    { label: "Enter Amount", type: "number", name: "p" },
    { label: "Enter Amount", type: "number", name: "m" },
    { label: "Enter Amount", type: "number", name: "s" },
    { label: "Enter Amount", type: "number", name: "k" },
  ];

  

  const errorStyle = { color: "red", marginLeft: "27px", fontSize: "16px" };

  const validate = (values) => {
    const errors = {};

    if (!values.l && values.l != 0) {
      errors.l = "Field is Required";
    }
    if (!values.p && values.p != 0) {
      errors.p = "Field is Required";
    }
    if (props.type != "Surwaal" && !values.m && values.m != 0) {
      errors.m = "Field is Required";
    }
    if (props.type != "Surwaal" && !values.s && values.s != 0) {
      errors.s = "Field is Required";
    }
    if (props.type == "Surwaal" && !values.t && values.t != 0) {
      errors.t = "Field is Required";
    }
    if (props.type == "Surwaal" && !values.c && values.c != 0) {
      errors.c = "Field is Required";
    }
    if (!values.k && values.k != 0) {
      errors.k = "Field is Required";
    }
    return errors;
  };

  

 const init1 = {
  l: null,
  p: null,
  m: null,
  s: null,
  k: null,
}
const init2 = {
  l: null,
  p: null,
  t: null,
  c: null,
  k: null,
}
const init3 = {
  l1: null,
  p1: null,
  t: null,
  c: null,
  k1: null,
  l2: null,
  p2: null,
  m: null,
  s: null,
  k2: null,
}
  const formik = useFormik({
    initialValues: props.olderSizes ? props.olderSizes : props.type == "Surwaal" ? init2 : props.type == "Isku Joog" ? init3 :  init1,
    validate,
    enableReintialize: true
  });

  useEffect(()=> {
    let sizeData = []
    const arrayOfObj = Object.entries(formik.values).map((e) => ( { [e[0]]: e[1] } ));
    arrayOfObj.map((obj, index) => {
      sizeData.push({title: Object.keys(obj)[0], value: Object.values(obj)[0]})
    })
    
    props.data({sizes: sizeData})
  }, [formik.values])
  
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        padding: "20px 0px",
        alignItems: "center",
        width: "60%",
        flexWrap: "wrap"
      }}
    >
      {arr.map((a, index) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px",
        }}>
          <Typography
            style={{ fontWeight: "600", fontSize: "14px", marginLeft: "3px" }}
          >
            {" "}
            {a.name.toUpperCase()}:
          </Typography>
          <input
            id={a.name}
            name={a.name}
            type={a.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[a.name]}
            style={{
              width: "70px",
              height: "45px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "2px solid black",
            }}
            key={index}
          />
          {formik.touched[a.name] && formik.errors[a.name] ? (
            <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
          ) : null}
        </div>
      ))}
    </form>
  );
};

export default SizesForm;
