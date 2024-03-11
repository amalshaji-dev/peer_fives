import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserForm from "./common/UserForm";
import "./styles.css";

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${id}`
      );
      setUser(response.data?.user);
      setName(response.data?.user.name);
    } catch (error) {
      console.error("Error fetching user:", error);
      alert("Something went wrong");
    }
  };
  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
        name,
      });
      alert("User name updated");
      fetchUser();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong");
    }
  };

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="container">
      <h1>User: {user.name}</h1>
      <UserForm handleSubmit={handleSubmit} name={name} setName={setName} />

      <div className="">
        <button onClick={() => navigate(`/${id}/p5`)}>
          {`P5 Balance: ${user.p5Balance}`}
        </button>
        <button onClick={() => navigate(`/${id}/rewards`)}>
          {`Reward Balance: ${user.rewardBalance}`}
        </button>
      </div>
    </div>
  );
};

export default ViewUser;
