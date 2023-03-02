import { Layout } from "../Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { endpointGetAsteroid } from "../features/api";

export function AsteroidDetail() {
  const { id } = useParams()
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState(null as any)
  const [error, setError] = useState(null as any)

  let initialized = false

  useEffect( () => {
    if(!initialized) {
      endpointGetAsteroid(Number(id)).then( response => {
        setData(response.data)
        setLoading(false)
        setError(null)
      }).catch( (err) => {
        setLoading(false)
        setError("Unable to retrieve data: " + JSON.stringify(err.message))
      })
    }
  })


  return (
  <Layout className="container mt-5">
    <h1>Asteroid Details {id}</h1>
    {!isLoading && error == null && (
      <div className="asteroid-details mt-3">
        <p>Name: <b>{data.name}</b></p>
        <p>Estimated Diameter in meter: <b>{data.estimated_diameter_meter_min} - {data.estimated_diameter_meter_max}</b></p>

        <h5>Close Approach Data</h5>

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Relative Velocity</th>
              <th>Miss Distance</th>
              <th>Orbiting Body</th>
            </tr>
          </thead>
          <tbody>
          {
            data.close_approach_data.map( (line: any, index: number) => 
              <tr key={index}>
                <td>{line.close_approach_date}</td>
                <td>{line.relative_velocity.kilometers_per_second}  km/s</td>
                <td>{line.miss_distance.kilometers} km</td>
                <td>{line.orbiting_body}</td>
              </tr>
            )
          }        
          </tbody>
        </table>
      </div>
    )}
    {!isLoading && error != null && <div className="alert alert-danger">{error}</div>}

    {isLoading && <h4>Loading...</h4>}

  </Layout>
  )
}