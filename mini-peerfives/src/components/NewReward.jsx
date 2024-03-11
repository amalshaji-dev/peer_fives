import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const NewReward = () => {
  const { id: currentUserId } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [giverP5Balance, setGiverP5Balance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user`
        );
        const filteredUsers = response.data?.users.filter(
          (user) => user._id !== currentUserId
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("Something went wrong");
      }
    };

    const fetchGiverBalance = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/p5/${currentUserId}/balance`
        );
        setGiverP5Balance(response.data?.p5Points);
      } catch (error) {
        console.error("Error fetching user balance:", error);
        alert("Something went wrong");
      }
    };

    if (currentUserId) {
      fetchUsers();
      fetchGiverBalance();
    }
  }, [currentUserId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/p5`, {
        giverId: currentUserId,
        receiverId: selectedUser,
        point: amount,
      });

      navigate(`/${currentUserId}/p5`);
    } catch (error) {
      console.error("Error creating reward:", error);
    }
  };

  return (
    <div className="container">
      <h1>New Reward</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="receiver">Select User:</label>
          <select
            id="receiver"
            value={selectedUser || ""}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="amount">Amount (Max 100):</label>
          <input
            type="number"
            id="amount"
            min="1"
            max="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <p>Your P5 Balance: {giverP5Balance}</p>
        </div>
        <button
          type="submit"
          disabled={
            !selectedUser ||
            amount > 100 ||
            Number(amount) > Number(giverP5Balance)
          }
        >
          Send Reward
        </button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewReward;
