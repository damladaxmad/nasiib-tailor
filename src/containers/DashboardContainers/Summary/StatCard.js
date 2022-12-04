import React from "react";
import { Avatar, Typography, makeStyles } from "@material-ui/core";
import { IoMdStats } from "react-icons/io";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import { constants } from "../../../Helpers/constantsFile";

const useStyles = makeStyles((theme) => {
  return {
    avatar: {
      marginLeft: theme.spacing(2),
      cursor: "pointer",
      backgroundColor: "#F0F2FA",
    },
  };
});

const StatCard = (props) => {
  const classes = useStyles();

  const formatter = Intl.NumberFormat('en', {notation: "compact"})

  return (
      
    <div
      class = "myDiv"
      style={{
        minWidth: props.type == "summary" ? "23%" : "46%",
        height: "95px",
        background: "#FFFFFF",
        borderRadius: "10px",
        padding: "40px 5px",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "12px",
        // boxShadow: "1px 1px 1px #9E9E9E"
      }}
    >
      <Avatar className={classes.avatar}>
        <IoMdStats style={{ color: "#2F49D1" }} />
      </Avatar>
      <div style={{display: "flex", gap: "4px", flexDirection: "column"}}>
        <p
          style={{
            margin: "0px",
            fontSize: "18px",
            color: "#171717",
            fontWeight: "600",
          }}
        >
          { props.value.isMoney ? 
          props.value.value < 0 ? `-${constants.moneySign}${formatter.format(props.value.value)*-1}` : `${constants.moneySign}${formatter.format(props.value.value)}`
        : formatter.format(props.value.value)}
        </p>
        <Typography
          style={{
            color: "#B9B9B9",
            margin: "0px",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {props.value.label.toLowerCase()}
        </Typography>
      </div>
    </div>
  );
};

export default StatCard;
