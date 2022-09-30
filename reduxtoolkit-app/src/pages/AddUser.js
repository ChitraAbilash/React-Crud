import React, { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addUser } from '../redux/userSlice';

const AddUser = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {name, email, contact, address} = state;
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    let {name, value} = e.target;
    console.log(name, value)
    setState({...state, [name]: value})
  }

  const addUserData = async(user) => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_API}`, user );
      console.log(result, "ADDuSER RESULT");
      dispatch(addUser(result?.data));
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
      addUserData(state);
      navigate('/');
      setError("")
    }
  }
  
    return (
        <div>
         <Button 
        style={{width: "100px", marginTop: "20px"}} variant="contained" color="secondary" type="submit"onClick={() => navigate('/')}>Go Back</Button>
        <h2 style={{textAlign: "center"}}>Add User</h2>
        {error && <h3 style={{color: "red"}}>{error}</h3>}
        <form style={{alignItems: "center", width:1400}} onSubmit={handleSubmit}>
          <div>
        <TextField id="standard-basic" label="Name" variant="standard" style={{width:400, marginTop:"10px"}} value={name} type="text" name="name" onChange={handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Email" variant="standard" style={{width:400, marginTop:"10px"}} value={email} type="email" name="email" onChange={handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Contact" variant="standard" style={{width:400, marginTop:"10px"}} value={contact} type="number" name="contact" onChange={handleInputChange}/>
        <br/>
        <TextField id="standard-basic" label="Address" variant="standard" style={{width:400, marginTop:"10px"}} value={address} type="text" name="address" onChange={handleInputChange}/>
        <br></br>
        <Button 
        style={{width: "100px", marginTop:"30px"}} variant="contained" color="primary" type="submit">Submit</Button>
        </div>
        </form>
        </div>
    );
}

export default AddUser;