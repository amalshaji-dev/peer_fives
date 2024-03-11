import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import NewUser from "./components/NewUser";
import ViewUser from "./components/ViewUser";
import P5History from "./components/P5History";
import RewardHistory from "./components/RewardHistory";
import NewReward from "./components/NewReward";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/new" element={<NewUser />} />
        <Route path="/:id" element={<ViewUser />} />
        <Route path="/:id/p5" element={<P5History />} />
        <Route path="/:id/rewards" element={<RewardHistory />} />
        <Route path="/:id/rewards/new" element={<NewReward />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
