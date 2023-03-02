import { configureStore } from '@reduxjs/toolkit'
import asteroidReducer from './features/asteroids.slice'

export const store = configureStore({
  reducer: {
    asteroids: asteroidReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
