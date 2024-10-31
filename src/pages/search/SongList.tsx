import useStore from "../../store";
import { Song } from "../../lib/types";
import {
  CircularProgress,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SongComponent from "./Song";
import FavDialog from "./FavDialog";

const SongList = () => {
  const loading = useStore((state) => state.loadingArtistInfo);
  const userInfo = useStore((state) => state.userInfo);
  const artistInfo = useStore((state) => state.artistInfo);
  const songs = artistInfo?.canciones || [];

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [artistInfo]);

  return (
    <div>
      {loading ? (
        <div>
          <CircularProgress sx={{ padding: "20px 0" }} />
          <div
            style={{
              width: "fit-content",
              margin: "20px 0",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <Skeleton
                key={`songs-fetch-sk-${id}`}
                variant="rectangular"
                width={470}
                height={160}
              />
            ))}
          </div>
        </div>
      ) : songs.length === 0 ? (
        <Typography variant="h6" sx={{ padding: "20px 0" }}>
          No hay canciones para mostrar
        </Typography>
      ) : (
        <>
          {songs.length > 6 && (
            <Pagination
              count={Math.ceil(songs.length / 6)}
              color="primary"
              sx={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
              }}
              page={page}
              onChange={(_, page) => setPage(page)}
            />
          )}
          <div
            style={{
              width: "fit-content",
              margin: "20px 0",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {songs
              .sort(
                (a: Song, b: Song) =>
                  a.nombre_album.localeCompare(b.nombre_album) ||
                  a.nombre_tema.localeCompare(b.nombre_tema)
              )
              .slice((page - 1) * 6, page * 6)
              .map((song: Song) => (
                <SongComponent
                  key={song.cancion_id}
                  song={song}
                  userInfo={userInfo}
                />
              ))}
          </div>
        </>
      )}
      <FavDialog />
    </div>
  );
};

export default SongList;
