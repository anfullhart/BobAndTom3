import React, { useState, useEffect } from "react";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditCelebrity = () => {
  const [celebName, setCelebName] = useState("");
  const [celebrityList, setCelebrityList] = useState([]);
  const [deleteCelebrity, setDeleteCelebrity] = useState("");

  useEffect(() => {
    getCelebrities();
  }, []);

  const getCelebrities = () => {
    Axios.get(`${API_URL}/api/get/celebrities`).then((response) => {
      setCelebrityList(response.data);

      if (response.data.length > 0) {
        setDeleteCelebrity(response.data[0].CelebID);
      }
    });
  };

  const addNewCelebrity = async () => {
    if (!celebName.trim()) {
      window.alert("Please enter a celebrity name.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/insert/celebrity`, {
        name: celebName,
      });

      window.alert(`${celebName} added successfully!`);

      setCelebName("");
      getCelebrities();
    } catch (error) {
      console.log(error);
      window.alert("Failed to add celebrity.");
    }
  };

  const removeCelebrity = async () => {
    if (!deleteCelebrity) {
      window.alert("Please select a celebrity.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/delete/celebrity`, {
        deleteCelebrity,
      });

      window.alert("Celebrity deleted successfully!");

      getCelebrities();
    } catch (error) {
      console.log(error);
      window.alert("Failed to delete celebrity.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Edit Celebrities
      </h2>

      <div
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "15px",
          padding: "30px",
          width: "100%",
          maxWidth: "650px",
          boxSizing: "border-box",
        }}
      >
        {/* Add Celebrity */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <label
            style={{
              minWidth: "100px",
            }}
          >
            Celebrity:
          </label>

          <input
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "6px",
            }}
            value={celebName}
            onChange={(e) => setCelebName(e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={addNewCelebrity}
          >
            Add
          </button>
        </div>

        {/* Delete Celebrity */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <label
            style={{
              minWidth: "100px",
            }}
          >
            Celebrities:
          </label>

          <select
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "6px",
            }}
            value={deleteCelebrity}
            onChange={(e) => setDeleteCelebrity(e.target.value)}
          >
            {celebrityList.map((val) => (
              <option
                key={val.CelebID}
                value={val.CelebID}
              >
                {val.Name}
              </option>
            ))}
          </select>

          <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm("Remove celebrity?")) {
                removeCelebrity();
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCelebrity;
