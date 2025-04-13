import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "./api";
import ToDoTable from "./Components/ToDoTable";
import { showSnackbar } from "./store/Reducer/Snackbar";
import "./styles/ToDo.css";

const ToDo = (props) => {
  const [descriptionData, setDescriptionData] = useState({
    id: "",
    initialData: "",
    workDescription: "",
    groceryDescription: "",
    officeDescription: "",
    dbId: "",
    flag: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const inputField = document.getElementsByTagName("input")[0];
    setTimeout(() => {
      inputField?.focus();
    }, 10);
    setDescriptionData((prev) => {
      prev["id"] = props?.id;
      prev["workDescription"] = "";
      prev["groceryDescription"] = "";
      prev["officeDescription"] = "";
      return { ...prev };
    });
  }, [props?.id]);

  const location = useLocation();
  const user_id = location.state?.userId;
  useEffect(() => {
    setDescriptionData((prev) => {
      prev["dbId"] = user_id;
      return { ...prev };
    });
  }, []);

  const handleChange = (e) => {
    if (descriptionData?.["id"] === "Work") {
      setDescriptionData((prev) => {
        prev["workDescription"] = e.target.value;
        return { ...prev };
      });
    } else if (descriptionData?.["id"] === "Grocery") {
      setDescriptionData((prev) => {
        prev["groceryDescription"] = e.target.value;
        return { ...prev };
      });
    } else {
      setDescriptionData((prev) => {
        prev["officeDescription"] = e.target.value;
        return { ...prev };
      });
    }
  };

  // const BASE_URL =
  //   process.env.NODE_ENV === "production"
  //     ? process.env.REACT_APP_API_URL
  //     : "http://localhost:4000";

  const sendDataToDb = useCallback(async () => {
    if (descriptionData?.["workDescription"].length > 0) {
      const response = await api.post(`/descriptionData`, descriptionData);
      if (response.data.Status_Cd === 1) {
        setDescriptionData((prev) => {
          prev["workDescription"] = "";
          return { ...prev };
        });
        dispatch(showSnackbar(true, "success", "Data Saved Successfully!"));
        return;
      }
      dispatch(showSnackbar(true, "error", "Data not saved"));
    } else if (descriptionData?.["groceryDescription"].length > 0) {
      const response = await api.post(`/descriptionData`, descriptionData);
      if (response.data.Status_Cd === 1) {
        setDescriptionData((prev) => {
          prev["groceryDescription"] = "";
          return { ...prev };
        });
        dispatch(showSnackbar(true, "success", "Data Saved Successfully!"));
        return;
      }
      dispatch(showSnackbar(true, "error", "Data not saved"));
    } else {
      const response = await api.post(`/descriptionData`, descriptionData);
      if (response.data.Status_Cd === 1) {
        setDescriptionData((prev) => {
          prev["officeDescription"] = "";
          return { ...prev };
        });
        dispatch(showSnackbar(true, "success", "Data Saved Successfully!"));
        return;
      }
      dispatch(showSnackbar(true, "error", "Data not saved"));
    }
    setDescriptionData((prev) => {
      prev["flag"] = true;
      return { ...prev };
    });
  }, [descriptionData, dispatch]);

  useEffect(() => {
    const getDataFromDb = async () => {
      const getAllData = await api.get(
        `/getAllData?id=${descriptionData?.["dbId"]}`
      );

      const getData = getAllData.data.result.rows.filter(
        ({ status }) => status === "Pending"
      );
      // if (getAllData.data.Status_Cd === 1) {
      //   const getWorkData = getData.filter(({ type }) => type === "WK");
      //   props.updateBadge("WK", getWorkData.length);
      // }
      // if (getAllData.data.Status_Cd === 1) {
      //   const getWorkData = getData.filter(({ type }) => type === "GY");
      //   props.updateBadge("GY", getWorkData.length);
      // }
      // if (getAllData.data.Status_Cd === 1) {
      //   const getWorkData = getData.filter(({ type }) => type === "OFC");
      //   props.updateBadge("OFC", getWorkData.length);
      // }
      if (getAllData.data.Status_Cd === 1) {
        ["WK", "GY", "OFC"].forEach((type) => {
          const getWorkData = getData.filter((item) => item.type === type);
          props.updateBadge(type, getWorkData.length);
        });
      }
    };
    getDataFromDb();
  }, [sendDataToDb]);

  useEffect(() => {
    const getDataFromDb = async () => {
      const getAllData = await api.get(
        `/getAllData?id=${descriptionData?.["dbId"]}`
      );
      const getData = getAllData.data.result.rows.filter(
        ({ status }) => status === "Pending"
      );
      if (getAllData.data.Status_Cd === 1) {
        ["WK", "GY", "OFC"].forEach((type) => {
          const getWorkData = getData.filter((item) => item.type === type);
          props.updateBadge(type, getWorkData.length);
        });
      }
    };
    getDataFromDb();
  }, [descriptionData?.["dbId"]]);

  return (
    <>
      <HelmetProvider>
        <Helmet title="My To-Do App" />
      </HelmetProvider>
      <Grid container className="main">
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} className="container">
              <Typography variant="h5">Add Your {props?.id}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className="container">
              <Box sx={{ width: 500, maxWidth: "80%" }}>
                {descriptionData?.["workDescription"].length > 0 ? (
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    value={descriptionData?.["workDescription"]}
                  />
                ) : descriptionData?.["groceryDescription"].length > 0 ? (
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    value={descriptionData?.["groceryDescription"]}
                  />
                ) : descriptionData?.["officeDescription"].length > 0 ? (
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    value={descriptionData?.["officeDescription"]}
                  />
                ) : (
                  <TextField
                    fullWidth
                    onChange={handleChange}
                    value={descriptionData?.["initialData"]}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className="container">
              <Button variant="contained" onClick={sendDataToDb}>
                Add
              </Button>
            </Grid>
          </Grid>

          <Grid item marginTop="1rem">
            <ToDoTable
              id={descriptionData?.["id"]}
              dbId={descriptionData?.["dbId"]}
              updateBadge={props.updateBadge}
              flag={descriptionData?.["flag"]}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ToDo;
