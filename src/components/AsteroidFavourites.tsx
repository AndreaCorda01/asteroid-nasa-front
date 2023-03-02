import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectFavourites, saveFavouriteData, removeFavourite } from "../features/asteroids.slice";
import { Layout } from "../Layout";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";


export function AsteroidFavourites() {

  const favourites = useSelector(selectFavourites);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(saveFavouriteData())
  }, [favourites, dispatch])

  return (<Layout className="container mt-5">
    <h1>Asteroid Favourites</h1>

    <div className="asteroid-list-table mt-5">
      {!isLoading && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(favourites).map((id: any) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{favourites[id]}</td>
                  <td>
                    <Link className="btn btn-primary btn-sm" to={`/details/${id}`}>More info</Link>
                    <button className="ms-2 btn btn-danger btn-sm" onClick={() => dispatch(removeFavourite({ id }))}>Remove favourite</button>
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