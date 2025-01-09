import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../store/Reducer/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ShowSnackbar = () => {
  const dispatch = useDispatch();
  const { open, snackbarType, message, snackbarTime } = useSelector(
    (state) => state.snackbar
  );
  const handleClose = (event, reason) => {
    // if (reason === "clickaway") {
    //   return;
    // }
    dispatch(showSnackbar(false, snackbarType, message, snackbarTime));
  };

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open ?? false}
        autoHideDuration={parseInt(snackbarTime)}
        onClose={handleClose}
        sx={{ whiteSpace: "pre-wrap" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarType}
          sx={{
            width: "100%",
            fontSize: "large !important",
            //   backgroundColor: "#ebccd1 !important",
            //  color: " #a94442 !important",

            boxShadow: "none !important",
            // marginTop: "10px !important",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default ShowSnackbar;
