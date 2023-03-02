
import { Link } from "react-router-dom"
import nasaLogoSvg from "./assets/nasa-logo.svg"
import styles from "./Layout.module.scss"

export function Layout({ children, className }: any) {
  return (
    <div className="app-layout">
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand me-0" to="/">
              <img className={styles.navbarLogo} src={nasaLogoSvg} title="Nasa Logo" alt="Nasa logo"/>
            </Link>
            <Link className="navbar-brand" to="/">
              Asteroids
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">List</Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link" to="/favourites">Favourites</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className={`main ${className}`}>
        {children}
      </div>
      <footer className="footer">
      </footer>
    </div>
  )
}