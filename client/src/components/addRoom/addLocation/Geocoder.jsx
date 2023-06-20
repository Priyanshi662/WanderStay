import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import { useValue } from '../../../context/ContextProvider';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

// geocoder lets the user search for a location and retrieves the coordinates
const Geocoder = () => {
  const { dispatch } = useValue();
  const ctrl = new MapBoxGeocoder({
    accessToken: import.meta.env.VITE_APP_MAP_TOKEN,
    marker: false,
    collapsed: true,
  });
//   usecontrol is used to add the geocoder to the map (integrates react map gl with geocoder)
  useControl(() => ctrl);
  ctrl.on('result', (e) => {
    console.log(e);
    const coords = e.result.geometry.coordinates;
    dispatch({
      type: 'UPDATE_LOCATION',
      payload: { lng: coords[0], lat: coords[1] },
    });
  });
  return null;
};

export default Geocoder;