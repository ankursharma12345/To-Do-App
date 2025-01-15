import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { Fragment, useState } from "react";
import "../styles/Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../store/Reducer/Snackbar";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Login = () => {
  const [stateData, setStateData] = useState({});
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setStateData((prev) => {
      prev[e.target.id] = e.target.value;
      return { ...prev };
    });
  };
  const navigate = useNavigate();
  const goToSignup = () => {
    navigate("/To-Do-App", { replace: true });
  };

  console.log("BASE_URL:", process.env.REACT_APP_API_URL);
  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL
      : "http://localhost:4000";

  const gotToMainPage = async () => {
    const response = await axios.get(
      `${BASE_URL}/getData?email=${stateData?.email}&password=${stateData?.password}`
    );
    if (response.data.rows.length > 0) {
      setTimeout(() => {
        dispatch(showSnackbar(true, "success", "Login Successfully"));
      }, 10);
      const getUserId = response.data.rows[0].user_id;
      navigate("/todo", { state: { userId: getUserId } }, { replace: true });
    } else {
      dispatch(showSnackbar(true, "error", "You don't have an account"));
    }
  };
  return (
    <Fragment>
      <HelmetProvider>
        <Helmet title="Login" />
      </HelmetProvider>
      <Grid container className="mainContainer">
        <Grid item xs={12} className="container">
          <Box
            className="box"
            sx={{
              width: 400,
              padding: 3,
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "beige",
            }}
          >
            <Grid
              container
              sx={{
                height: "100%",
                width: "100%",
                marginTop: "1rem",
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h5" align="center" fontWeight="bold">
                  Welcome back
                </Typography>
                <Typography align="center" sx={{ marginTop: "0.5rem" }}>
                  Enter your details to login
                </Typography>
                <Grid container sx={{ marginTop: "1.5rem" }}>
                  <Grid item xs={12}>
                    <Typography>Email*</Typography>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        id="email"
                        autoFocus={true}
                        value={stateData?.["email"]}
                        onChange={handleChange}
                        fullWidth
                        placeholder="Enter your email"
                        variant="outlined"
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sx={{ marginTop: "1rem" }}>
                    <Typography>Password*</Typography>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        id="password"
                        fullWidth
                        type="password"
                        value={stateData?.["password"]}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        variant="outlined"
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sx={{ marginTop: "1.5rem" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        height: "50px",
                        // backgroundColor: "#1976d2",
                        backgroundColor: "black",
                        fontWeight: "bold",
                      }}
                      onClick={gotToMainPage}
                    >
                      Proceed
                    </Button>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{ marginTop: "1rem", textAlign: "center" }}
                  >
                    <Typography>
                      Don't have an account?{" "}
                      <Button
                        sx={{ fontWeight: "bold", color: "#1976d2" }}
                        onClick={goToSignup}
                      >
                        Sign Up
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Login;
