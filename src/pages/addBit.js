import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./addBit.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const AddBit = () => {
  // ============================================================
  // MAIN BIT INFORMATION
  // ============================================================

  const [type, setType] = useState("Bit");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [autoNum, setAutoNum] = useState("");

  const [sport, setSport] = useState("");
  const [season, setSeason] = useState("");

  const [keywords, setKeywords] = useState("");

  // ============================================================
  // MULTIPLE SUBJECTS
  // ============================================================

  const [subjects, setSubjects] = useState([""]);

  const updateSubject = (index, value) => {
    const updated = [...subjects];
    updated[index] = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([...subjects, ""]);
  };

  const removeSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);

    if (updated.length === 0) {
      setSubjects([""]);
    } else {
      setSubjects(updated);
    }
  };

  // ============================================================
  // MULTIPLE CELEBRITIES
  // ============================================================

  const [celebrities, setCelebrities] = useState([""]);

  const updateCelebrity = (index, value) => {
    const updated = [...celebrities];
    updated[index] = value;
    setCelebrities(updated);
  };

  const addCelebrity = () => {
    setCelebrities([...celebrities, ""]);
  };

  const removeCelebrity = (index) => {
    const updated = celebrities.filter((_, i) => i !== index);

    if (updated.length === 0) {
      setCelebrities([""]);
    } else {
      setCelebrities(updated);
    }
  };

  // ============================================================
  // MULTIPLE HYPERLINKS
  // ============================================================

  const [hyperlinks, setHyperlinks] = useState([""]);

  const updateHyperlink = (index, value) => {
    const updated = [...hyperlinks];
    updated[index] = value;
    setHyperlinks(updated);
  };

  const addHyperlink = () => {
    setHyperlinks([...hyperlinks, ""]);
  };

  const removeHyperlink = (index) => {
    const updated = hyperlinks.filter((_, i) => i !== index);

    if (updated.length === 0) {
      setHyperlinks([""]);
    } else {
      setHyperlinks(updated);
    }
  };

  // ============================================================
  // MULTIPLE ALBUMS
  // ============================================================

  const [albums, setAlbums] = useState([
    {
      album: "",
      track: ""
    }
  ]);

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
    const updated = albums.filter((_, i) => i !== index);

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
  // LOOKUP LISTS
  // ============================================================

  const [celebList, setCelebList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sportList, setSportList] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [albumList, setAlbumList] = useState([]);

  // ============================================================
  // LOAD LOOKUP DATA
  // ============================================================

  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [
          celebResponse,
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

        setCelebList(celebResponse.data);
        setSubjectList(subjectResponse.data);
        setArtistList(artistResponse.data);
        setCategoryList(categoryResponse.data);
        setSportList(sportResponse.data);
        setSeasonList(seasonResponse.data);
        setAlbumList(albumResponse.data);
      } catch (error) {
        console.error("Error loading lookup data:", error);

        window.alert(
          "There was a problem loading the dropdown lists."
        );
      }
    };

    loadLookups();
  }, []);

  // ============================================================
  // RESET FORM
  // ============================================================

  const clearForm = () => {
    setType("Bit");
    setTitle("");
    setCategory("");
    setArtist("");
    setDate("");
    setTime("");
    setAutoNum("");

    setSubjects([""]);
    setCelebrities([""]);

    setSport("");
    setSeason("");

    setKeywords("");

    setHyperlinks([""]);

    setAlbums([
      {
        album: "",
        track: ""
      }
    ]);
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const submitMedia = async () => {
    try {
      // ----------------------------------------------------------
      // Clean subjects
      // ----------------------------------------------------------

      const cleanSubjects = subjects.filter(
        (subject) =>
          subject !== null &&
          subject !== undefined &&
          subject !== ""
      );

      // ----------------------------------------------------------
      // Clean celebrities
      // ----------------------------------------------------------

      const cleanCelebrities = celebrities.filter(
        (celebrity) =>
          celebrity !== null &&
          celebrity !== undefined &&
          celebrity !== ""
      );

      // ----------------------------------------------------------
      // Clean hyperlinks
      // ----------------------------------------------------------

      const cleanHyperlinks = hyperlinks
        .filter(
          (link) =>
            link &&
            link.trim() !== ""
        )
        .map((link) => link.trim());

      // ----------------------------------------------------------
      // Clean albums
      // ----------------------------------------------------------

      const cleanAlbums = albums
        .filter(
          (album) =>
            album &&
            album.album !== null &&
            album.album !== undefined &&
            album.album !== ""
        )
        .map((album) => ({
          album: album.album,
          track: album.track || ""
        }));

      // ----------------------------------------------------------
      // Show what we're sending
      // ----------------------------------------------------------

      console.log("=================================");
      console.log("SUBMITTING BIT");
      console.log("=================================");

      console.log("Type:", type);
      console.log("Title:", title);
      console.log("Category:", category);
      console.log("Artist:", artist);
      console.log("Air Date:", date);
      console.log("Time:", time);
      console.log("Automation #:", autoNum);

      console.log("Subjects:", cleanSubjects);
      console.log("Celebrities:", cleanCelebrities);

      console.log("Sport:", sport);
      console.log("Season:", season);

      console.log("Keywords:", keywords);

      console.log("Hyperlinks:", cleanHyperlinks);
      console.log("Albums:", cleanAlbums);

      // ----------------------------------------------------------
      // Send to backend
      // ----------------------------------------------------------

      const response = await Axios.post(
        `${API_URL}/api/insert/bit`,
        {
          type,
          title,

          category: category || null,
          artist: artist || null,

          date: date || null,
          time: time || null,
          autoNum: autoNum || null,

          // Unlimited subjects
          subjects: cleanSubjects,

          // Unlimited celebrities
          // Backend puts each one into Celeb1_ID
          celebrities: cleanCelebrities,

          sport: sport || null,
          season: season || null,

          keywords: keywords || null,

          // Unlimited hyperlinks
          hyperlinks: cleanHyperlinks,

          // Unlimited albums
          albums: cleanAlbums
        }
      );

      // ----------------------------------------------------------
      // SUCCESS
      // ----------------------------------------------------------

      if (response.status === 200) {
        console.log(
          "Bit successfully inserted:",
          response.data
        );

        window.alert(
          `Bit added successfully!\n\nBit ID: ${response.data.bitID}`
        );

        clearForm();
      }

    } catch (error) {

      console.error("=================================");
      console.error("ERROR ADDING BIT");
      console.error("=================================");
      console.error(error);

      let errorMessage = "Unknown error occurred.";

      if (error.response) {
        errorMessage =
          error.response.data?.error ||
          error.response.data?.message ||
          error.response.data?.details ||
          JSON.stringify(error.response.data);
      } else if (error.request) {
        errorMessage =
          "No response received from the server.";
      } else {
        errorMessage = error.message;
      }

      window.alert(
        `Failed to add bit:\n\n${errorMessage}`
      );
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <form
      className="add-bit-form"
      onSubmit={(e) => {
        e.preventDefault();
        submitMedia();
      }}
    >

      <div className="form-columns">

        {/* =====================================================
            GENERAL INFO
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


          {/* CATEGORY */}

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

              {categoryList.map((val) => (
                <option
                  key={val.CatID}
                  value={val.CatID}
                >
                  {val.Category}
                </option>
              ))}
            </select>
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


          {/* AIR DATE */}

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


          {/* LENGTH / AUTOMATION */}

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

            <label>Automation #:</label>

            <input
              type="text"
              value={autoNum}
              onChange={(e) =>
                setAutoNum(e.target.value)
              }
              placeholder="0123456789"
            />

          </div>


          {/* =================================================
              SUBJECTS
          ================================================== */}

          <div className="form-row">

            <label>Subjects:</label>

            <div className="dynamic-field-container">

              {subjects.map((subject, index) => (

                <div
                  className="dynamic-field"
                  key={index}
                >

                  <select
                    value={subject}
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

                    {subjectList.map((val) => (

                      <option
                        key={val.SubID}
                        value={val.SubID}
                      >
                        {val.Subject}
                      </option>

                    ))}

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

              ))}

              <button
                type="button"
                className="btn btn-primary"
                onClick={addSubject}
              >
                + Add Subject
              </button>

            </div>

          </div>


          {/* =================================================
              CELEBRITIES
          ================================================== */}

          <div className="form-row">

            <label>Celebrities:</label>

            <div className="dynamic-field-container">

              {celebrities.map((celebrity, index) => (

                <div
                  className="dynamic-field"
                  key={index}
                >

                  <select
                    value={celebrity}
                    onChange={(e) =>
                      updateCelebrity(
                        index,
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      -- Select Celebrity --
                    </option>

                    {celebList.map((val) => (

                      <option
                        key={val.CelebID}
                        value={val.CelebID}
                      >
                        {val.Name}
                      </option>

                    ))}

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

              ))}

              <button
                type="button"
                className="btn btn-primary"
                onClick={addCelebrity}
              >
                + Add Celebrity
              </button>

            </div>

          </div>


          {/* =================================================
              SPORT / SEASON
          ================================================== */}

          <div className="form-row">

            <label>Sport:</label>

            <select
              value={sport}
              onChange={(e) =>
                setSport(e.target.value)
              }
            >

              <option value="">
                -- Select Sport --
              </option>

              {sportList.map((val) => (

                <option
                  key={val.SportID}
                  value={val.SportID}
                >
                  {val.Sport}
                </option>

              ))}

            </select>


            <label>Season:</label>

            <select
              value={season}
              onChange={(e) =>
                setSeason(e.target.value)
              }
            >

              <option value="">
                -- Select Season --
              </option>

              {seasonList.map((val) => (

                <option
                  key={val.SeasonID}
                  value={val.SeasonID}
                >
                  {val.Season}
                </option>

              ))}

            </select>

          </div>


          {/* KEYWORDS */}

          <div className="form-row">

            <label>Keywords:</label>

            <input
              type="text"
              value={keywords}
              onChange={(e) =>
                setKeywords(e.target.value)
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

          {hyperlinks.map((link, index) => (

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

          ))}

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

          {albums.map((item, index) => (

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

                {albumList.map((val) => (

                  <option
                    key={val.AlbumID}
                    value={val.AlbumID}
                  >
                    {val.Album_Name}
                  </option>

                ))}

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

          ))}


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
          FORM ACTIONS
      ======================================================== */}

      <div className="form-actions">

        <button
          type="submit"
          className="btn btn-success"
        >
          Submit
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={clearForm}
        >
          Clear
        </button>

      </div>

    </form>
  );
};

export default AddBit;
