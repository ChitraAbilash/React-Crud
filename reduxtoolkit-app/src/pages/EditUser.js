import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getSingleUser } from '../redux/userSlice';

const EditUser = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: ""
  });
  let {id} = useParams();
  const { user } = useSelector((state) => state.data)
  console.log(user, 'edit user')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {name, email, contact, address} = state;
  const [error, setError] = useState("")

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
    getUserDataByID()
  }, [])

  useEffect(() => {
    if(user) {
        setState({ ...user })
    }
}, [user]);

  const handleInputChange = (e) => {
    let {name, value} = e.target;
    console.log(name, value)
    setState({...state, [name]: value})
  }

  const updateUserData = async(user, id) => {
    try {
      const result = await axios.put(`${process.env.REACT_APP_API}/${id}`, user);
      console.log(result, "ADDuSER RESULT");
      dispatch(updateUser(result?.data));
    } catch(error) {
      console.log(error)
    }   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !contact || !address) {
      setError("Please enter all input field")
    } else {
      console.log(state, "STATE")
      updateUserData(state, id);
      console.log(state, 'UPDATE STATEEEEEEEEEEEE')
      navigate('/');
      setError("")
    }
  }
  
    return (
        <div>
         <Button 
        style={{width: "100px", marginTop: "20px"}} variant="contained" color="secondary" type="submit"onClick={() => navigate('/')}>Go Back</Button>
        <h2 style={{textAlign: "center"}}>Edit User</h2>
        {error && <h3 style={{color: "red"}}>{error}</h3>}
        <form style={{alignItems: "center", width:1400}} onSubmit={handleSubmit}>
          <div>
        <TextField id="standard-basic" label="Name" variant="standard" style={{width:400, marginTop:"10px"}} value={name || ""} type="text" name="name" onChange={handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Email" variant="standard" style={{width:400, marginTop:"10px"}} value={email || ""} type="email" name="email" onChange={handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Contact" variant="standard" style={{width:400, marginTop:"10px"}} value={contact || ""} type="number" name="contact" onChange={handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Address" variant="standard" style={{width:400, marginTop:"10px"}} value={address || ""} type="text" name="address" onChange={handleInputChange}/>
        <br></br>
        <Button 
        style={{width: "100px", marginTop:"30px"}} variant="contained" color="primary" type="submit">Update</Button>
        </div>
        </form>
        </div>
    );
}

export default EditUser;