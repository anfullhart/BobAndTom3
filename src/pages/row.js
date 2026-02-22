import { memo } from "react";

const Row = memo(({ index, row, artistList, updateRow }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="00:00:00"
        value={row.time}
        onChange={(e) => updateRow(index, "time", e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        style={{ marginLeft: "40px", width: "400px" }}
        value={row.description}
        onChange={(e) => updateRow(index, "description", e.target.value)}
      />

      <select
        style={{ marginLeft: "5px" }}
        value={row.artist}
        onChange={(e) => updateRow(index, "artist", e.target.value)}
      >
        <option value="">Select Artist</option>
        {artistList.map((val) => (
          <option key={val.ArtistID} value={val.ArtistID}>
            {val.Name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Row;
