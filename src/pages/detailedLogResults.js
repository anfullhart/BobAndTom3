import * as React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const DetailedLogResults = () => {
  const locationState = useLocation().state || {};
  const { RS_ID = null } = locationState;

  const [artistList, setArtistList] = useState([]);
  const [logDate, setLogDate] = useState("");
  const [values, setValues] = useState([]);

  useEffect(() => {
    getArtist();
    getLogData();
  }, []);

  const getArtist = () => {
    Axios.get("http://localhost:3001/api/get/artist")
      .then((res) => setArtistList(res.data))
      .catch((err) => console.error("Artist load error:", err));
  };

  const getLogData = () => {
    if (!RS_ID) return;

    Axios.get(`http://localhost:3001/api/get/runSheet/${RS_ID}`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setValues(
            res.data.map((row) => ({
              L_ID: row.L_ID,
              bTime: row.bTime || "",
              bitDesc: row.bitDesc || "",
              ArtistID: row.ArtistID || "",
            }))
          );
          setLogDate(res.data[0].RSDate || "");
        } else {
          setValues([]);
        }
      })
      .catch((err) => console.error("Log load error:", err));
  };

  const getArtistName = (id) => {
    const artist = artistList.find((a) => a.ArtistID === id);
    return artist ? artist.Name : "Unknown Artist";
  };

  

const exportToSpreadsheet = () => {
  if (!values || values.length === 0) return;

  // Map data into an array of objects for Excel
  const worksheetData = values.map(row => ({
    Time: row.bTime,
    Description: row.bitDesc || "-",
    Artist: getArtistName(row.ArtistID),
  }));

  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "RunSheet");

  // Write workbook and trigger download
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, `RunSheet_${logDate}.xlsx`);
};

  const exportToPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(`Run Sheet - ${logDate}`, 14, 22);

  const tableColumn = ["Time", "Description", "Artist"];
  const tableRows = values.map(row => [
    row.bTime,
    row.bitDesc || "-",
    getArtistName(row.ArtistID)
  ]);

  // Use autoTable directly
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [0, 123, 255], textColor: 255 },
  });

  doc.save(`RunSheet_${logDate}.pdf`);
};


  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", background: "#f5f5f5" }}>
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Run Sheet Date: {logDate}
      </div>

     


      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#007bff", color: "#fff", textAlign: "left" }}>
              <th style={{ padding: "12px" }}>Time</th>
              <th style={{ padding: "12px" }}>Description</th>
              <th style={{ padding: "12px" }}>Artist</th>
            </tr>
          </thead>
          <tbody>
            {values.map((row, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td style={{ padding: "12px", color: "#333" }}>{row.bTime}</td>
                <td style={{ padding: "12px", color: "#333" }}>{row.bitDesc || "No description"}</td>
                <td style={{ padding: "12px", color: "#333" }}>{getArtistName(row.ArtistID)}</td>
              </tr>
            ))}
            {values.length === 0 && (
              <tr>
                <td colSpan="3" style={{ padding: "20px", textAlign: "center", color: "#777" }}>
                  No log entries found for this run sheet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
         <div style={{ marginTop: "20px", marginBottom: "20px", marginLeft:"70%"}}>
  <button
    onClick={exportToPDF}
    style={{
      padding: "10px 15px",
      marginRight: "10px",
      backgroundColor: "#0d6efd",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Export to PDF
  </button>

  <button
    onClick={exportToSpreadsheet}
    style={{
      padding: "10px 15px",
      backgroundColor: "#198754",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Export to Spreadsheet
  </button>
</div>
      </div>
    </div>
  );
};

export default DetailedLogResults;
