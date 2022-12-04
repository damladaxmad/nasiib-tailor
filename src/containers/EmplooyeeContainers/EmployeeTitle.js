import Modal from "../../Modal/Modal";
import { Button, Divider, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {Select} from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";
import Emplooyees from "../../Pages/Employees";
import useFetch from "../../funcrions/DataFetchers";
import {AiOutlineDelete} from "react-icons/ai"
import { setEmployeeTitle } from "../../redux/actions/employeeTtileActions";

const EmplooyeeTitle = (props) => {

  const [state, setState] = useState("")
  const [title, setTitle] = useState("")
  const dispatch = useDispatch()
  console.log(useFetch("employeeTitle", state, "employeeTitles"))
  const employeeTitles = useSelector(state => state.employeeTitle.employeeTitle)
  dispatch(setEmployeeTitle(useFetch("employeeTitle", state, "employeeTitles")))

  const deleteHandler = (id) => {
    axios.delete(`${constants.baseUrl}/employeeTitle/${id}`).then(()=> {
      alert("Successfully Deleted")
      setState(id)
    }).catch(()=> {
      alert("Could not delete")
    })
  }

  const addHandler = () => {
    if (title != "") {
      setState(title)
      setTitle("")
      axios.post(`${constants.baseUrl}/employeeTitle`, {
        title
      })
    }
  }

  useEffect(()=> {
    
  }, [title])

  return (
    <Modal onClose = {props.hideModal} pwidth = "350px" left = "39%">

        <div style={{width: "350px", display: "flex", gap: "10px",
      flexDirection: "column", height: "307px", padding: "20px",
      overflowY: employeeTitles?.length > 4 ? "scroll" : "none"}}>

      <h3 style={{alignSelf: "center"}}> Add Titles</h3>

      <div style = {{display: "flex", gap: "10px", marginBottom: "10px"}}>
        <input
          type="text"
          placeholder="Enter Title"
          value= {title}
          style={{
            width: "230px",
            height: "35px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#EFF0F6",
            border: "none",
          }}
          onChange={(e) => setTitle(e.target.value)}
        />
            <Button
          style={{
            width: "80px",
            height: "35px",
            fontSize: "16px",
            backgroundColor: "#2F49D1",
            color: "white",
            marginLeft: props.name == "Expense" && "200px"
          }}
          variant="contained"
          onClick={addHandler}
        >
          Add
        </Button>
      </div>

      {!employeeTitles && <p style = {{alignSelf: 'center'}}> Loading...</p>}

           {employeeTitles?.map(emp => {
            return <div style={{display: "flex", justifyContent: "space-between",
            width: "100%", fontSize: "16px", padding: "1px"}}> 
                <p key = {emp.id} > {emp.title}</p>
                <AiOutlineDelete style={{cursor: "pointer"}}
                onClick = {()=>deleteHandler(emp.id)}/>
            </div>
           })}

   </div>
    </Modal>
  );
};

export default EmplooyeeTitle;
