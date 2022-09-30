import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadUsers } from '../redux/actions'
import { getUsers, selectAllUsers } from '../redux/userSlice';
import UserTable from "../components/UserTable"

const Home = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  // const { users } = useSelector((state) => state.data);
  const users = useSelector(selectAllUsers);
  console.log(users, "USERS")

  const getUserData = async() => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_API}`);
      console.log(result, "RESULT");
      dispatch(getUsers(result?.data));
    } catch(error) {
      console.log(error)
    }   
  }


  useEffect(() => {
    getUserData()   
  }, []);

  return (
      <div>
        <Button style={{ "marginTop": "30px" }} variant="contained" color="secondary" onClick={() => navigate("/addUser")}>Add User</Button>
        <UserTable userdata={users}/>
    </div>
  );
};

export default Home;
