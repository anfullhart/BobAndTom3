import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./detailedBitResults.css";

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
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!searchBitID) {
      console.error("No BitID provided.");
      setLoading(false);
      setErrorMessage("No Bit ID was provided.");
      return;
    }

    const loadBit = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const url = `${API_URL}/api/get/bit/full/${searchBitID}`;

        console.log("Loading complete bit:", url);

        const response = await Axios.get(url);

        console.log("Complete bit data:", response.data);

        setBit(response.data);
      } catch (error) {
        console.error("Error loading bit details:", error);

        if (error.response) {
          console.error(
            "Backend response:",
            error.response.data
          );

          setErrorMessage(
            error.response.data?.error ||
              "Unable to load bit information."
          );
        } else {
          setErrorMessage(
            "Unable to connect to the server."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadBit();
  }, [searchBitID]);

  // ============================================================
  // HELPERS
  // ============================================================

  const displayValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "None";
    }

    return value;
  };

  const displayList = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      return (
        <span className="dbr-empty">
          None
        </span>
      );
    }

    return (
      <div className="dbr-tags">
        {items.map((item, index) => (
          <span
            className="dbr-tag"
            key={index}
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="dbr-page">
        <div className="dbr-message-card">

          <div className="dbr-spinner"></div>

          <h2>
            Loading bit information...
          </h2>

          <p>
            Please wait while we retrieve the bit details.
          </p>

        </div>
      </div>
    );
  }

  // ============================================================
  // NO BIT ID
  // ============================================================

  if (!searchBitID) {
    return (
      <div className="dbr-page">
        <div className="dbr-message-card">

          <div className="dbr-message-icon">
            !
          </div>

          <h2>
            No Bit ID was provided
          </h2>

          <p>
            We couldn't determine which bit you wanted to view.
          </p>

          <button
            type="button"
            className="dbr-button"
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>

        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (!bit) {
    return (
      <div className="dbr-page">
        <div className="dbr-message-card">

          <div className="dbr-message-icon">
            !
          </div>

          <h2>
            {errorMessage ||
              "Unable to load bit information."}
          </h2>

          <p>
            There was a problem retrieving this bit.
          </p>

          <button
            type="button"
            className="dbr-button"
            onClick={() => navigate(-1)}
          >
            ← Back to Results
          </button>

        </div>
      </div>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="dbr-page">

      {/* ========================================================
          PAGE HEADER
      ======================================================== */}

      <div className="dbr-header">

        <div className="dbr-header-left">

          <div className="dbr-eyebrow">
            BIT DETAILS
          </div>

          <h1 className="dbr-title">
            {displayValue(bit.title)}
          </h1>

          <div className="dbr-header-badges">

            <span className="dbr-id-badge">
              Bit ID: {displayValue(bit.bitID)}
            </span>

            {bit.type && (
              <span className="dbr-type-badge">
                {bit.type}
              </span>
            )}

          </div>

        </div>

        <button
          type="button"
          className="dbr-back-button"
          onClick={() => navigate(-1)}
        >
          ← Back to Results
        </button>

      </div>


      {/* ========================================================
          BASIC INFORMATION
      ======================================================== */}

      <section className="dbr-card">

        <div className="dbr-card-header">

          <div>
            <h2>
              Bit Information
            </h2>

            <p>
              General information about this bit.
            </p>
          </div>

        </div>

        <div className="dbr-info-grid">

          <div className="dbr-info-item">
            <span className="dbr-label">
              Bit ID
            </span>

            <span className="dbr-value dbr-monospace">
              {displayValue(bit.bitID)}
            </span>
          </div>

          <div className="dbr-info-item">
            <span className="dbr-label">
              Title
            </span>

            <span className="dbr-value">
              {displayValue(bit.title)}
            </span>
          </div>

          <div className="dbr-info-item">
            <span className="dbr-label">
              Type
            </span>

            <span className="dbr-value">
              {displayValue(bit.type)}
            </span>
          </div>

          <div className="dbr-info-item">
            <span className="dbr-label">
              Artist
            </span>

            <span className="dbr-value">
              {displayValue(bit.artist)}
            </span>
          </div>

          <div className="dbr-info-item">
            <span className="dbr-label">
              Air Date
            </span>

            <span className="dbr-value">
              {displayValue(bit.date)}
            </span>
          </div>

          <div className="dbr-info-item">
            <span className="dbr-label">
              Length
            </span>

            <span className="dbr-value">
              {displayValue(bit.time)}
            </span>
          </div>

          <div className="dbr-info-item">
            <span className="dbr-label">
              Automation Number
            </span>

            <span className="dbr-value">
              {displayValue(bit.autoNum)}
            </span>
          </div>

          <div className="dbr-info-item">
            <span className="dbr-label">
              Keywords
            </span>

            <span className="dbr-value">
              {displayValue(bit.keywords)}
            </span>
          </div>

        </div>

      </section>


      {/* ========================================================
          CLASSIFICATION
      ======================================================== */}

      <section className="dbr-card">

        <div className="dbr-card-header">

          <div>
            <h2>
              Classification
            </h2>

            <p>
              Categories and other information associated
              with this bit.
            </p>
          </div>

        </div>


        <div className="dbr-list-section">

          <div className="dbr-list-label">
            Categories
          </div>

          <div className="dbr-list-content">
            {displayList(bit.categories)}
          </div>

        </div>


        <div className="dbr-list-section">

          <div className="dbr-list-label">
            Subjects
          </div>

          <div className="dbr-list-content">
            {displayList(bit.subjects)}
          </div>

        </div>


        <div className="dbr-list-section">

          <div className="dbr-list-label">
            Celebrities
          </div>

          <div className="dbr-list-content">
            {displayList(bit.celebrities)}
          </div>

        </div>


        <div className="dbr-list-section">

          <div className="dbr-list-label">
            Sports
          </div>

          <div className="dbr-list-content">
            {displayList(bit.sports)}
          </div>

        </div>


        <div className="dbr-list-section">

          <div className="dbr-list-label">
            Seasons
          </div>

          <div className="dbr-list-content">
            {displayList(bit.seasons)}
          </div>

        </div>

      </section>


      {/* ========================================================
          HYPERLINKS
      ======================================================== */}

      <section className="dbr-card">

        <div className="dbr-card-header">

          <div>
            <h2>
              Hyperlinks
            </h2>

            <p>
              External resources associated with this bit.
            </p>
          </div>

        </div>

        {Array.isArray(bit.hyperlinks) &&
        bit.hyperlinks.length > 0 ? (

          <div className="dbr-links">

            {bit.hyperlinks.map((link, index) => (

              <div
                className="dbr-link-row"
                key={index}
              >

                <div className="dbr-link-number">
                  {index + 1}
                </div>

                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dbr-link"
                >
                  {link}
                </a>

                <span className="dbr-external-icon">
                  ↗
                </span>

              </div>

            ))}

          </div>

        ) : (

          <div className="dbr-empty-section">
            No hyperlinks associated with this bit.
          </div>

        )}

      </section>


      {/* ========================================================
          ALBUMS
      ======================================================== */}

      <section className="dbr-card">

        <div className="dbr-card-header">

          <div>
            <h2>
              Albums
            </h2>

            <p>
              Albums and tracks associated with this bit.
            </p>
          </div>

        </div>

        {Array.isArray(bit.albums) &&
        bit.albums.length > 0 ? (

          <div className="dbr-albums">

            {bit.albums.map((item, index) => (

              <div
                className="dbr-album-row"
                key={index}
              >

                <div className="dbr-album-number">
                  {index + 1}
                </div>

                <div className="dbr-album-details">

                  <div className="dbr-album-field">

                    <span className="dbr-album-label">
                      Album
                    </span>

                    <span className="dbr-album-value">
                      {displayValue(item.album)}
                    </span>

                  </div>

                  <div className="dbr-album-field">

                    <span className="dbr-album-label">
                      Track
                    </span>

                    <span className="dbr-album-value">
                      {displayValue(item.track)}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="dbr-empty-section">
            No albums associated with this bit.
          </div>

        )}

      </section>


      {/* ========================================================
          BOTTOM BUTTON
      ======================================================== */}

      <div className="dbr-footer">

        <button
          type="button"
          className="dbr-button"
          onClick={() => navigate(-1)}
        >
          ← Back to Results
        </button>

      </div>

    </div>
  );
};

export default DetailedBitResults;
