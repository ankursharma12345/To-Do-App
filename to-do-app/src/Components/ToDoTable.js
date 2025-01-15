import {
  Grid,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../store/Reducer/Snackbar";
import "../styles/ToDoTable.css";
import useSound from "use-sound";

const ToDoTable = (props) => {
  const [tableData, setTableData] = useState({
    allTableData: [],
    rowsData: [],
  });

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_URL
      : "http://localhost:4000";

  // useEffect(() => {
  //   if (props?.["dbId"]) {
  //     const getDataFromDb = async () => {
  //       const getAllData = await axios.get(
  //         `http://localhost:4000/getAllData?id=${props?.["dbId"]}`
  //       );
  //       // const getData = getAllData.data.result.rows;
  //       const getData = getAllData.data.result.rows.filter(
  //         ({ status }) => status === "Pending"
  //       );
  //       setTableData((prev) => {
  //         prev["allTableData"] = getData;
  //         return { ...prev };
  //       });
  //     };
  //     getDataFromDb();
  //   }
  // }, [props, tableData]);

  useEffect(() => {
    if (props?.["dbId"]) {
      const getDataFromDb = async () => {
        const getAllData = await axios.get(
          `${BASE_URL}/getAllData?id=${props?.["dbId"]}`
        );
        const getData = getAllData.data.result.rows.filter(
          ({ status }) => status === "Pending"
        );
        setTableData((prev) => {
          prev["allTableData"] = getData;
          return { ...prev };
        });
      };
      getDataFromDb();
    }
  }, [props.dbId, tableData]);

  const [selectedRow, setSelectedRow] = useState(null);

  // useEffect(() => {
  //   if (props?.["id"] === "Work") {
  //     const getData = tableData?.["allTableData"]?.filter(
  //       ({ type }) => type === "WK"
  //     );
  //     setTableData((prev) => {
  //       prev["rowsData"] = getData;
  //       return { ...prev };
  //     });
  //   } else if (props?.["id"] === "Grocery") {
  //     const getData = tableData?.["allTableData"]?.filter(
  //       ({ type }) => type === "GY"
  //     );
  //     setTableData((prev) => {
  //       prev["rowsData"] = getData;
  //       return { ...prev };
  //     });
  //   } else {
  //     const getData = tableData?.["allTableData"]?.filter(
  //       ({ type }) => type === "OFC"
  //     );
  //     setTableData((prev) => {
  //       prev["rowsData"] = getData;
  //       return { ...prev };
  //     });
  //   }
  // }, [props, tableData.allTableData]);

  useEffect(() => {
    if (props?.["id"]) {
      const getData = tableData?.["allTableData"]?.filter(({ type }) =>
        props.id === "Work"
          ? type === "WK"
          : props.id === "Grocery"
          ? type === "GY"
          : type === "OFC"
      );
      setTableData((prev) => ({
        ...prev,
        rowsData: getData,
      }));
    }
  }, [props.id, tableData.allTableData]);

  const dispatch = useDispatch();

  const updateData = async (getText) => {
    const response = await axios.put(
      `${BASE_URL}/updateData?dbId=${props.dbId}&description=${getText}`
    );
    if (response.data.Status_Cd === 1) {
      dispatch(showSnackbar(true, "success", "Data updated Successfully"));
    } else dispatch(showSnackbar(true, "error", "Data not updated"));

    const getAllData = await axios.get(
      `${BASE_URL}/getAllData?id=${props?.["dbId"]}`
    );
    const getData = getAllData.data.result.rows.filter(
      ({ status }) => status === "Pending"
    );
    if (getAllData.data.Status_Cd === 1) {
      const getWorkData = getData.filter(({ type }) => type === "WK");
      props.updateBadge("WK", getWorkData?.length);
    }
    if (getAllData.data.Status_Cd === 1) {
      const getWorkData = getData.filter(({ type }) => type === "GY");
      props.updateBadge("GY", getWorkData?.length);
    }
    if (getAllData.data.Status_Cd === 1) {
      const getWorkData = getData.filter(({ type }) => type === "OFC");
      props.updateBadge("OFC", getWorkData?.length);
    }
  };

  const handleChange = (e, index) => {
    setSelectedRow(index); // Update the selected row index
    const getText = e.target.closest("tr").firstElementChild.textContent.trim();
    updateData(getText);
    // const response = await axios.put(
    //   `http://localhost:4000/updateData?dbId=${props.dbId}&description=${getText}`
    // );
    // if (response.data.Status_Cd === 1) {
    //   dispatch(showSnackbar(true, "success", "Data updated Successfully"));
    //   return;
    // }
    // dispatch(showSnackbar(true, "error", "Data not updated"));
  };

  const [playActive] = useSound(
    "/103133__robinhood76__01892-completed-spell.wav",
    {
      volume: 0.25,
    }
  );

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={6} md={6}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Description</TableCell>
                <TableCell align="left" className="tableCell">
                  Mark as Completed
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.rowsData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row?.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Radio
                      checked={selectedRow === index} // Bind checked state
                      onChange={(e, index) => handleChange(e, index)} // Update state on change
                      value={index}
                      onMouseDown={playActive}
                      // onMouseUp={() => {
                      //   selectedRow ? playOff() : playOn();
                      // }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ToDoTable;
