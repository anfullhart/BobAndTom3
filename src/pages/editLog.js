import * as React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditLog = () => {
  const navigate = useNavigate();
  const { RS_ID = null } = useLocation().state || {};

  const [artistList, setArtistList] = useState([]);
  const [logDate, setLogDate] = useState("");
  const [values, setValues] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]); // TRACK DELETED ROWS

  useEffect(() => {
    loadArtists();
    loadLogData();
  }, []);

  const loadArtists = () => {
    Axios.get("http://localhost:3001/api/get/artist")
      .then((res) => setArtistList(res.data))
      .catch((err) => console.error("Artist load error:", err));
  };

  const loadLogData = () => {
    if (!RS_ID) return;

    Axios.get(`http://localhost:3001/api/get/runSheet/${RS_ID}`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setValues(
            res.data.map((row) => ({
              L_ID: row.L_ID,
              bTime: row.bTime || "",
              bitDesc: row.bitDesc || "",
              ArtistID: row.ArtistID || ""
            }))
          );
          setLogDate(res.data[0].RSDate || "");
        } else {
          setValues([]);
        }
      })
      .catch((err) => console.error("Log load error:", err));
  };

  const handleChange = (index, field, value) => {
    const updated = [...values];
    updated[index][field] = value;
    setValues(updated);
  };

  const handleAdd3Rows = () => {
    const newRows = Array.from({ length: 3 }, () => ({
      L_ID: null,
      bTime: "",
      bitDesc: "",
      ArtistID: ""
    }));
    setValues((prev) => [...prev, ...newRows]);
  };

  const handleRemove1Row = () => {
    if (values.length > 0) setValues((prev) => prev.slice(0, prev.length - 1));
  };

  // TRACK DELETED ROWS
  const handleDeleteRow = (index) => {
    if (!window.confirm("Delete this row?")) return;
    const row = values[index];
    if (row.L_ID) setDeletedRows((prev) => [...prev, row.L_ID]);
    setValues((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirmEdits = async (e) => {
    e.preventDefault();
    if (!window.confirm("Save changes to this run sheet?")) return;

    const payload = values
      .filter((row) => row.bTime || row.bitDesc || row.ArtistID)
      .map((row) => ({
        L_ID: row.L_ID,
        bTime: row.bTime,
        bitDesc: row.bitDesc,
        ArtistID: row.ArtistID || null
      }));

    try {
      await Axios.post("http://localhost:3001/api/edit/runSheet", {
        RS_ID,
        logDate,
        data: payload,
        deletedRows // SEND DELETED ROWS
      });
      navigate("/searchrunsheet", { replace: true });
    } catch (err) {
      console.error("Save failed:", err);
      alert("Save failed. Check console.");
    }
  };

  const handleCancelEdits = (e) => {
    e.preventDefault();
    if (!window.confirm("Discard all changes?")) return;
    navigate("/searchrunsheet", { replace: true });
  };

  return (
    <form>
      {/* DATE */}
      <div
        style={{
          backgroundColor: "white",
          color: "black",
          width: "250px",
          height: "50px",
          borderRadius: "10px",
          border: "3px solid black",
          marginLeft: "10px",
          marginTop: "10px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <span>Run Sheet Date:</span>
        <input
          style={{ marginLeft: "5px", width: "110px" }}
          value={logDate}
          onChange={(e) => setLogDate(e.target.value)}
          placeholder="MM-DD-YYYY"
        />
      </div>

      {/* TABLE */}
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          fontSize: "15px",
          marginTop: "15px",
          marginLeft: "18%",
          padding: "20px",
          borderRadius: "15px",
          width: "925px"
        }}
      >
        {/* Table headers */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ width: "80px" }}>Time</span>
          <span style={{ width: "420px", marginLeft: "40px" }}>Description</span>
          <span style={{ width: "150px", marginLeft: "10px" }}>Artist</span>
        </div>

        {values.map((row, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
          >
            <input
              type="text"
              placeholder="00:00:00"
              value={row.bTime}
              onChange={(e) => handleChange(index, "bTime", e.target.value)}
              style={{ width: "75px" }}
            />
            <input
              type="text"
              placeholder="Description"
              style={{ marginLeft: "10px", width: "480px" }}
              value={row.bitDesc}
              onChange={(e) => handleChange(index, "bitDesc", e.target.value)}
            />
            <select
              value={row.ArtistID}
              style={{ marginLeft: "10px", width: "250px" }}
              onChange={(e) => handleChange(index, "ArtistID", e.target.value)}
            >
              <option value="">Choose Artist</option>
              {artistList.map((a) => (
                <option key={a.ArtistID} value={a.ArtistID}>
                  {a.Name}
                </option>
              ))}
            </select>

                        {/* Small minus button */}
            <button
              type="button"
              onClick={() => handleDeleteRow(index)}
              style={{
                marginLeft: "10px",
                fontWeight: "bold",
                fontSize: "18px",
                color: "#fff",
                backgroundColor: "#dc3545",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                height: "25px",
                width: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "5px",
              }}
              title="Delete Row"
            >
              −
            </button>

            {/* Small plus button */}
            <button
              type="button"
              onClick={() => {
                const newRow = { L_ID: null, bTime: "", bitDesc: "", ArtistID: "" };
                const updated = [...values];
                updated.splice(index + 1, 0, newRow);
                setValues(updated);
              }}
              style={{
                marginLeft: "5px",
                fontWeight: "bold",
                fontSize: "18px",
                color: "#fff",
                backgroundColor: "#28a745",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                height: "25px",
                width: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
                paddingBottom: "5px"
              }}
              title="Add Row Below"
            >
              +
            </button>

          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div style={{ marginTop: "20px", marginLeft: "18%", display: "flex", gap: "10px" }}>
        <button type="button" className="btn btn-warning" onClick={handleRemove1Row}>
          − 1 Row
        </button>

        <button type="button" className="btn btn-warning" onClick={handleAdd3Rows}>
          + 3 Rows
        </button>

        <button className="btn btn-danger" onClick={handleCancelEdits}>
          Cancel
        </button>

        <button className="btn btn-success" onClick={handleConfirmEdits}>
          Confirm Edits
        </button>
      </div>
    </form>
  );
};

export default EditLog;
