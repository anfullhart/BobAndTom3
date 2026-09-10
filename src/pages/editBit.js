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
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [autoNum, setAutoNum] = useState("");

  // ============================================================
  // UNLIMITED CATEGORIES
  // ============================================================

  const [categories, setCategories] = useState([""]);

  // ============================================================
  // UNLIMITED SUBJECTS
  // ============================================================

  const [subjects, setSubjects] = useState([""]);

  // ============================================================
  // UNLIMITED CELEBRITIES
  // ============================================================

  const [celebrities, setCelebrities] = useState([""]);

  // ============================================================
  // UNLIMITED SPORTS
  // ============================================================

  const [sports, setSports] = useState([""]);

  // ============================================================
  // UNLIMITED SEASONS
  // ============================================================

  const [seasons, setSeasons] = useState([""]);

  // ============================================================
  // KEYWORDS
  // ============================================================

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
        setArtist(
          bit.artist !== undefined && bit.artist !== null
            ? String(bit.artist)
            : ""
        );
        setDate(bit.date || "");
        setTime(bit.time || "");
        setAutoNum(bit.autoNum || "");

        // ======================================================
        // CATEGORIES
        // ======================================================

        const loadedCategories = Array.isArray(bit.categories)
          ? bit.categories
          : bit.category
          ? [bit.category]
          : [];

        setCategories(
          loadedCategories.length > 0
            ? loadedCategories.map((id) => String(id))
            : [""]
        );

        // ======================================================
        // SUBJECTS
        // ======================================================

        const loadedSubjects = Array.isArray(bit.subjects)
          ? bit.subjects
          : [];

        setSubjects(
          loadedSubjects.length > 0
            ? loadedSubjects.map((id) => String(id))
            : [""]
        );

        // ======================================================
        // CELEBRITIES
        // ======================================================

        const loadedCelebrities = Array.isArray(bit.celebrities)
          ? bit.celebrities
          : [];

        setCelebrities(
          loadedCelebrities.length > 0
            ? loadedCelebrities.map((id) => String(id))
            : [""]
        );

        // ======================================================
        // SPORTS
        // ======================================================

        const loadedSports = Array.isArray(bit.sports)
          ? bit.sports
          : bit.sport
          ? [bit.sport]
          : [];

        setSports(
          loadedSports.length > 0
            ? loadedSports.map((id) => String(id))
            : [""]
        );

        // ======================================================
        // SEASONS
        // ======================================================

        const loadedSeasons = Array.isArray(bit.seasons)
          ? bit.seasons
          : bit.season
          ? [bit.season]
          : [];

        setSeasons(
          loadedSeasons.length > 0
            ? loadedSeasons.map((id) => String(id))
            : [""]
        );

        // ======================================================
        // KEYWORDS
        // ======================================================

        if (Array.isArray(bit.keywords)) {
          setKeywords(bit.keywords.join(", "));
        } else {
          setKeywords(bit.keywords || "");
        }

        // ======================================================
        // HYPERLINKS
        // ======================================================

        if (
          Array.isArray(bit.hyperlinks) &&
          bit.hyperlinks.length > 0
        ) {
          setHyperlinks(
            bit.hyperlinks.map((link) => String(link))
          );
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
              album:
                item.album !== undefined &&
                item.album !== null
                  ? String(item.album)
                  : "",
              track:
                item.track !== undefined &&
                item.track !== null
                  ? String(item.track)
                  : ""
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
  // CATEGORY HELPERS
  // ============================================================

  const updateCategory = (index, value) => {
    const updated = [...categories];
    updated[index] = value;
    setCategories(updated);
  };

  const addCategory = () => {
    setCategories([...categories, ""]);
  };

  const removeCategory = (index) => {
    const updated = categories.filter(
      (_, i) => i !== index
    );

    setCategories(
      updated.length > 0 ? updated : [""]
    );
  };

  // ============================================================
  // SUBJECT HELPERS
  // ============================================================

  const updateSubject = (index, value) => {
    const updated = [...subjects];
    updated[index] = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, ""]);
  };

  const removeSubject = (index) => {
    const updated = subjects.filter(
      (_, i) => i !== index
    );

    setSubjects(
      updated.length > 0 ? updated : [""]
    );
  };

  // ============================================================
  // CELEBRITY HELPERS
  // ============================================================

  const updateCelebrity = (index, value) => {
    const updated = [...celebrities];
    updated[index] = value;
    setCelebrities(updated);
  };

  const addCelebrity = () => {
    setCelebrities([...celebrities, ""]);
  };

  const removeCelebrity = (index) => {
    const updated = celebrities.filter(
      (_, i) => i !== index
    );

    setCelebrities(
      updated.length > 0 ? updated : [""]
    );
  };

  // ============================================================
  // SPORT HELPERS
  // ============================================================

  const updateSport = (index, value) => {
    const updated = [...sports];
    updated[index] = value;
    setSports(updated);
  };

  const addSport = () => {
    setSports([...sports, ""]);
  };

  const removeSport = (index) => {
    const updated = sports.filter(
      (_, i) => i !== index
    );

    setSports(
      updated.length > 0 ? updated : [""]
    );
  };

  // ============================================================
  // SEASON HELPERS
  // ============================================================

  const updateSeason = (index, value) => {
    const updated = [...seasons];
    updated[index] = value;
    setSeasons(updated);
  };

  const addSeason = () => {
    setSeasons([...seasons, ""]);
  };

  const removeSeason = (index) => {
    const updated = seasons.filter(
      (_, i) => i !== index
    );

    setSeasons(
      updated.length > 0 ? updated : [""]
    );
  };

  // ============================================================
  // HYPERLINK HELPERS
  // ============================================================

  const updateHyperlink = (index, value) => {
    const updated = [...hyperlinks];
    updated[index] = value;
    setHyperlinks(updated);
  };

  const addHyperlink = () => {
    setHyperlinks([...hyperlinks, ""]);
  };

  const removeHyperlink = (index) => {
    const updated = hyperlinks.filter(
      (_, i) => i !== index
    );

    setHyperlinks(
      updated.length > 0 ? updated : [""]
    );
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

    setAlbums(
      updated.length > 0
        ? updated
        : [
            {
              album: "",
              track: ""
            }
          ]
    );
  };

  // ============================================================
  // SUBMIT EDITS
  // ============================================================

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      // ========================================================
      // CLEAN ALL ARRAYS
      // ========================================================

      const cleanedCategories = [
        ...new Set(
          categories.filter(
            (value) =>
              value !== null &&
              value !== undefined &&
              String(value).trim() !== ""
          )
        )
      ];

      const cleanedSubjects = [
        ...new Set(
          subjects.filter(
            (value) =>
              value !== null &&
              value !== undefined &&
              String(value).trim() !== ""
          )
        )
      ];

      const cleanedCelebrities = [
        ...new Set(
          celebrities.filter(
            (value) =>
              value !== null &&
              value !== undefined &&
              String(value).trim() !== ""
          )
        )
      ];

      const cleanedSports = [
        ...new Set(
          sports.filter(
            (value) =>
              value !== null &&
              value !== undefined &&
              String(value).trim() !== ""
          )
        )
      ];

      const cleanedSeasons = [
        ...new Set(
          seasons.filter(
            (value) =>
              value !== null &&
              value !== undefined &&
              String(value).trim() !== ""
          )
        )
      ];

      const cleanedHyperlinks = hyperlinks
        .filter(
          (link) =>
            link &&
            String(link).trim() !== ""
        )
        .map((link) => String(link).trim());

      const cleanedAlbums = albums
        .filter(
          (item) =>
            item &&
            item.album !== null &&
            item.album !== undefined &&
            String(item.album).trim() !== ""
        )
        .map((item) => ({
          album: item.album,
          track: item.track || ""
        }));

      // ========================================================
      // PAYLOAD
      // ========================================================

      const payload = {
        bitID: searchBitID,

        type,
        title,

        artist: artist || null,

        date: date || null,
        time: time || null,
        autoNum: autoNum || null,

        // NEW UNLIMITED RELATIONSHIPS
        categories: cleanedCategories,
        subjects: cleanedSubjects,
        celebrities: cleanedCelebrities,
        sports: cleanedSports,
        seasons: cleanedSeasons,

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
        <h2>
          Loading bit information...
        </h2>
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

          {/* TITLE */}

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

          {/* TYPE */}

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

          {/* CATEGORIES */}

          <div className="form-row">
            <label>
              Categories:
            </label>

            <div style={{ width: "100%" }}>
              {categories.map(
                (category, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "8px"
                    }}
                  >
                    <select
                      value={category}
                      onChange={(e) =>
                        updateCategory(
                          index,
                          e.target.value
                        )
                      }
                      style={{
                        flex: 1
                      }}
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

                    {categories.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          removeCategory(index)
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
                onClick={addCategory}
              >
                + Add Category
              </button>
            </div>
          </div>

          {/* ARTIST */}

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

          {/* AIR DATE */}

          <div className="form-row">
            <label>
              Air Date:
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />
          </div>

          {/* LENGTH + AUTOMATION */}

          <div className="form-row">
            <label>
              Length:
            </label>

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

            <div style={{ width: "100%" }}>
              {subjects.map(
                (subject, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "8px"
                    }}
                  >
                    <select
                      value={subject}
                      onChange={(e) =>
                        updateSubject(
                          index,
                          e.target.value
                        )
                      }
                      style={{
                        flex: 1
                      }}
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

                    {subjects.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          removeSubject(index)
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
                onClick={addSubject}
              >
                + Add Subject
              </button>
            </div>
          </div>

          {/* CELEBRITIES */}

          <div className="form-row">
            <label>
              Celebrities:
            </label>

            <div style={{ width: "100%" }}>
              {celebrities.map(
                (celebrity, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "8px"
                    }}
                  >
                    <select
                      value={celebrity}
                      onChange={(e) =>
                        updateCelebrity(
                          index,
                          e.target.value
                        )
                      }
                      style={{
                        flex: 1
                      }}
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

                    {celebrities.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          removeCelebrity(index)
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
                onClick={addCelebrity}
              >
                + Add Celebrity
              </button>
            </div>
          </div>

          {/* SPORTS */}

          <div className="form-row">
            <label>
              Sports:
            </label>

            <div style={{ width: "100%" }}>
              {sports.map(
                (sport, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "8px"
                    }}
                  >
                    <select
                      value={sport}
                      onChange={(e) =>
                        updateSport(
                          index,
                          e.target.value
                        )
                      }
                      style={{
                        flex: 1
                      }}
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

                    {sports.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          removeSport(index)
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
                onClick={addSport}
              >
                + Add Sport
              </button>
            </div>
          </div>

          {/* SEASONS */}

          <div className="form-row">
            <label>
              Seasons:
            </label>

            <div style={{ width: "100%" }}>
              {seasons.map(
                (season, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "8px"
                    }}
                  >
                    <select
                      value={season}
                      onChange={(e) =>
                        updateSeason(
                          index,
                          e.target.value
                        )
                      }
                      style={{
                        flex: 1
                      }}
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

                    {seasons.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          removeSeason(index)
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
                onClick={addSeason}
              >
                + Add Season
              </button>
            </div>
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

                {hyperlinks.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      removeHyperlink(index)
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
                        value={val.AlbumID}
                      >
                        {val.Album_Name}
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

                {albums.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() =>
                      removeAlbum(index)
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

