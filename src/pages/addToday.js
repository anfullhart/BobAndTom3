import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <- import navigate
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const AddToday = () => {
  const [artistList, setArtistList] = useState([]);
  const navigate = useNavigate(); // <- initialize navigate

  const createEmptyRow = () => ({
    time: "",
    description: "",
    artist: ""
  });

  const [rows, setRows] = useState(Array(5).fill(null).map(createEmptyRow));
  const [visibleRows, setVisibleRows] = useState(5);

  const today = new Date();
  const defaultDate = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}-${today.getFullYear()}`;
  const [logDate, setLogDate] = useState(defaultDate);

  useEffect(() => {
    Axios.get(`${API_URL}/api/get/artist`).then((response) => {
      setArtistList(response.data);
    });
  }, []);

  const expandRowsIfNeeded = () => {
    const filledCount = rows.slice(0, visibleRows).filter((r) => {
      return r.time.trim() !== "" || r.description.trim() !== "" || r.artist.trim() !== "";
    }).length;

    if (filledCount >= visibleRows - 2) {
      const newVisible = visibleRows + 5;
      if (newVisible > rows.length) {
        const extraRowsNeeded = newVisible - rows.length;
        const newRows = Array(extraRowsNeeded).fill(null).map(createEmptyRow);
        setRows((prev) => [...prev, ...newRows]);
      }
      setVisibleRows(newVisible);
    }
  };

  const updateRow = (index, field, value) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    expandRowsIfNeeded();
  };

  const submitRunSheet = () => {
    const payload = {
      logDate,
      rows: rows.map(r => ({
        time: r.time,
        desc: r.description,
        artist: r.artist
      }))
    };

    Axios.post(`${API_URL}/api/insert/runSheet`, payload)
      .then(() => {
        // Confirmation prompt
        const confirmed = window.confirm("Run Sheet submitted successfully!");
        if (confirmed) {
          navigate(-1); // go back to previous screen
        }
      })
      .catch(err => console.log(err));
  };

  const clearRunSheet = () => {
    setRows(Array(5).fill(null).map(createEmptyRow));
    setVisibleRows(5);
  };

  const addFiveRows = () => {
    const newRows = Array(5).fill(null).map(createEmptyRow);
    setRows((prev) => [...prev, ...newRows]);
    setVisibleRows((prev) => prev + 5);
  };

 return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      minHeight: "100vh",
      padding: "20px",
      boxSizing: "border-box",
    }}
  >
    {/* Date Box */}
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        width: "100%",
        maxWidth: "300px",
        borderRadius: "10px",
        border: "3px solid black",
        textAlign: "center",
        padding: "10px",
        marginBottom: "20px",
      }}
    >
      Run Sheet Date:
      <input
        style={{
          marginLeft: "10px",
          width: "120px",
        }}
        value={logDate}
        onChange={(e) => setLogDate(e.target.value)}
      />
    </div>

    {/* Main Container */}
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        fontSize: "15px",
        padding: "20px",
        borderRadius: "15px",
        width: "100%",
        maxWidth: "1000px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr 200px",
          gap: "15px",
          marginBottom: "15px",
          fontWeight: "bold",
        }}
      >
        <div>Time</div>
        <div>Description</div>
        <div>Artist</div>
      </div>

      {rows.slice(0, visibleRows).map((row, index) => (
        <div
          key={index}
          style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr 200px",
            gap: "15px",
            marginBottom: "10px",
          }}
        >
          <input
            type="text"
            placeholder="00:00:00"
            value={row.time}
            onChange={(e) => updateRow(index, "time", e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={row.description}
            onChange={(e) => updateRow(index, "description", e.target.value)}
          />

          <select
            value={row.artist}
            onChange={(e) => updateRow(index, "artist", e.target.value)}
          >
            <option value="">Select Artist</option>
            {artistList.map((val) => (
              <option key={val.ArtistID} value={val.ArtistID}>
                {val.Name}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          type="button"
          className="btn btn-success"
          onClick={submitRunSheet}
        >
          Submit Run Sheet
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={clearRunSheet}
        >
          Clear Run Sheet
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={addFiveRows}
        >
          Add 5 Rows
        </button>
      </div>
    </div>
  </div>
);
};

export default AddToday;
