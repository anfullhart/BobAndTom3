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

    const url =
      `${API_URL}/api/get/bit/full/${searchBitID}`;

    console.log("Loading complete bit:", url);

    const response = await Axios.get(url);

    console.log(
      "Complete bit data:",
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
    <h2>
      Loading bit information...
    </h2>
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
      color: "white",
      textAlign: "center"
    }}
  >

    <h2>
      No Bit ID was provided.
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
// ERROR
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
// HELPER FOR LISTS
// ============================================================

const displayList = (items) => {

if (!Array.isArray(items) || items.length === 0) {
  return (
    <div>
      None
    </div>
  );
}

return items.map((item, index) => (
  <div key={index}>
    {item}
  </div>
));

};

return (

<div className="add-bit-form">

  <div className="form-columns">


    {/* ======================================================
        GENERAL INFORMATION
    ====================================================== */}

    <div className="card">

      <h2>
        Bit Information
      </h2>


      <div className="form-row">

        <label>
          Bit ID:
        </label>

        <input
          type="text"
          value={bit.bitID || ""}
          readOnly
        />

      </div>


      <div className="form-row">

        <label>
          Title:
        </label>

        <input
          type="text"
          value={bit.title || ""}
          readOnly
        />

      </div>


      <div className="form-row">

        <label>
          Type:
        </label>

        <input
          type="text"
          value={bit.type || ""}
          readOnly
        />

      </div>


      {/* ====================================================
          ARTIST NAME
      ==================================================== */}

      <div className="form-row">

        <label>
          Artist:
        </label>

        <input
          type="text"
          value={bit.artist || "None"}
          readOnly
        />

      </div>


      {/* ====================================================
          CATEGORIES
      ==================================================== */}

      <div className="form-row">

        <label>
          Categories:
        </label>

        <div
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            minHeight: "38px"
          }}
        >
          {displayList(bit.categories)}
        </div>

      </div>


      {/* ====================================================
          AIR DATE
      ==================================================== */}

      <div className="form-row">

        <label>
          Air Date:
        </label>

        <input
          type="text"
          value={bit.date || ""}
          readOnly
        />

      </div>


      {/* ====================================================
          LENGTH
      ==================================================== */}

      <div className="form-row">

        <label>
          Length:
        </label>

        <input
          type="text"
          value={bit.time || ""}
          readOnly
        />

      </div>


      {/* ====================================================
          AUTOMATION NUMBER
      ==================================================== */}

      <div className="form-row">

        <label>
          Automation #:
        </label>

        <input
          type="text"
          value={bit.autoNum || ""}
          readOnly
        />

      </div>


      {/* ====================================================
          SUBJECTS
      ==================================================== */}

      <div className="form-row">

        <label>
          Subjects:
        </label>

        <div
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            minHeight: "38px"
          }}
        >
          {displayList(bit.subjects)}
        </div>

      </div>


      {/* ====================================================
          CELEBRITIES
      ==================================================== */}

      <div className="form-row">

        <label>
          Celebrities:
        </label>

        <div
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            minHeight: "38px"
          }}
        >
          {displayList(bit.celebrities)}
        </div>

      </div>


      {/* ====================================================
          SPORTS
      ==================================================== */}

      <div className="form-row">

        <label>
          Sports:
        </label>

        <div
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            minHeight: "38px"
          }}
        >
          {displayList(bit.sports)}
        </div>

      </div>


      {/* ====================================================
          SEASONS
      ==================================================== */}

      <div className="form-row">

        <label>
          Seasons:
        </label>

        <div
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            minHeight: "38px"
          }}
        >
          {displayList(bit.seasons)}
        </div>

      </div>


      {/* ====================================================
          KEYWORDS
      ==================================================== */}

      <div className="form-row">

        <label>
          Keywords:
        </label>

        <input
          type="text"
          value={bit.keywords || "None"}
          readOnly
        />

      </div>

    </div>


    {/* ======================================================
        HYPERLINKS
    ====================================================== */}

    <div className="card">

      <h2>
        Hyperlinks
      </h2>

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
              value={link || ""}
              readOnly
            />

          </div>

        ))

      ) : (

        <p>
          No hyperlinks.
        </p>

      )}

    </div>


    {/* ======================================================
        ALBUMS
    ====================================================== */}

    <div className="card">

      <h2>
        Albums
      </h2>

      {Array.isArray(bit.albums) &&
      bit.albums.length > 0 ? (

        bit.albums.map((item, index) => (

          <div
            key={index}
            style={{
              marginBottom: "20px",
              paddingBottom: "15px",
              borderBottom:
                index !== bit.albums.length - 1
                  ? "1px solid #444"
                  : "none"
            }}
          >

            <div className="form-row">

              <label>
                Album {index + 1}:
              </label>

              <input
                type="text"
                value={item.album || ""}
                readOnly
              />

            </div>


            <div className="form-row">

              <label>
                Track:
              </label>

              <input
                type="text"
                value={item.track || ""}
                readOnly
              />

            </div>

          </div>

        ))

      ) : (

        <p>
          No albums.
        </p>

      )}

    </div>


  </div>


  {/* ========================================================
      BACK BUTTON
  ======================================================== */}

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
