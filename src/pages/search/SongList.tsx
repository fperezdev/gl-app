import useStore from "../../store";
import { Song } from "../../lib/types";
import {
  CircularProgress,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import { useEffect, useState } from "react";

const SongList = () => {
  const loading = useStore((state) => state.loadingArtistInfo);
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
            {new Array(6).fill(0).map(() => (
              <Skeleton variant="rectangular" width={470} height={160} />
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
                <div
                  key={song.cancion_id}
                  style={{
                    width: 450,
                    height: 120,
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                    border: `2px solid ${pink[300]}`,
                    borderRadius: 5,
                    textAlign: "left",
                    gap: "10px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={song.img}
                    alt={song.nombre_tema}
                    width={100}
                    height={100}
                  />

                  <div>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      maxWidth={350}
                      noWrap
                      textOverflow="ellipsis"
                    >
                      {song.nombre_tema}
                    </Typography>
                    <Typography
                      variant="body2"
                      maxWidth={350}
                      noWrap
                      textOverflow="ellipsis"
                    >
                      Album "{song.nombre_album}"
                    </Typography>
                    <Typography variant="body2">{`Precio ${song.precio.valor} ${song.precio.moneda}`}</Typography>
                    <Typography variant="body2">
                      {`Lanzado ${new Date(
                        song.fecha_lanzamiento
                      ).toLocaleDateString()}`}
                    </Typography>
                    <a href={song.preview_url}>
                      <Typography variant="body2">Descargar Preview</Typography>
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SongList;
