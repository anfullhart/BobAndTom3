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
  const [errorMessage, setErrorMessage] = useState("");

  // Lookup tables
  const [celebrities, setCelebrities] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [artists, setArtists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sports, setSports] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [albums, setAlbums] = useState([]);

  // ============================================================
  // LOAD LOOKUP TABLES
  // ============================================================

  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [
          celebrityResponse,
          subjectResponse,
          artistResponse,
          categoryResponse,
          sportResponse,
          seasonResponse,
          albumResponse
        ] = await Promise.all([
          Axios.get(`${API_URL}/api/get/celebrity`),
          Axios.get(`${API_URL}/api/get/subject`),
          Axios.get(`${API_URL}/api/get/artist`),
          Axios.get(`${API_URL}/api/get/category`),
          Axios.get(`${API_URL}/api/get/sport`),
          Axios.get(`${API_URL}/api/get/season`),
          Axios.get(`${API_URL}/api/get/album`)
        ]);

        setCelebrities(
          Array.isArray(celebrityResponse.data)
            ? celebrityResponse.data
            : []
        );

        setSubjects(
          Array.isArray(subjectResponse.data)
            ? subjectResponse.data
            : []
        );

        setArtists(
          Array.isArray(artistResponse.data)
            ? artistResponse.data
            : []
        );

        setCategories(
          Array.isArray(categoryResponse.data)
            ? categoryResponse.data
            : []
        );

        setSports(
          Array.isArray(sportResponse.data)
            ? sportResponse.data
            : []
        );

        setSeasons(
          Array.isArray(seasonResponse.data)
            ? seasonResponse.data
            : []
        );

        setAlbums(
          Array.isArray(albumResponse.data)
            ? albumResponse.data
            : []
        );

      } catch (error) {
        console.error(
          "Error loading lookup tables:",
          error
        );
      }
    };

    loadLookups();
  }, []);

  // ============================================================
  // LOAD BIT
  // ============================================================

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

        console.log(
          "Loading bit:",
          `${API_URL}/api/get/bit/edit/${searchBitID}`
        );

        const response = await Axios.get(
          `${API_URL}/api/get/bit/edit/${searchBitID}`
        );

        console.log(
          "Detailed bit data:",
          response.data
        );

        setBit(response.data);

      } catch (error) {
        console.error(
          "Error loading bit details:",
          error
        );

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
  // HELPER FUNCTIONS
  // ============================================================

  const getCelebrityName = (id) => {
    const found = celebrities.find(
      (item) =>
        String(item.CelebID) === String(id)
    );

    return found?.Name || id;
  };

  const getSubjectName = (id) => {
    const found = subjects.find(
      (item) =>
        String(item.SubID) === String(id)
    );

    return found?.Subject || id;
  };

  const getArtistName = (id) => {
    const found = artists.find(
      (item) =>
        String(item.ArtistID) === String(id)
    );

    return found?.Name || id;
  };

  const getCategoryName = (id) => {
    const found = categories.find(
      (item) =>
        String(item.CatID) === String(id)
    );

    return found?.Category || id;
  };

  const getSportName = (id) => {
    const found = sports.find(
      (item) =>
        String(item.SportID) === String(id)
    );

    return found?.Sport || id;
  };

  const getSeasonName = (id) => {
    const found = seasons.find(
      (item) =>
        String(item.SeasonID) === String(id)
    );

    return found?.Season || id;
  };

  const getAlbumName = (id) => {
    const found = albums.find(
      (item) =>
        String(item.AlbumID) === String(id)
    );

    return found?.Album_Name || id;
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
  // NO BIT ID
  // ============================================================

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

  // ============================================================
  // BIT FAILED TO LOAD
  // ============================================================

  if (!bit) {
    return (
      <div
        style={{
          padding: "40px",
          color: "white",
          textAlign: "center"
        }}
      >
        <h2>
          {errorMessage ||
            "Unable to load bit information."}
        </h2>

        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="add-bit-form">

      <div className="form-columns">

        {/* ======================================================
            GENERAL INFORMATION
        ======================================================= */}

        <div className="card">

          <h2>General Info</h2>

          {/* BIT ID */}

          <div className="form-row">
            <label>Bit ID:</label>

            <input
              type="text"
              value={bit.bitID || searchBitID}
              readOnly
            />
          </div>

          {/* TITLE */}

          <div className="form-row">
            <label>Title:</label>

            <input
              type="text"
              value={bit.title || ""}
              readOnly
            />
          </div>

          {/* TYPE */}

          <div className="form-row">
            <label>Type:</label>

            <input
              type="text"
              value={bit.type || ""}
              readOnly
            />
          </div>

          {/* CATEGORIES */}

          <div className="form-row">

            <label>Categories:</label>

            <div
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                minHeight: "38px"
              }}
            >

              {Array.isArray(bit.categories) &&
              bit.categories.length > 0 ? (

                bit.categories.map(
                  (categoryID, index) => (

                    <div key={index}>
                      {getCategoryName(categoryID)}
                    </div>

                  )
                )

              ) : (

                <div>None</div>

              )}

            </div>

          </div>

          {/* ARTIST */}

          <div className="form-row">

            <label>Artist:</label>

            <input
              type="text"
              value={getArtistName(bit.artist)}
              readOnly
            />

          </div>

          {/* AIR DATE */}

          <div className="form-row">

            <label>Air Date:</label>

            <input
              type="text"
              value={bit.date || ""}
              readOnly
            />

          </div>

          {/* LENGTH */}

          <div className="form-row">

            <label>Length:</label>

            <input
              type="text"
              value={bit.time || ""}
              readOnly
            />

          </div>

          {/* AUTOMATION NUMBER */}

          <div className="form-row">

            <label>Automation #:</label>

            <input
              type="text"
              value={bit.autoNum || ""}
              readOnly
            />

          </div>

          {/* ====================================================
              SUBJECTS
          ===================================================== */}

          <div className="form-row">

            <label>Subjects:</label>

            <div
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                minHeight: "38px"
              }}
            >

              {Array.isArray(bit.subjects) &&
              bit.subjects.length > 0 ? (

                bit.subjects.map(
                  (subjectID, index) => (

                    <div key={index}>
                      {getSubjectName(subjectID)}
                    </div>

                  )
                )

              ) : (

                <div>None</div>

              )}

            </div>

          </div>

          {/* ====================================================
              CELEBRITIES
          ===================================================== */}

          <div className="form-row">

            <label>Celebrities:</label>

            <div
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                minHeight: "38px"
              }}
            >

              {Array.isArray(bit.celebrities) &&
              bit.celebrities.length > 0 ? (

                bit.celebrities.map(
                  (celebrityID, index) => (

                    <div key={index}>
                      {getCelebrityName(celebrityID)}
                    </div>

                  )
                )

              ) : (

                <div>None</div>

              )}

            </div>

          </div>

          {/* ====================================================
              SPORTS
          ===================================================== */}

          <div className="form-row">

            <label>Sports:</label>

            <div
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                minHeight: "38px"
              }}
            >

              {Array.isArray(bit.sports) &&
              bit.sports.length > 0 ? (

                bit.sports.map(
                  (sportID, index) => (

                    <div key={index}>
                      {getSportName(sportID)}
                    </div>

                  )
                )

              ) : (

                <div>None</div>

              )}

            </div>

          </div>

          {/* ====================================================
              SEASONS
          ===================================================== */}

          <div className="form-row">

            <label>Seasons:</label>

            <div
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                minHeight: "38px"
              }}
            >

              {Array.isArray(bit.seasons) &&
              bit.seasons.length > 0 ? (

                bit.seasons.map(
                  (seasonID, index) => (

                    <div key={index}>
                      {getSeasonName(seasonID)}
                    </div>

                  )
                )

              ) : (

                <div>None</div>

              )}

            </div>

          </div>

          {/* ====================================================
              KEYWORDS
          ===================================================== */}

          <div className="form-row">

            <label>Keywords:</label>

            <input
              type="text"
              value={bit.keywords || ""}
              readOnly
            />

          </div>

        </div>

        {/* ======================================================
            HYPERLINKS
        ======================================================= */}

        <div className="card">

          <h2>Hyperlinks</h2>

          {Array.isArray(bit.hyperlinks) &&
          bit.hyperlinks.length > 0 ? (

            bit.hyperlinks.map(
              (link, index) => (

                <div
                  className="form-row"
                  key={index}
                >

                  <label>
                    Link {index + 1}:
                  </label>

                  <input
                    type="text"
                    value={link || ""}
                    readOnly
                  />

                </div>

              )

          ) : (

            <p>No hyperlinks.</p>

          )}

        </div>

        {/* ======================================================
            ALBUMS
        ======================================================= */}

        <div className="card">

          <h2>Albums</h2>

          {Array.isArray(bit.albums) &&
          bit.albums.length > 0 ? (

            bit.albums.map(
              (item, index) => (

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
                      getAlbumName(item.album)
                    }
                    readOnly
                  />

                  <label>
                    Track:
                  </label>

                  <input
                    type="text"
                    value={
                      item.track || ""
                    }
                    readOnly
                  />

                </div>

              )

          ) : (

            <p>No albums.</p>

          )}

        </div>

      </div>

      {/* ========================================================
          BACK BUTTON
      ========================================================= */}

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
