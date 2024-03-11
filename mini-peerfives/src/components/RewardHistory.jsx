import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RewardHistory = () => {
  const { id } = useParams();
  const [rewardHistory, setRewardHistory] = useState([]);
  const [rewardBalance, setRewardBalance] = useState(0);

  useEffect(() => {
    const fetchRewardData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/p5/${id}/reward/balance`
        );
        setRewardBalance(response.data?.reward);
        const rewardHistoryTransaction = await axios.get(
          `${process.env.REACT_APP_API_URL}/p5/reward/${id}`
        );
        setRewardHistory(rewardHistoryTransaction.data?.rewardTransactions);
      } catch (error) {
        console.error("Error fetching Rewards data:", error);
        // Handle error
      }
    };

    fetchRewardData();
  }, [id]);

  return (
    <div className="container">
      <h1>Reward History</h1>
      <p>Current Reward Balance: {rewardBalance}</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date-Time</th>
            <th>Rewards Received</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {rewardHistory.map((transaction, index) => (
            <tr key={transaction._id}>
              <td>{index + 1}</td>
              <td>{new Date(transaction.datetime).toLocaleString()}</td>
              <td>{transaction.points}</td>
              <td>{transaction.givenBy.name}</td>{" "}
              {/* Assuming givenBy has a name property */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardHistory;
