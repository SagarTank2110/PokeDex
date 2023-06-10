import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  url: '',
  list: [],
};

const slice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setUrl: (state, payload) => {
      state.url = payload;
    },
    setList: (state, payload) => {
      state.list = payload;
    },
  },
});

export const {setUrl} = slice.actions;
export default slice.reducer;

export const getUrl = state => state.pokemon.url;
