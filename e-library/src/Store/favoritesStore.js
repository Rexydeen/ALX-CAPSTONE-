// src/Store/favoritesStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoritesStore = create(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (book) =>
        set((state) => {
          const exists = state.favorites.some((fav) => fav.key === book.key);
          if (exists) return state;
          return { favorites: [...state.favorites, book] };
        }),
      removeFavorite: (bookKey) =>
        set((state) => ({
          favorites: state.favorites.filter((book) => book.key !== bookKey),
        })),
    }),
    {
      name: 'favorites-storage',
    }
  )
);

export default useFavoritesStore;



