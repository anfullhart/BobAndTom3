import { React, useState, useEffect } from "react";
import Home from "../style/home.css";
import { Link } from "react-router-dom";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditCelebrity = () => {
  const [celebName, setCelebName] = useState("");
  const [celebrityList, setCelebrityList] = useState([]);
  const [deleteCelebrity, setDeleteCelebrity] = useState("");

  const handleCelebrityNameChange = (e) => {
    setCelebName(e.target.value);
  };

  useEffect(() => {
    getCelebrities();
  }, []);

  const getCelebrities = () => {
    Axios.get(`${API_URL}/api/get/celebrities`).then((response) => {
      setCelebrityList(response.data);
    });
  };

  const addNewCelebrity = () => {
    Axios.post(`${API_URL}/api/insert/celebrity`, {
      name: celebName,
    }).then(() => {
      window.location.reload(true);
    });
  };

  const removeCelebrity = () => {
    Axios.post(`${API_URL}/api/delete/celebrity`, {
      deleteCelebrity: deleteCelebrity,
    }).then(() => {
      window.location.reload(true);
    });
  };

  return (
    <div>
      <div
        style={{
          color: "white",
          fontSize: "30px",
          marginLeft: "36%",
          marginTop: "75px",
        }}
      >
        Input New Celebrity
      </div>

      <div
        style={{
          paddingLeft: "50px",
          backgroundColor: "black",
          color: "white",
          fontSize: "15px",
          marginTop: "20px",
          marginLeft: "25%",
          borderRadius: "15px",
          width: "600px",
          height: "160px",
        }}
      >
        Celebrity:
        <input
          style={{
            marginTop: "20px",
            marginLeft: "10px",
            width: "400px",
          }}
          onChange={handleCelebrityNameChange}
        />

        <button
          className="btn btn-success"
          style={{ marginLeft: "10px" }}
          onClick={() => {
            window.alert(`${celebName} added to the database.`);
            addNewCelebrity();
          }}
        >
          Add
        </button>

        <div style={{ marginTop: "20px" }}>
          <label htmlFor="ddlCelebrity">List of Celebrities: </label>

          <select
            id="ddlCelebrity"
            size="1"
            style={{
              marginLeft: "10px",
              fontSize: "15px",
            }}
            onChange={(e) => {
              setDeleteCelebrity(e.target.value);
            }}
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
            style={{ marginLeft: "10px" }}
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