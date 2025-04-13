import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { showSnackbar } from "../store/Reducer/Snackbar";
import "../styles/Signup.css";
import ValidationSchema from "../utils/ValidationSchema";

const SignupPage = () => {
  const [stateData, setStateData] = useState({});

  const handleChange = (e) => {
    setStateData((prev) => {
      prev[e.target.id] = e.target.value;
      return { ...prev };
    });
  };

  // const BASE_URL =
  //   process.env.NODE_ENV === "production"
  //     ? process.env.REACT_APP_API_URL
  //     : "http://localhost:4000";

  const dispatch = useDispatch();
  const sendDataIntoDb = async () => {
    const response = await api.post(`/addUser`, stateData);
    if (response.data.Status_Cd === 0) {
      dispatch(showSnackbar(true, "error", "Email already exists"));
      return;
    }
    dispatch(showSnackbar(true, "success", "Data saved successfully"));
  };

  const { handleSubmit, errors } = useFormik({
    initialValues: stateData,
    enableReinitialize: true,
    validationSchema: ValidationSchema,
    onSubmit: sendDataIntoDb,
  });

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login", { replace: true });
  };
  return (
    <>
      <HelmetProvider>
        <Helmet title="SignUp" />
      </HelmetProvider>
      <Grid container className="mainContainer">
        <Grid item xs={12} sm={12} md={12} className="container">
          <Box
            className="box"
            sx={{
              width: 400,
              padding: 4,
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
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h5" align="center" fontWeight="bold">
                  Welcome to TO-DO
                </Typography>
                <Typography align="center" sx={{ marginTop: "0.5rem" }}>
                  Enter your details to create an account
                </Typography>
                <Grid container sx={{ marginTop: "1.5rem" }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography>Email*</Typography>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        id="email"
                        autoFocus={true}
                        fullWidth
                        onChange={handleChange}
                        value={stateData?.["email"]}
                        placeholder="Enter your email"
                        variant="outlined"
                        helperText={errors?.["email"]}
                        error={Boolean(errors?.["email"])}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} sx={{ marginTop: "1rem" }}>
                    <Typography>Password*</Typography>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        id="password"
                        fullWidth
                        type="password"
                        onChange={handleChange}
                        value={stateData?.["password"]}
                        placeholder="Enter your password"
                        variant="outlined"
                        helperText={errors?.["password"]}
                        error={Boolean(errors?.["password"])}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} sx={{ marginTop: "1rem" }}>
                    <Typography>Re-Enter Password*</Typography>
                    <Box sx={{ maxWidth: "100%" }}>
                      <TextField
                        id="reEnterPassword"
                        fullWidth
                        type="password"
                        onChange={handleChange}
                        value={stateData?.["reEnterPassword"]}
                        placeholder="Re-Enter Password"
                        variant="outlined"
                        helperText={errors?.["reEnterPassword"]}
                        error={Boolean(errors?.["reEnterPassword"])}
                      />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{ marginTop: "1.5rem" }}
                  >
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
                      onClick={handleSubmit}
                    >
                      Get Started
                    </Button>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{ marginTop: "1rem", textAlign: "center" }}
                  >
                    <Typography>
                      Already have an account?{" "}
                      <Button
                        sx={{ fontWeight: "bold", color: "#1976d2" }}
                        onClick={navigateToLogin}
                      >
                        Log in
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignupPage;
