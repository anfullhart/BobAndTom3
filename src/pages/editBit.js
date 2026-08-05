import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditBit = () => {
  const locationState = useLocation().state || {};
  const searchBitID = locationState.bitID;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    category: "",
    artist: "",
    date: "",
    time: "",
    autoNum: "",

    sub1: "",
    sub2: "",
    sub3: "",
    sub4: "",

    celebrity1: "",
    celebrity2: "",

    sport: "",
    season: "",

    keywords: "",

    hyperlink1: "",
    hyperlink2: "",
    hyperlink3: "",
    hyperlink4: "",
    hyperlink5: "",
    hyperlink6: "",

    album1: "",
    track1: "",
    album2: "",
    track2: "",
    album3: "",
    track3: "",
    album4: "",
    track4: "",
  });

  const [lists, setLists] = useState({
    celebList: [],
    subjectList: [],
    artistList: [],
    categoryList: [],
    sportList: [],
    seasonList: [],
    albumList: [],
  });

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
          subjectInfoRes,
          celeb1InfoRes,
          celeb2InfoRes,
          seasonInfoRes,
          categoryInfoRes,
          albumInfoRes,
          hyperlinkInfoRes,
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
          Axios.get(`${API_URL}/api/get/subject/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/celeb1/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/celeb2/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/season/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/category/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/album/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/hyperlink/info/${searchBitID}`),
        ]);

        setLists({
          celebList: celebRes.data,
          subjectList: subjectRes.data,
          artistList: artistRes.data,
          categoryList: categoryRes.data,
          sportList: sportRes.data,
          seasonList: seasonRes.data,
          albumList: albumRes.data,
        });

        const bit = bitRes.data?.[0];

        if (!bit) {
          console.log("No bit found.");
          return;
        }

        const subjects = subjectInfoRes.data || [];
        const celeb1 = celeb1InfoRes.data?.[0];
        const celeb2 = celeb2InfoRes.data?.[0];
        const sport = sportInfoRes.data?.[0];
        const season = seasonInfoRes.data?.[0];
        const category = categoryInfoRes.data?.[0];
        const albums = albumInfoRes.data || [];
        const hyperlinks = hyperlinkInfoRes.data?.[0];

        setFormData({
          type: bit.Type || "",
          title: bit.Title || "",
          date: bit.AirDate
            ? new Date(bit.AirDate).toISOString().split("T")[0]
            : "",
          time: bit.Time || "",
          autoNum: bit.ProphetNum || "",

          category:
            category?.CatID ||
            bit.CatID ||
            "",

          artist:
            bit.ArtistID ||
            "",

          sub1: subjects[0]?.SubID || "",
          sub2: subjects[1]?.SubID || "",
          sub3: subjects[2]?.SubID || "",
          sub4: subjects[3]?.SubID || "",

          celebrity1:
            celeb1?.Celeb1_ID ||
            celeb1?.CelebID ||
            "",

          celebrity2:
            celeb2?.Celeb2_ID ||
            celeb2?.CelebID ||
            "",

          sport:
            sport?.SportID ||
            "",

          season:
            season?.SeasonID ||
            "",

          keywords: bit.Keywords || "",

          hyperlink1: hyperlinks?.Hyperlink1 || "",
          hyperlink2: hyperlinks?.Hyperlink2 || "",
          hyperlink3: hyperlinks?.Hyperlink3 || "",
          hyperlink4: hyperlinks?.Hyperlink4 || "",
          hyperlink5: hyperlinks?.Hyperlink5 || "",
          hyperlink6: hyperlinks?.Hyperlink6 || "",

          album1: albums[0]?.AlbumID || "",
          track1: albums[0]?.Album_Track || "",

          album2: albums[1]?.AlbumID || "",
          track2: albums[1]?.Album_Track || "",

          album3: albums[2]?.AlbumID || "",
          track3: albums[2]?.Album_Track || "",

          album4: albums[3]?.AlbumID || "",
          track4: albums[3]?.Album_Track || "",
        });
      } catch (err) {
        console.error("Error fetching bit data:", err);
      }
    };

    fetchData();
  }, [searchBitID]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      await Axios.post(`${API_URL}/api/update/bit`, {
        bitID: searchBitID,
        ...formData,
      });

      alert("Bit updated successfully!");
    } catch (err) {
      console.error("Error updating bit:", err);
      alert("Failed to update bit.");
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <form
      onSubmit={handleConfirm}
      style={{
        padding: "20px",
        color: "white",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "20px",
        }}
      >

        {/* GENERAL INFORMATION */}
        <section
          style={{
            backgroundColor: "#1a1a1a",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ color: "#979bdb" }}>General Information</h2>

          <div style={{ marginBottom: "12px" }}>
            <label>Media Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Media Type:</label>
            <select
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="">Select Type</option>
              <option value="Bit">Bit</option>
              <option value="Segment">Segment</option>
              <option value="Video">Video</option>
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Category:</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="">Select Category</option>

              {lists.categoryList.map((val) => (
                <option key={val.CatID} value={val.CatID}>
                  {val.Category}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Artist:</label>
            <select
              value={formData.artist}
              onChange={(e) => handleChange("artist", e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="">Select Artist</option>

              {lists.artistList.map((val) => (
                <option key={val.ArtistID} value={val.ArtistID}>
                  {val.Name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Original Air Date:</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Length:</label>
            <input
              type="text"
              placeholder="HH:MM:SS"
              value={formData.time}
              onChange={(e) => handleChange("time", e.target.value)}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Automation Number:</label>
            <input
              type="text"
              value={formData.autoNum}
              onChange={(e) => handleChange("autoNum", e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
        </section>

        {/* SUBJECTS / CELEBRITIES */}
        <section
          style={{
            backgroundColor: "#1a1a1a",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ color: "#979bdb" }}>Subjects & People</h2>

          <h4>Subjects</h4>

          {[1, 2, 3, 4].map((i) => (
            <div style={{ marginBottom: "10px" }} key={i}>
              <label>Subject {i}:</label>

              <select
                value={formData[`sub${i}`]}
                onChange={(e) =>
                  handleChange(`sub${i}`, e.target.value)
                }
                style={{ width: "100%" }}
              >
                <option value="">Select Subject</option>

                {lists.subjectList.map((val) => (
                  <option key={val.SubID} value={val.SubID}>
                    {val.Subject}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <h4 style={{ marginTop: "20px" }}>Celebrities</h4>

          <div style={{ marginBottom: "10px" }}>
            <label>Celebrity 1:</label>

            <select
              value={formData.celebrity1}
              onChange={(e) =>
                handleChange("celebrity1", e.target.value)
              }
              style={{ width: "100%" }}
            >
              <option value="">Select Celebrity</option>

              {lists.celebList.map((val) => (
                <option key={val.CelebID} value={val.CelebID}>
                  {val.Name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Celebrity 2:</label>

            <select
              value={formData.celebrity2}
              onChange={(e) =>
                handleChange("celebrity2", e.target.value)
              }
              style={{ width: "100%" }}
            >
              <option value="">Select Celebrity</option>

              {lists.celebList.map((val) => (
                <option key={val.CelebID} value={val.CelebID}>
                  {val.Name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* SPORT / SEASON / KEYWORDS */}
        <section
          style={{
            backgroundColor: "#1a1a1a",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ color: "#979bdb" }}>Additional Information</h2>

          <div style={{ marginBottom: "12px" }}>
            <label>Sport:</label>

            <select
              value={formData.sport}
              onChange={(e) => handleChange("sport", e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="">Select Sport</option>

              {lists.sportList.map((val) => (
                <option key={val.SportID} value={val.SportID}>
                  {val.Sport}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Season:</label>

            <select
              value={formData.season}
              onChange={(e) => handleChange("season", e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="">Select Season</option>

              {lists.seasonList.map((val) => (
                <option key={val.SeasonID} value={val.SeasonID}>
                  {val.Season}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Keywords:</label>

            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => handleChange("keywords", e.target.value)}
              placeholder="Enter keywords"
              style={{ width: "100%" }}
            />
          </div>
        </section>

        {/* HYPERLINKS */}
        <section
          style={{
            backgroundColor: "#1a1a1a",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2 style={{ color: "#979bdb" }}>Hyperlinks</h2>

          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div style={{ marginBottom: "10px" }} key={i}>
              <label>Link {i}:</label>

              <input
                type="text"
                value={formData[`hyperlink${i}`]}
                onChange={(e) =>
                  handleChange(`hyperlink${i}`, e.target.value)
                }
                placeholder="Enter link"
                style={{ width: "100%" }}
              />
            </div>
          ))}
        </section>

        {/* ALBUMS */}
        <section
          style={{
            backgroundColor: "#1a1a1a",
            padding: "20px",
            borderRadius: "10px",
            gridColumn: "1 / -1",
          }}
        >
          <h2 style={{ color: "#979bdb" }}>Albums</h2>

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <label>Album {i}:</label>

              <select
                value={formData[`album${i}`]}
                onChange={(e) =>
                  handleChange(`album${i}`, e.target.value)
                }
                style={{ width: "250px" }}
              >
                <option value="">Select Album</option>

                {lists.albumList.map((val) => (
                  <option key={val.AlbumID} value={val.AlbumID}>
                    {val.Album_Name}
                  </option>
                ))}
              </select>

              <label>Track:</label>

              <input
                type="text"
                value={formData[`track${i}`]}
                onChange={(e) =>
                  handleChange(`track${i}`, e.target.value)
                }
                placeholder="Track #"
                style={{ width: "100px" }}
              />
            </div>
          ))}
        </section>
      </div>

      {/* BUTTONS */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          type="submit"
          className="btn btn-success"
        >
          Confirm Edits
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="btn btn-danger"
        >
          Cancel Edits
        </button>
      </div>
    </form>
  );
};

export default EditBit;

