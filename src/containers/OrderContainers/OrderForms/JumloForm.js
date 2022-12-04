import { Button, Typography } from "@material-ui/core";
import { useState } from "react";
import MyModal from "../../../Modal/Modal";
import PaymentForm from "./PaymentForm";
import ProductForm from "./ProductForm";
import SizesForm from "./SizesForm";
import StylesForm from "./StylesForm";
import React, { useEffect } from "react";
import axios from "axios";
import { constants } from "../../../Helpers/constantsFile";
import CloseIcon from "@material-ui/icons/Close";
import swal from "sweetalert";
import { BiArrowBack } from "react-icons/bi";
import Register from "../../../utils/Register";
import { setCustomers } from "../../../redux/actions/customersActions";
import useFetch from "../../../funcrions/DataFetchers";
import { useDispatch } from "react-redux";
import Types from "./Types";
import CustomStyles from "./CustomStyles";
import { check } from "prettier";

const fields = [
  { label: "Enter Name", type: "text", name: "name" },
  { label: "Enter Phone", type: "text", name: "phone" },
];

const JumloForm = (props) => {
  const [orders, setOrders] = useState();
  const [change, setChange] = useState(1)

  const progress = [
    { name: "initials" },
    { name: "product" },
    { name: "sizes" },
    { name: "styles" },
    { name: "payment" },
  ];
  const [num, setNum] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(progress[num].name);
  const [disabled, setDisabled] = useState(false);
  const [types, setTypes] = useState([])
  const [typeNum, setTypeNum] = useState(0)
  const [currentType, setCurrentType] = useState(types[typeNum])
  const [times, setTimes] = useState(0)
  const [isUniform, setIsUniform] = useState(false)

  useEffect(() => {
    if (num < 5) setCurrentProgress(progress[num].name);
  }, [num]);

  useEffect(() => {
    if (typeNum < types.length) setCurrentType(types[typeNum]);
  }, [typeNum]);

  useEffect(()=> {
    setCurrentType(types[typeNum])
  }, [types])


  const [orderData, setOrderData] = useState({
    type: currentType,
    imageUrl: null,
    customer: null,
    sizes: null,
    menu: null,
    styles: null,
    advance: null,
    unitPrice: null,
    deadline: null,
  });

  const [services, setServices] = useState([])

  const dispatch = useDispatch()
  const [register, setRegister] = useState(false);
  dispatch(
    setCustomers(
      useFetch("customers", change, "customers")
    )
  );
  useEffect(() => {}, [register]);

  const [image, setImage] = useState();

  console.log(orderData)

  useEffect(() => {
    if (orderData.imageUrl)
      axios
        .get(`${constants.baseUrl}/files/${orderData.imageUrl}`, {
          responseType: "blob",
        })
        .then((res) => {
          setImage(URL.createObjectURL(res.data));
        });
  }, [orderData]);

  const myFunction = () => {
    let services = [];
    orders?.map((order) => {
      Array.prototype.push.apply(services, order.services);
    });

    let olderSizes = null;
    services.map((service) => {
      if (service.type == currentType) {
        olderSizes = service.sizes;
      }
    });

    let olderObject = {};
    olderSizes?.map((size) => {
      olderObject[size.title] = size.value;
    });

    return olderObject;
  };

  useEffect(() => {
    if (orderData.customer)
      axios
        .get(`${constants.baseUrl}/customers/orders/${orderData.customer}`)
        .then((res) => {
          setOrders(res.data.orders);
        })
        .catch((err) => {
          alert("failed to fetch");
        });
  }, [orderData.customer]);

  const postOrder = async (data) => {
    setDisabled(true);
    const res = await axios
      .post(`${constants.baseUrl}/orders`, data)
      .then((res) => {
        alert("Succesfully posted order.");
        props.hideModal();
      })
      .catch((err) => {
        alert(err.response.data.message);
        setDisabled(false);
      });
  };

  const completeOder = () => {
    const data = {
      customer: orderData.customer,
      advance: orderData.advance,
      deadline: orderData.deadline,
      services: services,
    };
    postOrder(data);
  };

  const closeForm = () => {
    swal({
      title: "Closing the form",
      text: `Are you sure to close the form?`,
      icon: "warning",
      buttons: {
        cancel: "No",
        confirm: { text: "Yes", className: "sweet-warning" },
      },
    }).then((response) => {
      if (response) {
        props.hideModal();
      }
    });
  };

  useEffect(()=> {
    setOrderData((prevState) => {
      return {
        ...prevState,
        type: currentType,
      };
    });
  }, [currentType])

  const setServiceHandler = () => {
    setServices([...services, {
      type: orderData.type,
      sizes: orderData.sizes,
      styles: orderData.styles,
      menu: orderData.menu,
      unitPrice: orderData.unitPrice,
      imageUrl: orderData.imageUrl,
      quantity: 1,
    }]);
  }

  const changeHandler = () => {
    setChange(state => state + 1 )
  }

  useEffect(()=> {

  },[change])

  const setterFun = () => {

    setNum(1)
    !isUniform && setOrderData((prevState) => {
      return {
        ...prevState,
        imageUrl: null,
        type: null,
        unitPrice: null,
        sizes: null,
        styles: null
      };
    })

  }

  return (
    <MyModal left="25%" top="23vh">
      <div
        style={{
          width: "750px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        
          justifyContent: "space-between",
          padding: "10px",
          height: "400px",
        }}
      >
        {register && (
          <Register
          hideModal={() => {
            setRegister(false);
            changeHandler()
          }}
          change = {changeHandler}
          fields={fields}
          url="customers"
          name="Customer"
        />
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between"
          }}
        >
          <img
            src={image}
            alt="Order Image"
            style={{
              width: "150px",
              height: "100px",
              borderRadius: "6px"
            }}
          />
         
          <div style={{ display: "flex", gap: "55px" }}>
            {progress.map((i, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    background:
                      currentProgress == i.name ? "#3245E9" : "#F0F2FA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: currentProgress == i.name && "white",
                  }}
                >
                  {index + 1}
                </div>
                <p
                  style={{
                    fontWeight: "500",
                    color: currentProgress == i.name && "#3245E9",
                  }}
                >
                  {" "}
                  {i.name}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "6px",
              justifyContent: "center",
              cursor: "pointer",
              height: "20px",
            }}
            onClick={() => {
              if (currentProgress != "initials") {
                setNum((state) => state - 1);
              }
            }}
          >
            <BiArrowBack
              style={{ cursor: "pointer", fontSize: "25px", color: "gray" }}
            />
            <Typography style={{ fontSize: "18px", color: "gray" }}>
              {" "}
              Back
            </Typography>
          </div>
          <CloseIcon
            style={{ cursor: "pointer", fontSize: "38px", color: "gray" }}
            onClick={closeForm}
          />
        </div>
        
         {currentProgress == "initials" && <Types 
         unitPrice = {(data) => 
            {
             setOrderData((prevState) => {
               return {
                 ...prevState,
                 unitPrice: parseInt(data),
               };
             });
           }}
         check = {(check) => {setIsUniform(check)}}
         type = "Jumlo"
         times = {(data) => {
            setTimes(data)
         }}
         data = {(data) => 
         {
          setOrderData((prevState) => {
            setTypes(data)
            return {
              ...prevState,
              type: data[typeNum],
            };
          });
        }}
         customer = {(data) => {
          setOrderData((prevState) => {
            return {
              ...prevState,
              customer: data.customer,
            };
          });
        }}/> }
        {currentProgress == "product" && (
          <ProductForm
            orderType = "Jumlo"
            menuStaff = {(data) => {
              setOrderData((prevState) => {
                return {
                  ...prevState,
                  menu: data,
                };
              });
            }}
            data={(data) => {
              setOrderData((prevState) => {
                return {
                  ...prevState,
                  // type: data.type,
                  imageUrl: data.imageUrl,
                };
              });
            }}
            data2={(data) => {
              setOrderData((prevState) => {
                return {
                  ...prevState,
                  type: data.type,
                  imageUrl: data.imageUrl,
                };
              });
            }}
          />
        )}
        {currentProgress == "sizes" && (
          <SizesForm
            type={orderData.type}
            olderSizes={myFunction()}
            data={(data) => {
              setOrderData((prevState) => {
                return { ...prevState, sizes: data.sizes };
              });
            }}
            customer={orderData.customer}
          />
        )}

        {currentProgress == "styles" && (
          <CustomStyles 
          isUniform = {isUniform}
          type = {orderData.type}
            data={(data) => {
              console.log(data)
              setOrderData((prevState) => {
                if (isUniform) {
                return { ...prevState, styles: data.styles
                }
              }
                else {
                  return { ...prevState, styles: data.styles,
                  unitPrice: parseInt(data.unitPrice)  
                }
            };
              });
            }}
          />
        )}

        {currentProgress == "payment" && (
          <PaymentForm
           orderType = "custom"
            data={(data) => {
              setOrderData((prevState) => {
                return {
                  ...prevState,
                  advance: data.advance,
                  deadline: data.deadline,
                };
              });
            }}
          />
        )}
        {currentProgress !== "initials" && 
        <div style = {{display: "flex"}}>
        
          <p style = {{marginLeft: "10px", 
          color: "#3245E9"
        }}>{`Order ${typeNum + 1} >`}</p>
       
        </div>}
        <Button
          disabled={disabled}
          variant="contained"
          style={{
            background: disabled ? "lightGray" : "#3245E9",
            borderRadius: "6px",
            height: "45px",
            color: "white",
            fontSize: "16px",
            width: "250px",
            fontWeight: "bold"
          }}
          onClick={() => {
            if (num == 0 && times <= 0) return alert("Please select how many orders you want")
            if (num == 0 && isUniform && !orderData.unitPrice) return alert("Please enter unitPrice")
            if (num == 1 && (!orderData.imageUrl || !orderData.type)) return alert("Please select all product and type!")
            if (currentProgress == "sizes" && orderData.sizes?.length < 5) return alert("Please enter all sizes")
            if (num == 3 && !orderData.unitPrice ) return alert("Please enter unitPrice!")
            if (num == 0 && !orderData.customer ) return alert("Please select a customer!")
            if (currentProgress == "payment" && orderData.advance == null ) return alert("Please enter advance money!")
           
            if (currentProgress != "payment") {
              setNum((state) => state + 1);
            }

            if (currentProgress == "styles" && typeNum < times - 1) {
              if (orderData.unitPrice) {
                setTypeNum(state => state + 1)
                setServiceHandler()
                isUniform ? setNum(2) : setterFun()
              } else alert("Please enter unitPrice")
            }
            if (currentProgress == "styles") {
              setServiceHandler()
            }
            
            if (currentProgress == "payment") {
              
              if (orderData.unitPrice > -1 && orderData.advance > -1 && orderData.deadline)
              completeOder();
              else alert("Please fill all the data")
            }
          }}
        >
          {currentProgress == "payment" ? "complete" : "next"}
        </Button>

        {currentProgress == "initials" && (
          <div style={{ display: "flex", gap: "10px", fontSize: "16px" }}>
            <p style={{ margin: "0px" }}> Customer does not exist?</p>
            <p
              style={{
                color: "#3245E9",
                margin: "0px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => setRegister(true)}
            >
              {" "}
              Create
            </p>
          </div>
        )}
      </div>
    </MyModal>
  );
};

export default JumloForm;
