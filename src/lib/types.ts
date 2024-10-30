export interface Song {
  cancion_id: number;
  nombre_album: string;
  nombre_tema: string;
  preview_url: string;
  fecha_lanzamiento: string;
  precio: {
    valor: number;
    moneda: string;
  };
  img: string;
}

export interface ArtistInfo {
  total_albumes: number;
  total_canciones: number;
  albumes: string[];
  canciones: Song[];
}
