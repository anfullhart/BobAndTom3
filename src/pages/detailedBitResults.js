import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const DetailedBitResults = () => {
  const location = useLocation();

  // Support both possible navigation state names
  const searchBitID =
    location.state?.searchBitID ||
    location.state?.bitID;

  const [bit, setBit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // LOAD BIT INFORMATION
  // ============================================================

  useEffect(() => {
    if (!searchBitID) {
      setError("No BitID was provided.");
      setLoading(false);
      return;
    }

    const fetchBit = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await Axios.get(
          `${API_URL}/api/get/bit/edit/${searchBitID}`
        );

        console.log("Detailed bit response:", response.data);

        setBit(response.data);
      } catch (err) {
        console.error(
          "Failed to fetch detailed bit:",
          err
        );

        let errorMessage =
          "Unable to load bit information.";

        if (err.response) {
          errorMessage =
            err.response.data?.error ||
            err.response.data?.message ||
            errorMessage;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchBit();
  }, [searchBitID]);

  // ============================================================
  // STYLES
  // ============================================================

  const pageStyle = {
    padding: "20px",
    color: "white",
    fontFamily: "Arial, sans-serif",
    maxWidth: "1000px",
    margin: "0 auto"
  };

  const cardStyle = {
    backgroundColor: "#1c1c1c",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.3)"
  };

  const labelStyle = {
    fontWeight: "bold",
    marginRight: "10px"
  };

  const valueStyle = {
    color: "lime"
  };

  const itemStyle = {
    marginBottom: "12px"
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h2>Loading bit information...</h2>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h2>Error</h2>

        <p>{error}</p>
      </div>
    );
  }

  // ============================================================
  // NO BIT
  // ============================================================

  if (!bit) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          color: "white"
        }}
      >
        <h2>No bit information found.</h2>
      </div>
    );
  }

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";

    try {
      const date = new Date(dateValue);

      return date.toLocaleDateString();
    } catch {
      return dateValue;
    }
  };

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div style={pageStyle}>

      {/* ========================================================
          GENERAL INFORMATION
      ========================================================= */}

      <div style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>
          Bit Information
        </h2>

        <div style={itemStyle}>
          <span style={labelStyle}>
            Bit ID:
          </span>

          <span style={valueStyle}>
            {bit.bitID || bit.BitID || "N/A"}
          </span>
        </div>

        <div style={itemStyle}>
          <span style={labelStyle}>
            Title:
          </span>

          <span style={valueStyle}>
            {bit.title || bit.Title || "N/A"}
          </span>
        </div>

        <div style={itemStyle}>
          <span style={labelStyle}>
            Type:
          </span>

          <span style={valueStyle}>
            {bit.type || bit.Type || "N/A"}
          </span>
        </div>

        <div style={itemStyle}>
          <span style={labelStyle}>
            Category:
          </span>

          <span style={valueStyle}>
            {bit.categoryName ||
              bit.Category ||
              bit.category ||
              "N/A"}
          </span>
        </div>

        <div style={itemStyle}>
          <span style={labelStyle}>
            Artist:
          </span>

          <span style={valueStyle}>
            {bit.artistName ||
              bit.Artist ||
              bit.artist ||
              "N/A"}
          </span>
        </div>

        <div style={itemStyle}>
          <span style={labelStyle}>
            Air Date:
          </span>

          <span style={valueStyle}>
            {formatDate(
              bit.date ||
              bit.AirDate
            )}
          </span>
        </div>

        <div style={itemStyle}>
          <span style={labelStyle}>
            Length:
          </span>

          <span style={valueStyle}>
            {bit.time ||
              bit.Time ||
              "N/A"}
          </span>
        </div>

        <div style={itemStyle}>
          <span style={labelStyle}>
            Automation Number:
          </span>

          <span style={valueStyle}>
            {bit.autoNum ||
              bit.ProphetNum ||
              "N/A"}
          </span>
        </div>
      </div>


      {/* ========================================================
          SUBJECTS
      ========================================================= */}

      {Array.isArray(bit.subjects) &&
        bit.subjects.length > 0 && (

          <div style={cardStyle}>

            <h3>Subjects</h3>

            {bit.subjects.map(
              (subject, index) => (

                <div
                  key={index}
                  style={itemStyle}
                >

                  <span style={labelStyle}>
                    Subject {index + 1}:
                  </span>

                  <span style={valueStyle}>
                    {subject.Subject ||
                      subject.subject ||
                      subject.Name ||
                      subject}
                  </span>

                </div>
              )
            )}

          </div>
        )}


      {/* ========================================================
          CELEBRITIES
      ========================================================= */}

      {(bit.celebrity1 ||
        bit.celebrity1Name ||
        bit.Celebrity1Name ||
        bit.celebrity2 ||
        bit.celebrity2Name ||
        bit.Celebrity2Name) && (

          <div style={cardStyle}>

            <h3>Celebrities</h3>

            {(bit.celebrity1Name ||
              bit.Celebrity1Name ||
              bit.celebrity1) && (

                <div style={itemStyle}>

                  <span style={labelStyle}>
                    Celebrity 1:
                  </span>

                  <span style={valueStyle}>
                    {bit.celebrity1Name ||
                      bit.Celebrity1Name ||
                      bit.celebrity1}
                  </span>

                </div>
              )}

            {(bit.celebrity2Name ||
              bit.Celebrity2Name ||
              bit.celebrity2) && (

                <div style={itemStyle}>

                  <span style={labelStyle}>
                    Celebrity 2:
                  </span>

                  <span style={valueStyle}>
                    {bit.celebrity2Name ||
                      bit.Celebrity2Name ||
                      bit.celebrity2}
                  </span>

                </div>
              )}

          </div>
        )}


      {/* ========================================================
          SPORT
      ========================================================= */}

      {(bit.sport ||
        bit.sportName ||
        bit.Sport) && (

          <div style={cardStyle}>

            <h3>Sport</h3>

            <div style={itemStyle}>

              <span style={valueStyle}>
                {bit.sportName ||
                  bit.Sport ||
                  bit.sport}
              </span>

            </div>

          </div>
        )}


      {/* ========================================================
          SEASON
      ========================================================= */}

      {(bit.season ||
        bit.seasonName ||
        bit.Season) && (

          <div style={cardStyle}>

            <h3>Season</h3>

            <div style={itemStyle}>

              <span style={valueStyle}>
                {bit.seasonName ||
                  bit.Season ||
                  bit.season}
              </span>

            </div>

          </div>
        )}


      {/* ========================================================
          KEYWORDS
      ========================================================= */}

      {bit.keywords && (

        <div style={cardStyle}>

          <h3>Keywords</h3>

          <div style={valueStyle}>
            {bit.keywords}
          </div>

        </div>
      )}


      {/* ========================================================
          HYPERLINKS
      ========================================================= */}

      {Array.isArray(bit.hyperlinks) &&
        bit.hyperlinks.length > 0 && (

          <div style={cardStyle}>

            <h3>Hyperlinks</h3>

            {bit.hyperlinks.map(
              (link, index) => {

                const url =
                  typeof link === "string"
                    ? link
                    : link.URL ||
                      link.url ||
                      link.Link ||
                      link.Hyperlink;

                if (!url) return null;

                return (

                  <div
                    key={index}
                    style={itemStyle}
                  >

                    <span style={labelStyle}>
                      Link {index + 1}:
                    </span>

                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "lime",
                        textDecoration:
                          "underline",
                        wordBreak:
                          "break-all"
                      }}
                    >
                      {url}
                    </a>

                  </div>
                );
              }
            )}

          </div>
        )}


      {/* ========================================================
          ALBUMS
      ========================================================= */}

      {Array.isArray(bit.albums) &&
        bit.albums.length > 0 && (

          <div style={cardStyle}>

            <h3>Albums</h3>

            {bit.albums.map(
              (item, index) => (

                <div
                  key={index}
                  style={{
                    marginBottom: "20px",
                    paddingBottom: "15px",
                    borderBottom:
                      index !==
                      bit.albums.length - 1
                        ? "1px solid #444"
                        : "none"
                  }}
                >

                  <div style={itemStyle}>

                    <span style={labelStyle}>
                      Album {index + 1}:
                    </span>

                    <span style={valueStyle}>
                      {item.albumName ||
                        item.Album_Name ||
                        item.album ||
                        "N/A"}
                    </span>

                  </div>

                  <div style={itemStyle}>

                    <span style={labelStyle}>
                      Track:
                    </span>

                    <span style={valueStyle}>
                      {item.track ||
                        item.Album_Track ||
                        "N/A"}
                    </span>

                  </div>

                </div>
              )
            )}

          </div>
        )}

    </div>
  );
};

export default DetailedBitResults;