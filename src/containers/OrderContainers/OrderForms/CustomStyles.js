import { Checkbox, FormControlLabel, FormGroup, Typography } from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux"
import React, {useState, useEffect} from "react"
import { setStyles } from "../../../redux/actions/stylesActions";
import useFetch from "../../../funcrions/DataFetchers";
import Register from "../../../utils/Register";

const CustomStyles = (props) => {
  const styles = useSelector(state => state.styles.styles)
  const [styleData, setStyleData] = useState([])
  const [unitPrice, setUnitPrice] = useState()

  const changeHandler = (e) => {
    setUnitPrice(e.target.value)
  }
  
  let currentStyles = []
  styles?.map(style => {
    if (style.type == props.type)
    currentStyles.push(style)
  })

  const addStyles = (style) => {
    setStyleData([...styleData, style]);
  };

  const removeStyles = (style) => {
    setStyleData((arr) => arr.filter((el) => el !== style));
  };

  useEffect(()=> {
    !props.isUniform && props.data({styles: styleData, unitPrice: unitPrice})
    props.isUniform && props.data({styles: styleData})
  }, [styleData, unitPrice])

  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Description", type: "text", name: "description" }
  ];

  const [change, setChange] = useState(1)
  const [register, setRegister] = useState(false)

  const changeHandler2 = () => {
    setChange(state => state + 1 )
  }

  const dispatch = useDispatch()
  dispatch(setStyles(useFetch("styles", change, "styles")))

  useEffect(()=> {
  },[change])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "70%",
        flexWrap: "wrap",
        margin: "0px auto",
        // justifyContent: "center",
        justifyContent: "center",
        marginLeft: "180px",
      }}
      class="myDiv"
    >
        <div style = {{display: "flex", width: "100%", flexWrap: "wrap",
      height: "100px", overflowY: "scroll"}}>
      {currentStyles?.map((style) => (
        <SingleOutChecks style = {style} key = {style.id} 
        styleData = {styleData} addStyles = {(style) => addStyles(style)}
        removeStyles = {(style) => removeStyles(style)}/>
      ))}

    {register && (
          <Register
            hideModal={() => {
              setRegister(false);
              changeHandler2()
            }}
            change = {changeHandler2}
            fields={fields}
            url="styles"
            name="Styles"
            styleType = {props.type}
          />
        )}
      </div>

   <div style = {{display: "flex", alignItems: "center", gap: "130px"}}>
     {!props.isUniform && <div style={{display: "flex", gap: "10px", flexDirection: "column",
     marginLeft: "15px"}}>
      <Typography
            style={{ fontWeight: "600", fontSize: "14px", marginLeft: "3px" }}
          >
            UnitPrice:
          </Typography>
      <input
            type= "number"
            onChange={changeHandler}
            style={{
              width: "170px",
              height: "40px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "2px solid black",
            }}
          />
          </div> }
          <p style={{
                color: "#3245E9",
                // margin: "0px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => setRegister(true)}> Add Style</p>
      </div>
    </div>
  );
};


const SingleOutChecks = (props) => {

  const [check, setCheck] = useState(false)

  const changeHandler = (data) => {
    if (!props.styleData.includes(data)){
      props.addStyles(data)
    }
    if (props.styleData.includes(data)){
      props.removeStyles(data)
    }
    setCheck(state => !state)
  }

  return (
        <FormGroup style={{ width: "38%" }} >
          <FormControlLabel
            control={
              <Checkbox
                style={{ padding: "10px 25px" }}
                value={props.style.name}
                color="primary"
                checked={check}
                  onChange={() => changeHandler(props.style.name)}
              />
            }
            label={props.style.name}
          />
        </FormGroup>
  )
}

export default CustomStyles;
