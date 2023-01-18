import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Navigate, useNavigate } from "react-router-dom";

function MainListItems() {
  const navigate = useNavigate();
  return (
    <div>
      <React.Fragment>
        <ListItemButton
          onClick={() => {
            console.log("clicked Dashboard");
            navigate("/dashboard/home");
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* <ListItemButton
          onClick={() => {
            console.log("clicked Orders");
            navigate("/dashboard/order");
          }}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            console.log("clicked Orders");
            navigate("/dashboard/order");
          }}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Chart" />
        </ListItemButton> */}
      </React.Fragment>
    </div>
  );
}
export default MainListItems;
