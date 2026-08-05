import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./addBit.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditBit = () => {
  const locationState = useLocation().state || {};
  const searchBitID = locationState.bitID;
  const navigate = useNavigate();

  // ============================================================
  // BASIC BIT INFORMATION
  // ============================================================

  const [type, setType] = useState("Bit");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [autoNum, setAutoNum] = useState("");

  // ============================================================
  // SUBJECTS
  // ============================================================

  const [sub1, setSub1] = useState("");
  const [sub2, setSub2] = useState("");
  const [sub3, setSub3] = useState("");
  const [sub4, setSub4] = useState("");

  // ============================================================
  // CELEBRITIES
  // ============================================================

  const [celebrity1, setCelebrity1] = useState("");
  const [celebrity2, setCelebrity2] = useState("");

  // ============================================================
  // SPORT / SEASON / KEYWORDS
  // ============================================================

  const [sport, setSport] = useState("");
  const [season, setSeason] = useState("");
  const [keywords, setKeywords] = useState("");

  // ============================================================
  // UNLIMITED HYPERLINKS
  // ============================================================

  const [hyperlinks, setHyperlinks] = useState([""]);

  // ============================================================
  // UNLIMITED ALBUMS / TRACKS
  // ============================================================

  const [albums, setAlbums] = useState([
    {
      album: "",
      track: ""
    }
  ]);

  // ============================================================
  // LOOKUP LISTS
  // ============================================================

  const [celebList, setCelebList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sportList, setSportList] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [albumList, setAlbumList] = useState([]);

  const [loading, setLoading] = useState(true);

  // ============================================================
  // LOAD LOOKUP LISTS + BIT
  // ============================================================

  useEffect(() => {
    if (!searchBitID) {
      console.error("No BitID was provided to EditBit.");
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);

        const [
          bitRes,
          celebRes,
          subjectRes,
          artistRes,
          categoryRes,
          sportRes,
          seasonRes,
          albumRes
        ] = await Promise.all([
          Axios.get(`${API_URL}/api/get/bit/edit/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/celebrity`),
          Axios.get(`${API_URL}/api/get/subject`),
          Axios.get(`${API_URL}/api/get/artist`),
          Axios.get(`${API_URL}/api/get/category`),
          Axios.get(`${API_URL}/api/get/sport`),
          Axios.get(`${API_URL}/api/get/season`),
          Axios.get(`${API_URL}/api/get/album`)
        ]);

        const bit = bitRes.data;

        console.log("Loaded bit:", bit);

        // ======================================================
        // LOOKUP LISTS
        // ======================================================

        setCelebList(celebRes.data || []);
        setSubjectList(subjectRes.data || []);
        setArtistList(artistRes.data || []);
        setCategoryList(categoryRes.data || []);
        setSportList(sportRes.data || []);
        setSeasonList(seasonRes.data || []);
        setAlbumList(albumRes.data || []);

        // ======================================================
        // BASIC INFORMATION
        // ======================================================

        setType(bit.type || "Bit");
        setTitle(bit.title || "");
        setCategory(bit.category ? String(bit.category) : "");
        setArtist(bit.artist ? String(bit.artist) : "");
        setDate(bit.date || "");
        setTime(bit.time || "");
        setAutoNum(bit.autoNum || "");

        // ======================================================
        // SUBJECTS
        // ======================================================

        const subjects = Array.isArray(bit.subjects)
          ? bit.subjects
          : [];

        setSub1(subjects[0] ? String(subjects[0]) : "");
        setSub2(subjects[1] ? String(subjects[1]) : "");
        setSub3(subjects[2] ? String(subjects[2]) : "");
        setSub4(subjects[3] ? String(subjects[3]) : "");

        // ======================================================
        // CELEBRITIES
        // ======================================================

        setCelebrity1(
          bit.celebrity1 ? String(bit.celebrity1) : ""
        );

        setCelebrity2(
          bit.celebrity2 ? String(bit.celebrity2) : ""
        );

        // ======================================================
        // SPORT / SEASON / KEYWORDS
        // ======================================================

        setSport(bit.sport ? String(bit.sport) : "");
        setSeason(bit.season ? String(bit.season) : "");
        setKeywords(bit.keywords || "");

        // ======================================================
        // HYPERLINKS
        // ======================================================

        if (
          Array.isArray(bit.hyperlinks) &&
          bit.hyperlinks.length > 0
        ) {
          setHyperlinks(bit.hyperlinks);
        } else {
          setHyperlinks([""]);
        }

        // ======================================================
        // ALBUMS
        // ======================================================

        if (
          Array.isArray(bit.albums) &&
          bit.albums.length > 0
        ) {
          setAlbums(
            bit.albums.map((item) => ({
              album: item.album
                ? String(item.album)
                : "",
              track: item.track || ""
            }))
          );
        } else {
          setAlbums([
            {
              album: "",
              track: ""
            }
          ]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading bit:", error);

        if (error.response) {
          console.error(
            "Backend response:",
            error.response.data
          );
        }

        window.alert(
          "Unable to load the bit information. Check the browser console and backend."
        );

        setLoading(false);
      }
    };

    loadData();
  }, [searchBitID]);

  // ============================================================
  // HYPERLINK HELPERS
  // ============================================================

  const updateHyperlink = (index, value) => {
    const updated = [...hyperlinks];
    updated[index] = value;
    setHyperlinks(updated);
  };

  const addHyperlink = () => {
    setHyperlinks([
      ...hyperlinks,
      ""
    ]);
  };

  const removeHyperlink = (index) => {
    const updated = hyperlinks.filter(
      (_, i) => i !== index
    );

    if (updated.length === 0) {
      setHyperlinks([""]);
    } else {
      setHyperlinks(updated);
    }
  };

  // ============================================================
  // ALBUM HELPERS
  // ============================================================

  const updateAlbum = (index, field, value) => {
    const updated = [...albums];

    updated[index] = {
      ...updated[index],
      [field]: value
    };

    setAlbums(updated);
  };

  const addAlbum = () => {
    setAlbums([
      ...albums,
      {
        album: "",
        track: ""
      }
    ]);
  };

  const removeAlbum = (index) => {
    const updated = albums.filter(
      (_, i) => i !== index
    );

    if (updated.length === 0) {
      setAlbums([
        {
          album: "",
          track: ""
        }
      ]);
    } else {
      setAlbums(updated);
    }
  };

  // ============================================================
  // SUBJECT HELPER
  // ============================================================

  const updateSubject = (index, value) => {
    if (index === 0) setSub1(value);
    if (index === 1) setSub2(value);
    if (index === 2) setSub3(value);
    if (index === 3) setSub4(value);
  };

  // ============================================================
  // SUBMIT EDITS
  // ============================================================

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      const subjectValues = [
        sub1,
        sub2,
        sub3,
        sub4
      ].filter(Boolean);

      const cleanedHyperlinks = hyperlinks.filter(
        (link) =>
          link &&
          link.trim() !== ""
      );

      const cleanedAlbums = albums.filter(
        (item) =>
          item &&
          item.album
      );

      const payload = {
        bitID: searchBitID,

        type,
        title,
        category: category || null,
        artist: artist || null,
        date: date || null,
        time: time || null,
        autoNum: autoNum || null,

        subjects: subjectValues,

        celebrity1:
          celebrity1 || null,

        celebrity2:
          celebrity2 || null,

        sport: sport || null,
        season: season || null,

        keywords: keywords || "",

        hyperlinks: cleanedHyperlinks,

        albums: cleanedAlbums
      };

      console.log(
        "Updating bit with:",
        payload
      );

      const response = await Axios.post(
        `${API_URL}/api/update/bit`,
        payload
      );

      console.log(
        "Update response:",
        response.data
      );

      window.alert(
        "Bit updated successfully!"
      );
    } catch (error) {
      console.error(
        "Error updating bit:",
        error
      );

      let errorMessage =
        "Unknown error occurred.";

      if (error.response) {
        errorMessage =
          error.response.data?.error ||
          error.response.data?.message ||
          JSON.stringify(
            error.response.data
          );
      } else if (error.request) {
        errorMessage =
          "No response received from the server.";
      } else {
        errorMessage =
          error.message;
      }

      window.alert(
        `Failed to update bit:\n\n${errorMessage}`
      );
    }
  };

  // ============================================================
  // CANCEL
  // ============================================================

  const handleCancel = (e) => {
    e.preventDefault();

    navigate(-1);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center"
        }}
      >
        <h2>Loading bit information...</h2>
      </div>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <form className="add-bit-form">
      <div className="form-columns">

        {/* =====================================================
            GENERAL INFORMATION
        ====================================================== */}

        <div className="card">
          <h2>General Info</h2>

          <div className="form-row">
            <label>Title:</label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Media Title"
            />
          </div>

          <div className="form-row">
            <label>Type:</label>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
            >
              <option value="Bit">
                Bit
              </option>

              <option value="Segment">
                Segment
              </option>

              <option value="Video">
                Video
              </option>
            </select>
          </div>

          <div className="form-row">
            <label>Category:</label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="">
                -- Select Category --
              </option>

              {categoryList.map(
                (val) => (
                  <option
                    key={val.CatID}
                    value={val.CatID}
                  >
                    {val.Category}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-row">
            <label>Artist:</label>

            <select
              value={artist}
              onChange={(e) =>
                setArtist(e.target.value)
              }
            >
              <option value="">
                -- Select Artist --
              </option>

              {artistList.map(
                (val) => (
                  <option
                    key={val.ArtistID}
                    value={val.ArtistID}
                  >
                    {val.Name}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-row">
            <label>Air Date:</label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />
          </div>

          <div className="form-row">
            <label>Length:</label>

            <input
              type="text"
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
              placeholder="HH:MM:SS"
            />

            <label>
              Automation #:
            </label>

            <input
              type="text"
              value={autoNum}
              onChange={(e) =>
                setAutoNum(e.target.value)
              }
              placeholder="0123456789"
            />
          </div>

          {/* SUBJECTS */}

          <div className="form-row">
            <label>
              Subjects:
            </label>

            {[
              sub1,
              sub2,
              sub3,
              sub4
            ].map(
              (sub, index) => (
                <select
                  key={index}
                  value={sub}
                  onChange={(e) =>
                    updateSubject(
                      index,
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    -- Select Subject --
                  </option>

                  {subjectList.map(
                    (val) => (
                      <option
                        key={val.SubID}
                        value={val.SubID}
                      >
                        {val.Subject}
                      </option>
                    )
                  )}
                </select>
              )
            )}
          </div>

          {/* CELEBRITIES */}

          <div className="form-row">
            <label>
              Celebrities:
            </label>

            <select
              value={celebrity1}
              onChange={(e) =>
                setCelebrity1(
                  e.target.value
                )
              }
            >
              <option value="">
                -- Select Celebrity --
              </option>

              {celebList.map(
                (val) => (
                  <option
                    key={val.CelebID}
                    value={val.CelebID}
                  >
                    {val.Name}
                  </option>
                )
              )}
            </select>

            <select
              value={celebrity2}
              onChange={(e) =>
                setCelebrity2(
                  e.target.value
                )
              }
            >
              <option value="">
                -- Select Celebrity --
              </option>

              {celebList.map(
                (val) => (
                  <option
                    key={val.CelebID}
                    value={val.CelebID}
                  >
                    {val.Name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* SPORT / SEASON */}

          <div className="form-row">
            <label>
              Sport:
            </label>

            <select
              value={sport}
              onChange={(e) =>
                setSport(e.target.value)
              }
            >
              <option value="">
                -- Select Sport --
              </option>

              {sportList.map(
                (val) => (
                  <option
                    key={val.SportID}
                    value={val.SportID}
                  >
                    {val.Sport}
                  </option>
                )
              )}
            </select>

            <label>
              Season:
            </label>

            <select
              value={season}
              onChange={(e) =>
                setSeason(e.target.value)
              }
            >
              <option value="">
                -- Select Season --
              </option>

              {seasonList.map(
                (val) => (
                  <option
                    key={val.SeasonID}
                    value={val.SeasonID}
                  >
                    {val.Season}
                  </option>
                )
              )}
            </select>
          </div>

          {/* KEYWORDS */}

          <div className="form-row">
            <label>
              Keywords:
            </label>

            <input
              type="text"
              value={keywords}
              onChange={(e) =>
                setKeywords(
                  e.target.value
                )
              }
              placeholder="Enter keywords"
            />
          </div>
        </div>

        {/* =====================================================
            HYPERLINKS
        ====================================================== */}

        <div className="card">
          <h2>Hyperlinks</h2>

          {hyperlinks.map(
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
                  value={link}
                  onChange={(e) =>
                    updateHyperlink(
                      index,
                      e.target.value
                    )
                  }
                  placeholder="Enter link"
                />

                {hyperlinks.length >
                  1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      removeHyperlink(
                        index
                      )
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            )
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={addHyperlink}
          >
            + Add Hyperlink
          </button>
        </div>

        {/* =====================================================
            ALBUMS
        ====================================================== */}

        <div className="card">
          <h2>Albums</h2>

          {albums.map(
            (item, index) => (
              <div
                className="form-row"
                key={index}
              >
                <label>
                  Album {index + 1}:
                </label>

                <select
                  value={item.album}
                  onChange={(e) =>
                    updateAlbum(
                      index,
                      "album",
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    -- Select Album --
                  </option>

                  {albumList.map(
                    (val) => (
                      <option
                        key={val.AlbumID}
                        value={
                          val.AlbumID
                        }
                      >
                        {
                          val.Album_Name
                        }
                      </option>
                    )
                  )}
                </select>

                <label>
                  Track:
                </label>

                <input
                  type="text"
                  value={item.track}
                  onChange={(e) =>
                    updateAlbum(
                      index,
                      "track",
                      e.target.value
                    )
                  }
                  placeholder="Track #"
                />

                {albums.length >
                  1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      removeAlbum(
                        index
                      )
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            )
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={addAlbum}
          >
            + Add Album
          </button>
        </div>
      </div>

      {/* =======================================================
          BUTTONS
      ======================================================== */}

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleConfirm}
        >
          Confirm Edits
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCancel}
        >
          Cancel Edits
        </button>
      </div>
    </form>
  );
};

export default EditBit;

