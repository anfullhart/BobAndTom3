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

  // ===============================
  // General Form State
  // ===============================

  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [autoNum, setAutoNum] = useState("");

  const [sub1, setSub1] = useState("");
  const [sub2, setSub2] = useState("");
  const [sub3, setSub3] = useState("");
  const [sub4, setSub4] = useState("");

  const [celebrity1, setCelebrity1] = useState("");
  const [celebrity2, setCelebrity2] = useState("");

  const [sport, setSport] = useState("");
  const [season, setSeason] = useState("");

  const [keywords, setKeywords] = useState("");

  // ===============================
  // Unlimited Hyperlinks
  // ===============================

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

  // ===============================
  // Unlimited Albums / Tracks
  // ===============================

  const [albums, setAlbums] = useState([
    {
      album: "",
      track: "",
    },
  ]);

  const updateAlbum = (index, field, value) => {
    const updated = [...albums];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setAlbums(updated);
  };

  const addAlbum = () => {
    setAlbums([
      ...albums,
      {
        album: "",
        track: "",
      },
    ]);
  };

  const removeAlbum = (index) => {
    const updated = albums.filter((_, i) => i !== index);

    if (updated.length === 0) {
      setAlbums([
        {
          album: "",
          track: "",
        },
      ]);
    } else {
      setAlbums(updated);
    }
  };

  // ===============================
  // Dropdown Lists
  // ===============================

  const [celebList, setCelebList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sportList, setSportList] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [albumList, setAlbumList] = useState([]);

  // ===============================
  // Load Data
  // ===============================

  useEffect(() => {
    if (!searchBitID) return;

    const fetchData = async () => {
      try {
        const [
          bitRes,
          celebRes,
          subjectRes,
          artistRes,
          categoryRes,
          sportRes,
          seasonRes,
          albumRes,
          sportInfoRes,
        ] = await Promise.all([
          Axios.get(`${API_URL}/api/get/bit/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/celebrity`),
          Axios.get(`${API_URL}/api/get/subject`),
          Axios.get(`${API_URL}/api/get/artist`),
          Axios.get(`${API_URL}/api/get/category`),
          Axios.get(`${API_URL}/api/get/sport`),
          Axios.get(`${API_URL}/api/get/season`),
          Axios.get(`${API_URL}/api/get/album`),
          Axios.get(`${API_URL}/api/get/sport/info/${searchBitID}`),
        ]);

        // ===============================
        // Set Dropdown Lists
        // ===============================

        setCelebList(celebRes.data);
        setSubjectList(subjectRes.data);
        setArtistList(artistRes.data);
        setCategoryList(categoryRes.data);
        setSportList(sportRes.data);
        setSeasonList(seasonRes.data);
        setAlbumList(albumRes.data);

        // ===============================
        // Load Bit Information
        // ===============================

        if (bitRes.data && bitRes.data.length > 0) {
          const bit = bitRes.data[0];

          setType(bit.Type || "");
          setTitle(bit.Title || "");
          setCategory(bit.Category || "");
          setArtist(bit.Artist || "");
          setDate(bit.AirDate || "");
          setTime(bit.Time || "");
          setAutoNum(bit.ProphetNum || "");

          setSub1(bit.Sub1 || "");
          setSub2(bit.Sub2 || "");
          setSub3(bit.Sub3 || "");
          setSub4(bit.Sub4 || "");

          setCelebrity1(bit.Celebrity1 || "");
          setCelebrity2(bit.Celebrity2 || "");

          // Sport endpoint
          if (sportInfoRes.data) {
            if (Array.isArray(sportInfoRes.data)) {
              setSport(
                sportInfoRes.data.length > 0
                  ? sportInfoRes.data[0]
                  : ""
              );
            } else {
              setSport(sportInfoRes.data);
            }
          }

          setSeason(bit.Season || "");
          setKeywords(bit.Keywords || "");

          // ===============================
          // Hyperlinks
          // ===============================

          if (
            Array.isArray(bit.Hyperlinks) &&
            bit.Hyperlinks.length > 0
          ) {
            setHyperlinks(
              bit.Hyperlinks.map((link) => {
                if (typeof link === "string") {
                  return link;
                }

                return (
                  link.Hyperlink ||
                  link.Link ||
                  link.URL ||
                  ""
                );
              })
            );
          } else if (bit.Hyperlink) {
            // Backwards compatibility with old single hyperlink
            setHyperlinks([bit.Hyperlink]);
          } else {
            setHyperlinks([""]);
          }

          // ===============================
          // Albums
          // ===============================

          if (
            Array.isArray(bit.Albums) &&
            bit.Albums.length > 0
          ) {
            setAlbums(
              bit.Albums.map((item) => ({
                album:
                  item.album ||
                  item.AlbumID ||
                  item.Album ||
                  "",
                track:
                  item.track ||
                  item.Track ||
                  "",
              }))
            );
          } else {
            // Backwards compatibility with old Album1-4 fields
            const oldAlbums = [
              {
                album: bit.Album1 || "",
                track: bit.Track1 || "",
              },
              {
                album: bit.Album2 || "",
                track: bit.Track2 || "",
              },
              {
                album: bit.Album3 || "",
                track: bit.Track3 || "",
              },
              {
                album: bit.Album4 || "",
                track: bit.Track4 || "",
              },
            ].filter((item) => item.album || item.track);

            if (oldAlbums.length > 0) {
              setAlbums(oldAlbums);
            } else {
              setAlbums([
                {
                  album: "",
                  track: "",
                },
              ]);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Failed to load bit information.");
      }
    };

    fetchData();
  }, [searchBitID]);

  // ===============================
  // Submit Changes
  // ===============================

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      const cleanedHyperlinks = hyperlinks.filter(
        (link) => link && link.trim() !== ""
      );

      const cleanedAlbums = albums.filter(
        (item) => item.album && item.album !== ""
      );

      const response = await Axios.post(
        `${API_URL}/api/update/bit`,
        {
          bitID: searchBitID,

          type,
          title,
          category: category || null,
          artist: artist || null,
          date,
          time,
          autoNum,

          sub1: sub1 || null,
          sub2: sub2 || null,
          sub3: sub3 || null,
          sub4: sub4 || null,

          celebrity1: celebrity1 || null,
          celebrity2: celebrity2 || null,

          sport: sport || null,
          season: season || null,

          keywords,

          // Unlimited hyperlinks
          hyperlinks: cleanedHyperlinks,

          // Unlimited albums/tracks
          albums: cleanedAlbums,
        }
      );

      if (response.status === 200) {
        alert("Bit updated successfully!");
      }
    } catch (err) {
      console.error("Error updating bit:", err);

      let errorMessage = "Unknown error occurred.";

      if (err.response) {
        errorMessage =
          err.response.data?.error ||
          err.response.data?.message ||
          JSON.stringify(err.response.data);
      } else if (err.request) {
        errorMessage = "No response received from the server.";
      } else {
        errorMessage = err.message;
      }

      alert(`Failed to update bit:\n\n${errorMessage}`);
    }
  };

  // ===============================
  // Cancel
  // ===============================

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // ===============================
  // Clear Form
  // ===============================

  const handleClear = () => {
    setType("");
    setTitle("");
    setCategory("");
    setArtist("");
    setDate("");
    setTime("");
    setAutoNum("");

    setSub1("");
    setSub2("");
    setSub3("");
    setSub4("");

    setCelebrity1("");
    setCelebrity2("");

    setSport("");
    setSeason("");

    setKeywords("");

    setHyperlinks([""]);

    setAlbums([
      {
        album: "",
        track: "",
      },
    ]);
  };

  // ===============================
  // JSX
  // ===============================

  return (
    <form className="add-bit-form" onSubmit={handleConfirm}>
      <div className="form-columns">

        {/* ===============================
            GENERAL INFO
        =============================== */}

        <div className="card">
          <h2>General Info</h2>

          <div className="form-row">
            <label>Title:</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Media Title"
            />
          </div>

          <div className="form-row">
            <label>Type:</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">-- Select Type --</option>
              <option value="Bit">Bit</option>
              <option value="Segment">Segment</option>
              <option value="Video">Video</option>
            </select>
          </div>

          <div className="form-row">
            <label>Category:</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

          <div className="form-row">
            <label>Artist:</label>

            <select
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
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

          <div className="form-row">
            <label>Air Date:</label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Length:</label>

            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="HH:MM:SS"
            />

            <label>Automation #:</label>

            <input
              type="text"
              value={autoNum}
              onChange={(e) => setAutoNum(e.target.value)}
              placeholder="0123456789"
            />
          </div>

          {/* Subjects */}

          <div className="form-row">
            <label>Subjects:</label>

            <select
              value={sub1}
              onChange={(e) => setSub1(e.target.value)}
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

            <select
              value={sub2}
              onChange={(e) => setSub2(e.target.value)}
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

            <select
              value={sub3}
              onChange={(e) => setSub3(e.target.value)}
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

            <select
              value={sub4}
              onChange={(e) => setSub4(e.target.value)}
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
          </div>

          {/* Celebrities */}

          <div className="form-row">
            <label>Celebrities:</label>

            <select
              value={celebrity1}
              onChange={(e) =>
                setCelebrity1(e.target.value)
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

            <select
              value={celebrity2}
              onChange={(e) =>
                setCelebrity2(e.target.value)
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
          </div>

          {/* Sport / Season */}

          <div className="form-row">
            <label>Sport:</label>

            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
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
              onChange={(e) => setSeason(e.target.value)}
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

          {/* Keywords */}

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

        {/* ===============================
            HYPERLINKS
        =============================== */}

        <div className="card">
          <h2>Hyperlinks</h2>

          {hyperlinks.map((link, index) => (
            <div className="form-row" key={index}>
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

        {/* ===============================
            ALBUMS
        =============================== */}

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

              <label>Track:</label>

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

      {/* ===============================
          BUTTONS
      =============================== */}

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-success"
        >
          Confirm Edits
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleClear}
        >
          Clear
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBit;