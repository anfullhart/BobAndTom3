import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";

const Results = () => {
  const location = useLocation();
  const searchBitID = location.state?.bitID || '';
  const searchType = location.state?.type || '';
  const searchKeyword = location.state?.keyword || '';

  const [bitList, setBitList] = useState([]);
  const [role, setRole] = useState("user");

  // Get logged-in user role from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    setRole(user?.role || "user");
  }, []);

  useEffect(() => {
    submitSearch();
  }, []);

  const submitSearch = () => {
    Axios.get(`http://localhost:3001/api/get/${searchBitID}/${searchKeyword}/${searchType}`)
      .then((response) => setBitList(response.data))
      .catch((err) => console.error(err));
  };

  const deleteBit = (deleteBitID) => {
    if (!window.confirm(`Delete Record Number ${deleteBitID}?`)) return;
    Axios.post("http://localhost:3001/api/delete/bit", { bitID: deleteBitID })
      .then(() => submitSearch())
      .catch((err) => console.error(err));
  };

  const isAdmin = role === "admin" || role === "owner";

  return (
    <div style={{ padding: "20px", color: "white", fontFamily: "Arial, sans-serif" }}>
      {bitList.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {bitList.map((val) => (
            <div
              key={val.BitID}
              style={{
                backgroundColor: "#1c1c1c",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.3)"
              }}
            >
              {/* Header with inline buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h3 style={{ margin: 0 }}>Bit ID: {val.BitID}</h3>

                <div style={{ display: "flex", gap: "10px" }}>
                  {/* Details button - visible to all */}
                  <Link
                    to="/detailedBitResults"
                    state={{ searchBitID: val.BitID }}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#00ff88",
                      color: "#111",
                      borderRadius: "5px",
                      
                      textDecoration: "none",
                    }}
                  >
                    Details
                  </Link>

                  {/* Admin/Owner only */}
                  {isAdmin && (
                    <>
                      <Link
                        to="/editBit"
                        state={{ bitID: val.BitID }}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#ffc107",
                          color: "#111",
                          borderRadius: "5px",
                          
                          textDecoration: "none",
                        }}
                      >
                        Edit
                      </Link>

                      <button
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          borderRadius: "5px",
                          
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteBit(val.BitID)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Bit info */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                <div><strong>Title:</strong> {val.Title}</div>
                <div><strong>Artist:</strong> {val.Name}</div>
                <div><strong>Legacy Number:</strong> {val.ProphetNum}</div>
                <div><strong>Time:</strong> {val.Time}</div>
                <div><strong>Type:</strong> {val.Type}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
