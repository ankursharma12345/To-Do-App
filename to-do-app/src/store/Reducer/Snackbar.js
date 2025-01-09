const SHOW_SNACKBAR = "myAppSnackbar";

const DEFAULT_TIME = 3000;
const initialState = {
  open: false,
  snackbarType: "success",
  message: "",
  snackbarTime: "",
};

export const showSnackbar = (
  open,
  snackbarType = "success",
  message,
  snackbarTime = DEFAULT_TIME
) => ({
  type: SHOW_SNACKBAR,
  open,
  snackbarType,
  message,
  snackbarTime,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      const { open, snackbarType, message, snackbarTime } = action;
      return {
        ...state,
        open,
        snackbarType,
        message,
        snackbarTime,
      };
    default:
      return state;
  }
};
