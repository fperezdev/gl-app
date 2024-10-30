import { create } from "zustand";
import { ArtistInfo } from "./lib/types";

interface AppState {
  user: string | null;
  setUser: (user: string | null) => void;
  artistsInfoCache: { [key: string]: ArtistInfo };
  setArtistInfoCache: (query: string, artistInfo: ArtistInfo) => void;
  artistInfo: ArtistInfo | null;
  setArtistInfo: (artistInfo: ArtistInfo | null) => void;
  loadingArtistInfo: boolean;
  setLoadingArtistInfo: (loading: boolean) => void;
}

const useStore = create<AppState>()((set) => ({
  user: window.localStorage.getItem("user") || null,
  setUser: (newUser: string | null) => set({ user: newUser }),
  artistsInfoCache: {},
  setArtistInfoCache: (query: string, artistInfo: ArtistInfo) =>
    set((state) => ({
      artistsInfoCache: {
        ...state.artistsInfoCache,
        [query]: artistInfo,
      },
    })),
  artistInfo: null,
  setArtistInfo: (artistInfo: ArtistInfo | null) => set({ artistInfo }),
  loadingArtistInfo: false,
  setLoadingArtistInfo: (loading: boolean) =>
    set({ loadingArtistInfo: loading }),
}));

export default useStore;
