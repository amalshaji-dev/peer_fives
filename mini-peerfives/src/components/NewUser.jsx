import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "./common/UserForm";

const NewUser = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user`, { name });
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h1>New User</h1>
      <UserForm handleSubmit={handleSubmit} name={name} setName={setName} />
    </div>
  );
};

export default NewUser;
