import React from "react";
import { useNavigate } from "react-router-dom";

function UserForm({ handleSubmit, name, setName }) {
  const navigate = useNavigate();

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate("/")}>
        Cancel
      </button>
    </form>
  );
}

export default UserForm;
