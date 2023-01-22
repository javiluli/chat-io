import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth0 } from "@auth0/auth0-react";
import { getLocalStorage, removeLocalStorage } from "@/utilities/localstorage.utility";
import MuiSwitch from "@mui/material/Switch";
import { setLightMode, useMaterialUIController } from "@/context";
import { Divider, Stack } from "@mui/material";

import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import HeaderSkeleton from "./Header.skeleton";

function Header() {
  const [controller, dispatch] = useMaterialUIController();
  const { lightMode } = controller;

  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    removeLocalStorage("authenticatedUser");
    logout({ returnTo: window.location.origin });
  };

  const handleLightMode = () => setLightMode(dispatch, !lightMode);

  // useEffect(() => {
  //   if (getLocalStorage("authenticatedUser") && !isLoading) {
  //     loginWithRedirect();
  //   }
  // }, [user]);

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar disableGutters sx={{ bgcolor: "background.paper", px: 4 }}>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            display: "flex",
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "text.primary",
            textDecoration: "none",
          }}
        >
          CHAT.IO
        </Typography>

        <Stack alignItems="center" direction="row" spacing={2} sx={{ display: isAuthenticated ? "none" : "flex" }}>
          <MuiSwitch checked={lightMode} onChange={handleLightMode} />

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Button disableElevation onClick={handleLogin} sx={{ my: 2, color: "text.primary" }}>
              Iniciar sesion
            </Button>
          </Box>
        </Stack>

        {isAuthenticated && (
          <Box sx={{ display: "flex" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.picture} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="profile">
                <Typography
                  noWrap
                  component={Link}
                  to="/profile"
                  sx={{
                    color: "text.primary",
                    textDecoration: "none",
                  }}
                >
                  Perfil
                </Typography>
              </MenuItem>

              <MenuItem key="cerrar-sesion" onClick={handleLogout}>
                <Typography textAlign="center">Cerrar sesión</Typography>
              </MenuItem>

              <Divider variant="middle" sx={{ borderColor: "text.primary" }} />

              <Stack alignItems="center" direction="row">
                <MenuItem key="dark-mode">
                  <Typography textAlign="center">Idioma</Typography>
                </MenuItem>
                <Box
                  component="img"
                  sx={{
                    width: 30,
                    height: "fit-content",
                  }}
                  alt={`Image locale ${user.locale}`}
                  src={`https://flagcdn.com/${user.locale}.svg`}
                />
              </Stack>

              <Stack alignItems="center" direction="row">
                <MenuItem key="dark-mode">
                  <Typography textAlign="center">Modo oscuro</Typography>
                </MenuItem>
                <MuiSwitch checked={lightMode} onChange={handleLightMode} />
              </Stack>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Header;
