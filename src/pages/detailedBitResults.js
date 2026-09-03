import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./addBit.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const DetailedBitResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchBitID =
    location.state?.searchBitID ||
    location.state?.bitID ||
    null;

  const [bit, setBit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchBitID) {
      console.error("No BitID provided.");
      setLoading(false);
      return;
    }

    const loadBit = async () => {
      try {
        setLoading(true);

        const response = await Axios.get(
          `${API_URL}/api/get/bit/edit/${searchBitID}`
        );

        console.log("Detailed bit data:", response.data);

        setBit(response.data);
      } catch (error) {
        console.error("Error loading bit details:", error);

        if (error.response) {
          console.error(
            "Backend response:",
            error.response.data
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadBit();
  }, [searchBitID]);

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

  if (!searchBitID) {
    return (
      <div
        style={{
          padding: "40px",
          color: "white"
        }}
      >
        <h2>No Bit ID was provided.</h2>

        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!bit) {
    return (
      <div
        style={{
          padding: "40px",
          color: "white"
        }}
      >
        <h2>Unable to load bit information.</h2>

        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="add-bit-form">

      <div className="form-columns">

        {/* GENERAL INFORMATION */}

        <div className="card">

          <h2>General Info</h2>

          <div className="form-row">
            <label>Bit ID:</label>
            <input
              type="text"
              value={bit.bitID || searchBitID}
              readOnly
            />
          </div>

          <div className="form-row">
            <label>Title:</label>
            <input
              type="text"
              value={bit.title || ""}
              readOnly
            />
          </div>

          <div className="form-row">
            <label>Type:</label>
            <input
              type="text"
              value={bit.type || ""}
              readOnly
            />
          </div>

          <div className="form-row">
            <label>Category:</label>
            <input
              type="text"
              value={bit.categoryName || bit.category || ""}
              readOnly
            />
          </div>

          <div className="form-row">
            <label>Artist:</label>
            <input
              type="text"
              value={bit.artistName || bit.artist || ""}
              readOnly
            />
          </div>

          <div className="form-row">
            <label>Air Date:</label>
            <input
              type="text"
              value={bit.date || ""}
              readOnly
            />
          </div>

          <div className="form-row">
            <label>Length:</label>
            <input
              type="text"
              value={bit.time || ""}
              readOnly
            />
          </div>

          <div className="form-row">
            <label>Automation #:</label>
            <input
              type="text"
              value={bit.autoNum || ""}
              readOnly
            />
          </div>

          {/* SUBJECTS */}

          <div className="form-row">
            <label>Subjects:</label>

            <div style={{ flex: 1 }}>
              {Array.isArray(bit.subjects) &&
              bit.subjects.length > 0 ? (
                bit.subjects.map((subject, index) => (
                  <div key={index}>
                    {subject.Subject ||
                      subject.subject ||
                      subject.Name ||
                      subject}
                  </div>
                ))
              ) : (
                <div>None</div>
              )}
            </div>
          </div>

          {/* CELEBRITIES */}

          <div className="form-row">
            <label>Celebrities:</label>

            <div style={{ flex: 1 }}>
              <div>
                {bit.celebrity1Name ||
                  bit.celebrity1 ||
                  "None"}
              </div>

              <div>
                {bit.celebrity2Name ||
                  bit.celebrity2 ||
                  ""}
              </div>
            </div>
          </div>

          {/* SPORT */}

          <div className="form-row">
            <label>Sport:</label>
            <input
              type="text"
              value={
                bit.sportName ||
                bit.sport ||
                ""
              }
              readOnly
            />
          </div>

          {/* SEASON */}

          <div className="form-row">
            <label>Season:</label>
            <input
              type="text"
              value={
                bit.seasonName ||
                bit.season ||
                ""
              }
              readOnly
            />
          </div>

          {/* KEYWORDS */}

          <div className="form-row">
            <label>Keywords:</label>

            <input
              type="text"
              value={bit.keywords || ""}
              readOnly
            />
          </div>

        </div>

        {/* HYPERLINKS */}

        <div className="card">

          <h2>Hyperlinks</h2>

          {Array.isArray(bit.hyperlinks) &&
          bit.hyperlinks.length > 0 ? (
            bit.hyperlinks.map((link, index) => (

              <div
                className="form-row"
                key={index}
              >
                <label>
                  Link {index + 1}:
                </label>

                <input
                  type="text"
                  value={link}
                  readOnly
                />

              </div>

            ))
          ) : (
            <p>No hyperlinks.</p>
          )}

        </div>

        {/* ALBUMS */}

        <div className="card">

          <h2>Albums</h2>

          {Array.isArray(bit.albums) &&
          bit.albums.length > 0 ? (

            bit.albums.map((item, index) => (

              <div
                className="form-row"
                key={index}
              >

                <label>
                  Album {index + 1}:
                </label>

                <input
                  type="text"
                  value={
                    item.albumName ||
                    item.album ||
                    ""
                  }
                  readOnly
                />

                <label>
                  Track:
                </label>

                <input
                  type="text"
                  value={item.track || ""}
                  readOnly
                />

              </div>

            ))

          ) : (

            <p>No albums.</p>

          )}

        </div>

      </div>

      {/* BACK BUTTON */}

      <div className="form-actions">

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Back to Results
        </button>

      </div>

    </div>
  );
};

export default DetailedBitResults;