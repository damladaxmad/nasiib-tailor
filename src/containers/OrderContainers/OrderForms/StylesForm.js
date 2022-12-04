import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux"
import React, {useState, useEffect} from "react"
import Register from "../../../utils/Register";
import { setStyles } from "../../../redux/actions/stylesActions";
import useFetch from "../../../funcrions/DataFetchers";

const StylesForm = (props) => {
  const styles = useSelector(state => state.styles.styles)
  const [styleData, setStyleData] = useState([])
  const [register, setRegister] = useState(false)

  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Description", type: "text", name: "description" }
  ];
  
  let currentStyles = []
  styles?.map(style => {
    if (props.type != "Isku Joog") {
      if (style.type == props.type) {
        currentStyles.push(style)
      }
    } else {
      if (style.type == "Shaati" || style.type == "Surwaal") {
        currentStyles.push(style)
      }
    }
  })

  const addStyles = (style) => {
    setStyleData([...styleData, style]);
  };

  const removeStyles = (style) => {
    setStyleData((arr) => arr.filter((el) => el !== style));
  };

  useEffect(()=> {
    props.data({styles: styleData})
  }, [styleData])

  const [change, setChange] = useState(1)

  const changeHandler = () => {
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
        gap: "15px",
        width: "70%",
        flexWrap: "wrap",
        margin: "0px auto",
        // justifyContent: "center",
        alignItems: "start",
        marginLeft: "180px",
        height: "180px",
        overflowY: "scroll"
      }}
      class="myDiv"
    >

      {currentStyles?.map((style) => (
        <SingleOutChecks style = {style} key = {style.id} 
        styleData = {styleData} addStyles = {(style) => addStyles(style)}
        removeStyles = {(style) => removeStyles(style)}/>
      ))}
      <p style={{
                color: "#3245E9",
                // margin: "0px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => setRegister(true)}> Add Style</p>

    {register && (
          <Register
            hideModal={() => {
              setRegister(false);
              changeHandler()
            }}
            change = {changeHandler}
            fields={fields}
            url="styles"
            name="Styles"
            styleType = {props.type != "Isku Joog" ? props.type : null}
          />
        )}
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

export default StylesForm;
