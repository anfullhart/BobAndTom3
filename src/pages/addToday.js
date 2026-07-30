import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const AddToday = () => {
  const [artistList, setArtistList] = useState([]);
  const navigate = useNavigate();

  const createEmptyRow = () => ({
    time: "",
    description: "",
    artist: "",
  });

  const [rows, setRows] = useState(
    Array(5).fill(null).map(createEmptyRow)
  );
  const [visibleRows, setVisibleRows] = useState(5);

  // Today's date is automatically populated
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
    const filledCount = rows
      .slice(0, visibleRows)
      .filter(
        (r) =>
          r.time.trim() !== "" ||
          r.description.trim() !== "" ||
          r.artist.trim() !== ""
      ).length;

    if (filledCount >= visibleRows - 2) {
      const newVisible = visibleRows + 5;

      if (newVisible > rows.length) {
        const extraRows = Array(newVisible - rows.length)
          .fill(null)
          .map(createEmptyRow);

        setRows((prev) => [...prev, ...extraRows]);
      }

      setVisibleRows(newVisible);
    }
  };

  const updateRow = (index, field, value) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });

    expandRowsIfNeeded();
  };

  const submitRunSheet = () => {
    const payload = {
      logDate,
      rows: rows.map((r) => ({
        time: r.time,
        desc: r.description,
        artist: r.artist,
      })),
    };

    Axios.post(`${API_URL}/api/insert/runSheet`, payload)
      .then(() => {
        if (window.confirm("Run Sheet submitted successfully!")) {
          navigate(-1);
        }
      })
      .catch((err) => console.log(err));
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
          maxWidth: "330px",
          borderRadius: "10px",
          border: "3px solid black",
          textAlign: "center",
          padding: "15px",
          marginBottom: "20px",
          boxShadow: "0 3px 10px rgba(0,0,0,.2)",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "10px",
          }}
        >
          Run Sheet Date
        </div>

        <input
          type="text"
          placeholder="MM-DD-YYYY"
          value={logDate}
          onChange={(e) => setLogDate(e.target.value)}
          style={{
            width: "170px",
            padding: "8px 10px",
            border: "2px solid #dc3545",
            borderRadius: "8px",
            backgroundColor: "#fff5f5",
            color: "#dc3545",
            fontWeight: "bold",
            fontSize: "18px",
            textAlign: "center",
            outline: "none",
            cursor: "text",
            transition: "all .2s ease",
          }}
          onFocus={(e) => {
            e.target.style.boxShadow =
              "0 0 8px rgba(220,53,69,.5)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Main Container */}
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          width: "100%",
          maxWidth: "1000px",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,.35)",
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
              onChange={(e) =>
                updateRow(index, "time", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Description"
              value={row.description}
              onChange={(e) =>
                updateRow(index, "description", e.target.value)
              }
            />

            <select
              value={row.artist}
              onChange={(e) =>
                updateRow(index, "artist", e.target.value)
              }
            >
              <option value="">Select Artist</option>

              {artistList.map((val) => (
                <option
                  key={val.ArtistID}
                  value={val.ArtistID}
                >
                  {val.Name}
                </option>
              ))}
            </select>
          </div>
        ))}

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
