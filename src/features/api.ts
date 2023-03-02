import dayjs from "dayjs"
import axios from "axios"

const baseApi = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000"


export const endpointListAsteroids = (start_date: Date|string, end_date: Date|string, search?: string, sort?: "ASC"|"DESC") => {
  const params = {
    start_date: dayjs(start_date).format("YYYY-MM-DD"), end_date: dayjs(end_date).format("YYYY-MM-DD"), search, sort
  }
  return axios.get(`${baseApi}/asteroid/list`, {params})
}

export const endpointGetAsteroid = (id: number) => axios.get(`${baseApi}/asteroid/details/${id}`)