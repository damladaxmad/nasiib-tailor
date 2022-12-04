import { Button, formatMs, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import MyModal from "../../Modal/Modal";
import React, { useState } from "react";
import { constants } from "../../Helpers/constantsFile";

const AddNewProducts = (props) => {
  const [files, setFiles] = useState([]);
  const formData = new FormData();
  const [disabled, setDisabled] = useState(false)

  const handleFile = (e) => {
    setFiles(e.target.files);
  };

  if (files.length) {
    Array.from(files).forEach((file) => formData.append("menuProducts", file));
  }

  const addMenuHandler = () => {
    setDisabled(true)
    axios
      .post(
        `${constants.baseUrl}/menus/add-menu-products/${props.id}`,
        formData
      )
      .then((res) => {
        alert("Successfully Created");
        props.hideModal();
      })
      .catch((err) => {
        console.log(props.id, files);
        alert(err.response.data.message);
        setDisabled(false)
      });
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
            Select Images
            <input
              id="inputTag"
              type="file"
              style={{ display: "none" }}
              multiple
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
          ADD products
        </Button>
      </div>
    </MyModal>
  );
};

export default AddNewProducts;
