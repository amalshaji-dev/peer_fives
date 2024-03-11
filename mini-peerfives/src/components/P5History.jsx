import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const P5History = () => {
  const { id } = useParams();
  const [p5History, setP5History] = useState([]);
  const [p5Balance, setP5Balance] = useState(0);
  const navigate = useNavigate();

  const fetchP5Data = async () => {
    try {
      const p5Response = await axios.get(
        `${process.env.REACT_APP_API_URL}/p5/${id}/balance`
      );
      setP5Balance(p5Response.data?.p5Points);
      const p5Transactions = await axios.get(
        `${process.env.REACT_APP_API_URL}/p5/${id}`
      );
      setP5History(p5Transactions.data?.p5Transactions);
    } catch (error) {
      console.error("Error fetching P5 data:", error);
    }
  };
  useEffect(() => {
    if (id) fetchP5Data();
  }, [id]);

  return (
    <div className="container">
      <h1>P5 History</h1>
      <p>Current P5 Balance: {p5Balance}</p>
      <button onClick={() => navigate(`/${id}/rewards/new`)}>
        Create New Reward
      </button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>P5 Given</th>
            <th>User Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {p5History.map((transaction, index) => (
            <tr key={transaction._id}>
              <td>{index + 1}</td>
              <td>{new Date(transaction.datetime).toLocaleString()}</td>
              <td>{transaction.points}</td>
              <td>{transaction.givenTo.name}</td>
              <td>
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await axios.delete(
                        `${process.env.REACT_APP_API_URL}/p5/${transaction._id}`
                      );
                      fetchP5Data();
                    } catch (error) {
                      console.error("Error fetching P5 data:", error);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default P5History;
