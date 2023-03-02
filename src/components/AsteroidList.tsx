import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsteroids, selectAsteroids, selectStartDate, setStartDate, setSearch,  setEndDate, selectEndDate, selectSearch, selectSort, setSort, selectIsLoading, selectFavourites, addFavourite, saveFavouriteData, removeFavourite } from "../features/asteroids.slice";
import { Layout } from "../Layout";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";


export function AsteroidList() {

  const asteroids = useSelector(selectAsteroids);
  const start_date = useSelector(selectStartDate);
  const end_date = useSelector(selectEndDate);
  const search = useSelector(selectSearch);
  const sort = useSelector(selectSort);
  const isLoading = useSelector(selectIsLoading);
  const favourites = useSelector(selectFavourites);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  let initialized = false

  useEffect(() => {
    if (!initialized) {
      initialized = true
      dispatch(fetchAsteroids())
    }
  }, [dispatch])

  useEffect( () => {
    dispatch(saveFavouriteData())
  }, [favourites, dispatch])

  return (<Layout className="container mt-5">
    <h1>Asteroid List</h1>

    <div className="filter-bar mt-5">
      <h3>Filters</h3>
      <div className="row">
        <div className="col-md-2">
          <label className="label">Start Date</label>
          <input id="start_date" onChange={(e) => dispatch(setStartDate(e.target.value))} className="form-control" type="date" value={start_date} name="start_date" />
        </div>
        <div className="col-md-2">
          <label className="label">End Date</label>
          <input className="form-control" onChange={(e) => dispatch(setEndDate(e.target.value))} type="date" value={end_date} name="end_date" />
        </div>
        <div className="col-md-3">
          <label className="label">Search</label>
          <input className="form-control" onChange={(e) => dispatch(setSearch(e.target.value))} type="text" value={search} name="end_date" />
        </div>
        <div className="col-md-3">
          <label className="label">Order</label>
          <select className="form-control" value={sort} onChange={(e) => dispatch(setSort(e.target.value))}>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <label className="label"> </label>
          <button className="btn btn-primary" disabled={isLoading} onClick={() => {dispatch(fetchAsteroids())}}>Search</button>
        </div>
      </div>
    </div>
    <div className="asteroid-list-table mt-5">
      <h3>Results</h3>
      {!isLoading && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Diameter (meter) (min)</th>
              <th>Diameter (meter) (max)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {asteroids.map((line: any) => {
              return (
                <tr key={line.id}>
                  <td>{line.id}</td>
                  <td>{line.name}</td>
                  <td>{line.estimated_diameter_meter_min}</td>
                  <td>{line.estimated_diameter_meter_max}</td>
                  <td>
                    <Link className="btn btn-primary btn-sm" to={`/details/${line.id}`}>More info</Link>
                    { favourites.hasOwnProperty(line.id) 
                      ? (<button className="ms-2 btn btn-danger btn-sm" onClick={() => dispatch(removeFavourite({id: line.id}))}>Remove favourite</button>)
                      : (<button className="ms-2 btn btn-success btn-sm" onClick={() => dispatch(addFavourite({id: line.id, name: line.name}))}>Add favourite</button>)
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
      {isLoading && <h4>Loading...</h4>}
    </div>
  </Layout>)
}