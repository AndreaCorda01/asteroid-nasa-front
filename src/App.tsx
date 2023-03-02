import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AsteroidList } from './components/AsteroidList';
import { AsteroidDetail } from './components/AsteroidDetail';
import { AsteroidFavourites } from './components/AsteroidFavourites';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AsteroidList />} />
            <Route path="/details/:id" element={<AsteroidDetail/>}/>
            <Route path="/favourites" element={<AsteroidFavourites/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
