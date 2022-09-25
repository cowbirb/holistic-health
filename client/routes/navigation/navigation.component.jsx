import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountMenu from "./account-menu.component.jsx";
import logo from "../../../assets/HolisticYouLogo.png"

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <img src={logo} width={'50px'}/>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={()=> navigate('/')}>
              HolisticYou
            </Typography>
            <AccountMenu />
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};

export default Navigation;
