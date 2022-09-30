import React, {useState}from "react";
import { styled } from '@mui/material/styles';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import { getSingleUser } from '../redux/userSlice';

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

 

const ViewUser = () => {
  const [showUser, setShowUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: ""
  });
  let {id} = useParams();
  const { user } = useSelector((state) => state.data)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {name, email, contact, address} = showUser;

  const getUserDataByID = async() => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API}/${id}`);
      console.log(result, "RESULT");
      dispatch(getSingleUser(result?.data));
    } catch(error) {
      console.log(error)
    }   
  }

  useEffect(() => {
    getUserDataByID();
  }, [])

  useEffect(() => {
    if(user) {
        setShowUser({ ...user })
    }
}, [user]);


 
    return (
      <div>
         <Button 
        style={{width: "100px", marginTop: "20px"}} variant="contained" color="secondary" type="submit"onClick={() => navigate('/')}>Go Back</Button>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700, "margin-top": 100 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Contact</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user && (
            <StyledTableRow key={user.id}>
               <StyledTableCell component="th" scope="row">
                {name}
              </StyledTableCell>
              <StyledTableCell align="center">{email}</StyledTableCell>
              <StyledTableCell align="center">{contact}</StyledTableCell>
              <StyledTableCell align="center">{address}</StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>     
    </div>   
    )
}

export default ViewUser;