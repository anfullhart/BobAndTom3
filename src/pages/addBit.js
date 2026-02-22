import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./addBit.css"; 

const AddBit = () => {
  const [type, setType] = useState("Bit");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [artist, setArtist] = useState(0);
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
  const [hyperlink1, setHyperlink1] = useState("");
  const [hyperlink2, setHyperlink2] = useState("");
  const [hyperlink3, setHyperlink3] = useState("");
  const [hyperlink4, setHyperlink4] = useState("");
  const [hyperlink5, setHyperlink5] = useState("");
  const [hyperlink6, setHyperlink6] = useState("");
  const [album1, setAlbum1] = useState("");
  const [track1, setTrack1] = useState("");
  const [album2, setAlbum2] = useState("");
  const [track2, setTrack2] = useState("");
  const [album3, setAlbum3] = useState("");
  const [track3, setTrack3] = useState("");
  const [album4, setAlbum4] = useState("");
  const [track4, setTrack4] = useState("");

  const [celebList, setCelebList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sportList, setSportList] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [albumList, setAlbumList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/celebrity").then(res => setCelebList(res.data));
    Axios.get("http://localhost:3001/api/get/subject").then(res => setSubjectList(res.data));
    Axios.get("http://localhost:3001/api/get/artist").then(res => setArtistList(res.data));
    Axios.get("http://localhost:3001/api/get/category").then(res => setCategoryList(res.data));
    Axios.get("http://localhost:3001/api/get/sport").then(res => setSportList(res.data));
    Axios.get("http://localhost:3001/api/get/season").then(res => setSeasonList(res.data));
    Axios.get("http://localhost:3001/api/get/album").then(res => setAlbumList(res.data));
  }, []);

  const submitMedia = () => {
    Axios.post("http://localhost:3001/api/insert/bit", {
      type, title, category, artist, date, time, autoNum,
      sub1, sub2, sub3, sub4,
      celebrity1, celebrity2,
      sport, season,
      keywords,
      hyperlink1, hyperlink2, hyperlink3, hyperlink4, hyperlink5, hyperlink6,
      album1, track1, album2, track2, album3, track3, album4, track4
    });
  };

  return (
    <form className="add-bit-form">
      {/* Columns */}
      <div className="form-columns">

        {/* General Info */}
        <div className="card">
          <h2>General Info</h2>
          <div className="form-row"><label>Title:</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Media Title"/></div>
          <div className="form-row"><label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}><option>Bit</option><option>Segment</option><option>Video</option></select>
          </div>
          <div className="form-row"><label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categoryList.map(val => <option key={val.CatID} value={val.CatID}>{val.Category}</option>)}
            </select>
          </div>
          <div className="form-row"><label>Artist:</label>
            <select value={artist} onChange={(e) => setArtist(e.target.value)}>
              {artistList.map(val => <option key={val.ArtistID} value={val.ArtistID}>{val.Name}</option>)}
            </select>
          </div>
          <div className="form-row"><label>Air Date:</label><input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="MM/DD/YYYY"/></div>
          <div className="form-row"><label>Length:</label><input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="HH:MM:SS"/>
    
            <label>Automation #:</label><input type="text" value={autoNum} onChange={(e) => setAutoNum(e.target.value)} placeholder="0123456789"/>
          </div>
          <div className="form-row"><label>Subjects:</label>
            {[sub1, sub2, sub3, sub4].map((sub, idx) => (
              <select key={idx} onChange={(e) => {
                if(idx===0) setSub1(e.target.value);
                if(idx===1) setSub2(e.target.value);
                if(idx===2) setSub3(e.target.value);
                if(idx===3) setSub4(e.target.value);
              }}>
                {subjectList.map(val => <option key={val.subID} value={val.subID}>{val.Subject}</option>)}
              </select>
            ))}
          </div>
          <div className="form-row"><label>Celebrities:</label>
            <select value={celebrity1} onChange={(e) => setCelebrity1(e.target.value)}>
              {celebList.map(val => <option key={val.CelebID} value={val.CelebID}>{val.Name}</option>)}
            </select>
            <select value={celebrity2} onChange={(e) => setCelebrity2(e.target.value)}>
              {celebList.map(val => <option key={val.CelebID} value={val.CelebID}>{val.Name}</option>)}
            </select>
          </div>
          <div className="form-row"><label>Sport:</label>
            <select value={sport} onChange={(e) => setSport(e.target.value)}>
              {sportList.map(val => <option key={val.SportID} value={val.SportID}>{val.Sport}</option>)}
            </select>
            <label>Season:</label>
            <select value={season} onChange={(e) => setSeason(e.target.value)}>
              {seasonList.map(val => <option key={val.SeasonID} value={val.SeasonID}>{val.Season}</option>)}
            </select>
          </div>
          <div className="form-row"><label>Keywords:</label><input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Enter keywords"/></div>
        </div>

        {/* Hyperlinks */}
        <div className="card">
          <h2>Hyperlinks</h2>
          {[hyperlink1, hyperlink2, hyperlink3, hyperlink4, hyperlink5, hyperlink6].map((link, idx) => (
            <div className="form-row" key={idx}>
              <label>Link {idx+1}:</label>
              <input type="text" value={link} onChange={(e) => {
                if(idx===0) setHyperlink1(e.target.value);
                if(idx===1) setHyperlink2(e.target.value);
                if(idx===2) setHyperlink3(e.target.value);
                if(idx===3) setHyperlink4(e.target.value);
                if(idx===4) setHyperlink5(e.target.value);
                if(idx===5) setHyperlink6(e.target.value);
              }} placeholder="Enter link"/>
            </div>
          ))}
        </div>

        {/* Album Info */}
        <div className="card">
          <h2>Albums</h2>
          {[[album1, track1, setAlbum1, setTrack1],
            [album2, track2, setAlbum2, setTrack2],
            [album3, track3, setAlbum3, setTrack3],
            [album4, track4, setAlbum4, setTrack4]].map((arr, idx) => (
              <div className="form-row" key={idx}>
                <label>Album {idx+1}:</label>
                <select value={arr[0]} onChange={(e) => arr[2](e.target.value)}>
                  {albumList.map(val => <option key={val.AlbumID} value={val.AlbumID}>{val.Album_Name}</option>)}
                </select>
                <label>Track:</label>
                <input type="text" value={arr[1]} onChange={(e) => arr[3](e.target.value)} placeholder="Track #"/>
              </div>
            ))}
        </div>

      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-success" onClick={submitMedia}>Submit</button>
        <button type="reset" className="btn btn-danger">Clear</button>
      </div>
    </form>
  );
};

export default AddBit;
