import { HomePage } from './pages/HomePage';

import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css'
import { PlacesProvider } from './context/places/PlacesProvider';
import { MapProvider } from './context/map/MapProvider';

if (!navigator.geolocation) {
  alert('No disponible');
  throw new Error("Tu navegador no");
}

const App = () => {
  return (
    <Provider>
      <HomePage />
    </Provider>
  )
}

export const Provider: React.FC = ({ children }) => {
  return (
    <PlacesProvider>
      <MapProvider>
        {children}
      </MapProvider>
    </PlacesProvider>
  )
};

export default App
