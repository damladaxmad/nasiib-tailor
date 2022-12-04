import MyModal from "../../../Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { constants } from "../../../Helpers/constantsFile";
import ImagePopUp from "./ImagePopUp";

const ProductModel = (props) => {
  
  const menus = useSelector((state) => state.menus.menus);
  const [menu, setMenu] = useState(menus[0]?._id);
  const [productModel, setProdcutModel] = useState(false);
  const [menuProdcuts, setMenuProducts] = useState();
  
  const menuHandler = (e) => {
    setMenu(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${constants.baseUrl}/menus/${menu}`)
      .then((res) => setMenuProducts(res.data.data.menu.menuProducts));
  }, [menu]);

  return (
    <MyModal
      onClose={() => props.hideModal()}
      background="rgb(0,0,0, 0.24)"
      pwidth="600px"
      left="32%"
    >
      <div
        style={{
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "600px",
          padding: "0px 10px",
          overflowY: "scroll",
          gap: "15px",
        }}
      >
        <FormControl style={{ width: "250px" }}>
          <Select
            style={{ width: "200px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={menu}
            onChange={menuHandler}
          >
            {menus?.map((menu, index) => (
              <MenuItem value={menu._id} key={index}>
                {menu.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div
          style={{
            height: "200px",
            overFlowY: "scroll",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {!menuProdcuts && <p>Loading...</p>}
          {menuProdcuts?.map((image) => (
            <ProductImages
             key = {image}
              image={image}
              menu = {menu}
              productName={(obj) => {
                props.productName(obj)
              }}
              menuStaff = {(data) => {
                props.menuStaff(data)
              }}
              
            />
          ))}
        </div>
      </div>
    </MyModal>
  );
};

const ProductImages = (props) => {
  const [image, setImage] = useState();
  const [imagePopUp, setImagePopUp] = useState(false)

  useEffect(() => {
    axios
      .get(`${constants.baseUrl}/files/${props.image}`, {
        responseType: "blob",
      })
      .then((res) => {
        setImage(URL.createObjectURL(res.data));
      });
  }, [props.image, props.menu]);

  return (
    <>
    <img
      src={image}
      style={{
        width: "32%",
        height: "120px",
        borderRadius: "6px",
        cursor: "pointer"
      }}
      onClick={() => {
        setImagePopUp(true)
      }}
    />
    {imagePopUp && <ImagePopUp hideModal = {()=> setImagePopUp(false)}
    product = {props.image} onOk = {() => {
      props.productName({image: props.image, menu: props.menu});
        props.menuStaff(props.menu)
        setImagePopUp(false)
    }}/>}
    </>
  );
};

export default ProductModel;
