import { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const Types = (props) => {
  const customers = useSelector((state) => state.customers.customers);
  const [customer, setCustomer] = useState();
  const [unitPrice, setUnitPrice] = useState()

  const changeHandler = (e) => {
    props.times(e.target.value)
  }

  const unitHandler = (e) => {
    setUnitPrice(e.target.value)
  }

  const customerHandler = (e) => {
    setCustomer(e.target.value);
    props.customer({customer: e.target.value})
    console.log(e.target.value)
  };

  const selectStyle = { height: "40px", color: "#B9B9B9", width: "100%" };

  const types = ["Shaati", "Futishaari", "Surwaal", "Qamiis", "Jaakad"];
  const [typeData, setTypeData] = useState([]);

  const addTypes = (type) => {
    setTypeData([...typeData, type]);
  };

  const removeTypes = (type) => {
    setTypeData((arr) => arr.filter((el) => el !== type));
  };

  const [check, setCheck] = useState(false);

  const checkHandler = (data) => {
    setCheck(state => !state)
    props.check(!check)
  }

  useEffect(() => {
    !props.type && props.data(typeData);
  }, [typeData]);

  useEffect(() => {
    props.type && props.unitPrice(unitPrice)
  }, [unitPrice])

  useEffect(()=> {
    props.customer({customer: customer})
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px",
    alignItems: "center" }}>
      <div style = {{display: "flex"}}>

        {!props.type && types.map((type, index) => (
          <SingleOutChecks
            type={type}
            key={index}
            typeData={typeData}
            addTypes={(type) => addTypes(type)}
            removeTypes={(type) => removeTypes(type)}
          />
        ))}

      </div>

    {props.type && <div style = {{display: "flex", alignItems: "center", gap: "14px"}}>
      <div style = {{display: "flex", gap: "10px", flexDirection: "column"}}>
      <Typography style={{ fontWeight: "600", fontSize: "14px" }}>
          {" "}
          Number:
        </Typography>
      <input
            type = "number"
            onChange={changeHandler}
            style={{
              width: "150px",
              height: "45px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "2px solid black",
            }}
          />
          </div>

          {check && <div style={{display: "flex", gap: "10px", flexDirection: "column",
     marginLeft: "15px"}}>
      <Typography
            style={{ fontWeight: "600", fontSize: "14px", marginLeft: "3px" }}
          >
            UnitPrice:
          </Typography>
      <input
            type = "number"
            onChange={unitHandler}
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

          <FormGroup style={{ width: "38%" }}>
      <FormControlLabel
        control={
          <Checkbox
            style={{ padding: "10px 25px" }}
            value={check}
            color="primary"
            checked={check}
            onChange={() => checkHandler(props.type)}
          />
        }
        label={"Uniform"}
      />
    </FormGroup>
    </div> }
    

      <FormControl style={{ width: "250px" }}>
        <TextField
          select
          style={selectStyle}
          label="Select a customer"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={customer}
          onChange={customerHandler}
        >
          {customers?.map((customer, index) => (
            <MenuItem value={customer._id} key={index}>
              {customer.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </div>
  );
};

const SingleOutChecks = (props) => {
  const [check, setCheck] = useState(false);

  const changeHandler = (data) => {
    if (!props.typeData.includes(data)) {
      props.addTypes(data);
    }
    if (props.typeData.includes(data)) {
      props.removeTypes(data);
    }
    setCheck((state) => !state);
  };

  return (
    <FormGroup style={{ width: "38%" }}>
      <FormControlLabel
        control={
          <Checkbox
            style={{ padding: "10px 25px" }}
            value={props.type}
            color="primary"
            checked={check}
            onChange={() => changeHandler(props.type)}
          />
        }
        label={props.type}
      />
    </FormGroup>
  );
};

export default Types;
