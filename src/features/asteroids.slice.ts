import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import { RootState } from '../store'
import { endpointListAsteroids } from './api'

export const fetchAsteroids = createAsyncThunk('asteroids/list', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState

  const start_date = state.asteroids.start_date
  const end_date = state.asteroids.end_date
  const search = state.asteroids.search
  const sort = state.asteroids.sort

  const response = await endpointListAsteroids(start_date, end_date, search, sort)
  console.log("RESPONSE RECEIVED", response.data)
  return response.data
})


export const saveFavouriteData = createAsyncThunk('asteroids/favouriteSave', async (data, thunkAPI) => {
  const state = thunkAPI.getState() as RootState
  try {
    localStorage.setItem('asteroids_favourites', JSON.stringify(state.asteroids.favourites))
    console.log("SAVED TO STORAGE")
    return data;
  } catch (error) {
    throw new Error('Error saving data');
  }
});

const initFavourites = () => {
  
  try{
    return JSON.parse(localStorage.getItem('asteroids_favourites') || "{}")
  } catch {
    return {}
  }
}



export const asteroidSlice = createSlice({
  name: 'asteroids',
  initialState: {
    is_loading: true,
    asteroids: [] as any[],
    sort: "ASC" as "ASC"|"DESC",
    search: "",
    start_date: "2020-08-13",
    end_date: "2020-08-19",
    error: null as null|string,
    favourites: initFavourites() as any
  },
  reducers: {
    setSort: (state, { payload } ) => {
      if(payload === "DESC") state.sort = "DESC"
      else state.sort = "ASC"
    },
    addFavourite: (state, {payload,}) => { 
      state.favourites[payload.id] = payload.name
    },
    removeFavourite: (state, {payload}) => { 
      delete state.favourites[payload.id]
    },
    setStartDate: (state, { payload }) => { 
      state.start_date = dayjs(payload).format("YYYY-MM-DD") 
      if(Math.abs(dayjs(state.start_date).diff(state.end_date, 'days', false)) > 7) {
        state.end_date = dayjs(state.start_date).add(1, 'day').format("YYYY-MM-DD")
      }
    },
    setEndDate: (state, { payload }) => { 
      const diff = dayjs(payload).diff(dayjs(state.start_date).format("YYYY-MM-DD"), 'days', false)
      if(diff > 7) {
        alert("The end date must not exceed 7 days from the start date")
        state.end_date = dayjs(state.start_date).add(7, 'day').format("YYYY-MM-DD")
      }else if(diff < 1) {
        alert("The end date must not be at least 1 day after the start date")
        state.end_date = dayjs(state.start_date).add(1, 'day').format("YYYY-MM-DD")
      } else {
        state.end_date = dayjs(payload).format("YYYY-MM-DD") 
      }
    },
    setSearch: (state, { payload }) => { state.search = payload }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsteroids.fulfilled, (state, { payload }) => { state.asteroids = payload; state.is_loading = false })
    builder.addCase(fetchAsteroids.pending, (state) => {state.is_loading = true})
    builder.addCase(fetchAsteroids.rejected, (state) => {state.is_loading = false; state.error = "Error calling APIs"})
    builder.addCase(saveFavouriteData.rejected, (state) => {state.error = "Error saving favourites"})
  }
})

// Action creators are generated for each case reducer function
export const { setStartDate, setEndDate, setSearch, setSort, addFavourite, removeFavourite } = asteroidSlice.actions

export const selectAsteroids = (state: any) => state.asteroids.asteroids
export const selectStartDate = (state: any) => state.asteroids.start_date
export const selectEndDate = (state: any) => state.asteroids.end_date
export const selectSearch = (state: any) => state.asteroids.search
export const selectSort = (state: any) => state.asteroids.sort
export const selectIsLoading = (state: any) => state.asteroids.is_loading
export const selectFavourites = (state: any) => state.asteroids.favourites

export default asteroidSlice.reducer

