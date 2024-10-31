import SongList from "./SongList";
import SearchBar from "../../components/SearchBar";

const Search = () => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SearchBar />
      <SongList />
    </div>
  );
};

export default Search;
