import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Badge, Grid, useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Fragment, useState } from "react";
import "./styles/Header.css";
import ToDo from "./ToDo";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [id, setId] = useState({
    initialData: "Work",
    workBadge: 0,
    groceryBadge: 0,
    officeBadge: 0,
  });
  const handleClick = (e) => {
    setId((prev) => {
      prev["initialData"] = e.target.id;
      return { ...prev };
    });
  };

  const handleOpenNavMenu = (event) => {
    if (event.currentTarget) setOpenMenu(true);
  };
  const handleCloseNavMenu = () => {
    setOpenMenu(false);
  };

  const updateBadge = (badgeId, badgeData) => {
    setId((prev) => {
      if (badgeId === "WK") {
        return { ...prev, workBadge: badgeData }; // Return a new object
      } else if (badgeId === "GY") {
        return { ...prev, groceryBadge: badgeData }; // Return a new object
      } else {
        return { ...prev, officeBadge: badgeData }; // Return a new object
      }
    });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const calculateMenuWidth = () => {
    // Calculate the menu width based on the current screen size
    if (isMobile) {
      return "100%"; // Use full width for smaller screens
    } else {
      return "30ch"; // Use a fixed width for larger screens
    }
  };
  return (
    <Fragment>
      <AppBar position="static" className="appbar">
        <Toolbar>
          <Grid container>
            <Grid
              item
              md={12}
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "column",
              }}
            >
              <IconButton
                onClick={handleOpenNavMenu}
                sx={{ color: "white", padding: "0px" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                // anchorOrigin is used to position the popup menu
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={openMenu}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .mobileview": {
                    // & is used to target the element with className="mobileview" in the component
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Center the items horizontally
                    justifyContent: "center", // Center the items vertically
                  },
                }}
                PaperProps={{
                  style: {
                    maxHeight: "none", // Disable max height
                    width: calculateMenuWidth(), // Dynamically calculate width
                    // backgroundColor: "#a4ace0",
                    backgroundColor: "darkgrey",
                  },
                }}
              >
                <Grid item className="close-icon" onClick={handleCloseNavMenu}>
                  <CloseIcon />
                </Grid>
                <Grid item className="mobileview">
                  <Badge badgeContent={id?.["workBadge"]} color="success">
                    <Button
                      id="Work"
                      sx={{
                        display: "block",
                        color: "white",
                        fontSize: "large",
                      }}
                      onClick={(e) => {
                        handleClick(e);
                        handleCloseNavMenu();
                      }}
                    >
                      Work
                    </Button>
                  </Badge>
                  <Badge badgeContent={id?.["groceryBadge"]} color="success">
                    <Button
                      id="Grocery"
                      sx={{
                        display: "block",
                        color: "white",
                        fontSize: "large",
                      }}
                      onClick={(e) => {
                        handleClick(e);
                        handleCloseNavMenu();
                      }}
                    >
                      Grocery
                    </Button>
                  </Badge>
                  <Badge badgeContent={id?.["officeBadge"]} color="success">
                    <Button
                      id="Office"
                      sx={{
                        display: "block",
                        color: "white",
                        fontSize: "large",
                      }}
                      onClick={(e) => {
                        handleClick(e);
                        handleCloseNavMenu();
                      }}
                    >
                      Office
                    </Button>
                  </Badge>
                </Grid>
              </Menu>
            </Grid>

            <Grid container justifyContent="space-evenly">
              <Grid
                item
                md={5}
                className="item"
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "cursive",
                    color: "goldenrod",
                  }}
                >
                  ToDO App
                </Typography>
              </Grid>
              <Grid
                item
                md={6}
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                    justifyContent: "space-evenly",
                  },
                }}
              >
                <Badge badgeContent={id?.["workBadge"]} color="success">
                  <Button onClick={handleClick} id="Work">
                    Work
                  </Button>
                </Badge>
                <Badge badgeContent={id?.["groceryBadge"]} color="success">
                  <Button onClick={handleClick} id="Grocery">
                    Grocery
                  </Button>
                </Badge>
                <Badge badgeContent={id?.["officeBadge"]} color="success">
                  <Button onClick={handleClick} id="Office">
                    Office
                  </Button>
                </Badge>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container>
        <ToDo id={id?.["initialData"]} updateBadge={updateBadge} />
      </Grid>
    </Fragment>
  );
};
export default Header;
