import { Button, formatMs, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import MyModal from "../../Modal/Modal";
import React, { useState } from "react";
import { constants } from "../../Helpers/constantsFile";

const AddNewMenu = (props) => {
  const [file, setFile] = useState();
  const [name, setName] = useState(props.update ? props.name : null);
  const [disabled, setDisabled] = useState(false);
  const formData = new FormData();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  if (file ) {
    formData.append("cover", file);
  }

  const addMenuHandler = () => {
    setDisabled(true);
    formData.append("name", `MENU ${name.toUpperCase()}`);
    if (props.update) {
      axios
        .patch(`${constants.baseUrl}/menus/${props.id}`, formData)
        .then((res) => {
          alert("Successfully Updated");
          props.hideModal();
          // props.change();
        })
        .catch((err) => {
          alert("Failed");
          setDisabled(false);
        });
    } else {
      axios
        .post(`${constants.baseUrl}/menus`, formData)
        .then((res) => {
          alert("Successfully Created");
          props.hideModal();
          props.change();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  return (
    <MyModal onClose={() => props.hideModal()}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "25px 40px",
        }}
      >
        <Typography style={{ fontWeight: "600", fontSize: "14px" }}>
          {" "}
          Menu Name:
        </Typography>
        <input
          value={name}
          type="text"
          style={{
            width: "300px",
            height: "45px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#EFF0F6",
            border: "none",
          }}
          onChange={(e) => setName(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            background: "#F3F3F3",
            width: "300px",
            alignItems: "center",
            fontWeight: "bolder",
            fontSize: "18px",
            borderRadius: "6px",
            border: "thin solid #F2994A",
            height: "45px",
            background: "white",
          }}
        >
          <label style={{ fontSize: "15px", cursor: "pointer" }}>
            {" "}
            Select Image
            <input
              id="inputTag"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => handleFile(e)}
            />
          </label>
        </div>

        <Button
          disabled = {disabled}
          variant="contained"
          style={{
            background: disabled ? "lightGray" : "#3245E9",
            borderRadius: "6px",
            width: "300px",
            height: "45px",
            color: "white",
            fontWeight: "bold"
          }}
          onClick={addMenuHandler}
        >
          {" "}
          {props.update ? "Update Menu" : "ADD MENU"}
        </Button>
      </div>
    </MyModal>
  );
};

export default AddNewMenu;