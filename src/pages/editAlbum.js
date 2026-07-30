return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      padding: "40px 20px",
      boxSizing: "border-box",
    }}
  >
    <h2
      style={{
        color: "white",
        marginBottom: "30px",
        textAlign: "center",
      }}
    >
      Edit Albums
    </h2>

    <div
      style={{
        backgroundColor: "black",
        color: "white",
        borderRadius: "15px",
        padding: "30px",
        width: "100%",
        maxWidth: "650px",
      }}
    >
      {/* Add Album */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <label style={{ minWidth: "100px" }}>Album Name:</label>

        <input
          style={{
            flex: 1,
            minWidth: "250px",
          }}
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={addAlbum}
        >
          Add
        </button>
      </div>

      {/* Delete Album */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <label style={{ minWidth: "100px" }}>List of Albums:</label>

        <select
          style={{
            flex: 1,
            minWidth: "250px",
          }}
          value={deleteAlbum}
          onChange={(e) => setDeleteAlbum(e.target.value)}
        >
          <option value="">Select Album</option>

          {albumList.map((val) => (
            <option
              key={val.AlbumID}
              value={val.AlbumID}
            >
              {val.Album_Name}
            </option>
          ))}
        </select>

        <button
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm("Remove album?")) {
              removeAlbum();
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);
