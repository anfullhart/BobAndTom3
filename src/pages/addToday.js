import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <- import navigate
import Axios from "axios";

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
    Axios.get("http://localhost:3001/api/get/artist").then((response) => {
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

    Axios.post("http://localhost:3001/api/insert/runSheet", payload)
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
    <form>
      {/* Date Box */}
      <div
        style={{
          backgroundColor: "white",
          color: "black",
          width: "240px",
          borderRadius: "10px",
          border: "3px solid black",
          marginLeft: "10px",
          marginTop: "10px",
          textAlign: "center",
          padding: "10px"
        }}
      >
        Run Sheet Date:
        <input
          style={{ marginLeft: "5%", width: "120px" }}
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
          marginTop: "20px",
          marginLeft: "18%",
          padding: "20px",
          borderRadius: "15px",
          width: "1000px"
        }}
      >
        <label style={{ marginLeft: "10%" }}>Time</label>
        <label style={{ marginLeft: "30%" }}>Description</label>
        <label style={{ marginLeft: "30%" }}>Artist</label>

        {rows.slice(0, visibleRows).map((row, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="00:00:00"
              value={row.time}
              onChange={(e) => updateRow(index, "time", e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              style={{ marginLeft: "40px", width: "400px" }}
              value={row.description}
              onChange={(e) => updateRow(index, "description", e.target.value)}
            />

            <select
              style={{ marginLeft: "5px" }}
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
        <div>
          <button
            type="button"
            className="btn btn-success"
            onClick={submitRunSheet}
            style={{ marginLeft: "55%", marginTop: "20px" }}
          >
            Submit Run Sheet
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={clearRunSheet}
            style={{ marginLeft: "10px", marginTop: "20px" }}
          >
            Clear Run Sheet
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={addFiveRows}
            style={{ marginLeft: "10px", marginTop: "20px" }}
          >
            Add 5 Rows
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddToday;
