import React from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { deleteUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const UserTable = (props) => {
  // console.log(props, "Props")
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const userdata = props.userdata;
  console.log(userdata, "USERDATATAAA")

  const deleteUserData = async(id) => {
    try {
      const result = await axios.delete(`${process.env.REACT_APP_API}/${id}`)
      console.log(result, "DELETE RESULT");
      dispatch(deleteUser(id))
    } catch(error) {
      console.log(error)
    }   
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      deleteUserData(id)
    }
  }

    return (
      
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700, "margin-top": 50 }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Contact</StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userdata &&
                userdata.map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell component="th" scope="row">
                      {user.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.contact}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.address}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        <Button
                          style={{ "marginRight": 5 }}
                          color="primary"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          style={{ "marginRight": 5 }}
                          color="secondary"
                          onClick={() => navigate(`/editUser/${user.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => navigate(`/viewUser/${user.id}`)}
                        >
                          View
                        </Button>
                      </ButtonGroup>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
  
    );
  };

export default UserTable;
