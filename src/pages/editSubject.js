import React, { useState, useEffect } from "react";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditSubject = () => {
  const [subject, setSubject] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [deleteSubject, setDeleteSubject] = useState("");

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = () => {
    Axios.get(`${API_URL}/api/get/subjects`).then((response) => {
      setSubjectList(response.data);
    });
  };

  const addSubject = () => {
    if (subject.trim() === "") {
      window.alert("Please enter a subject.");
      return;
    }

    Axios.post(`${API_URL}/api/insert/subject`, {
      subject: subject,
    }).then(() => {
      window.alert(`${subject} added.`);
      window.location.reload(true);
    });
  };

  const removeSubject = () => {
    Axios.post(`${API_URL}/api/delete/subject`, {
      deleteSubject: deleteSubject,
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
          marginLeft: "40%",
          marginTop: "75px",
        }}
      >
        Edit Subjects
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
        Subject:
        <input
          style={{
            marginTop: "20px",
            marginLeft: "10px",
            width: "400px",
          }}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <button
          className="btn btn-success"
          style={{ marginLeft: "10px" }}
          onClick={addSubject}
        >
          Add
        </button>

        <div style={{ marginTop: "20px" }}>
          <label htmlFor="ddlSubject">
            List of Subjects:
          </label>

          <select
            id="ddlSubject"
            style={{
              marginLeft: "10px",
              fontSize: "15px",
            }}
            onChange={(e) => setDeleteSubject(e.target.value)}
          >
            <option value="">Select Subject</option>

            {subjectList.map((val) => (
              <option
                key={val.SubID}
                value={val.SubID}
              >
                {val.Subject}
              </option>
            ))}
          </select>

          <button
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              if (window.confirm("Remove subject?")) {
                removeSubject();
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

export default EditSubject;