import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  url: '',
  list: [],
  favorites: [],
  selectedType: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setList: (state, action) => {
      state.list = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    addToFavorites: (state, action) => {
      const pokemon = action.payload;
      const exists = state.favorites.find(fav => fav.name === pokemon.name);
      if (!exists) {
        state.favorites.push(pokemon);
      }
    },
    removeFromFavorites: (state, action) => {
      const pokemonName = action.payload;
      state.favorites = state.favorites.filter(fav => fav.name !== pokemonName);
    },
    clearList: (state) => {
      state.list = [];
    },
  },
});

export const {
  setUrl,
  setList,
  setSelectedType,
  addToFavorites,
  removeFromFavorites,
  clearList,
} = pokemonSlice.actions;

// Selectors
export const selectUrl = (state) => state.pokemon.url;
export const selectList = (state) => state.pokemon.list;
export const selectFavorites = (state) => state.pokemon.favorites;
export const selectSelectedType = (state) => state.pokemon.selectedType;
export const selectIsFavorite = (pokemonName) => (state) =>
  state.pokemon.favorites.some(fav => fav.name === pokemonName);

export default pokemonSlice.reducer;
