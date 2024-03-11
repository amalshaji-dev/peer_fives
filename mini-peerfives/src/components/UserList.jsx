import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
      setUsers(response.data?.users);
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="rowContainer">
        <h1>Users</h1>
        <Link to="/new">
          <button>Create New User</button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>P5 Balance</th>
            <th>Reward Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.p5Balance}</td>
              <td>{user.rewardBalance}</td>
              <td>
                <Link to={`/${user._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
