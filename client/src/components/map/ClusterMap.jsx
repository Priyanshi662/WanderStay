import React, { useEffect,useState} from 'react';
import { useValue } from '../../context/ContextProvider';
import { getRooms } from '../../actions/room';
import ReactMapGL,{Marker,Popup} from 'react-map-gl';
import Supercluster from 'supercluster';
import './cluster.css';
import { Avatar, Paper, Tooltip } from '@mui/material';
import GeocoderInput from '../sidebar/GeocoderInput';
import PopupRoom from './PopupRoom';

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const ClusterMap = () => {
  const {state:{filteredRooms},dispatch,mapRef}=useValue();

  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [popupInfo,setPopupInfo]=useState(null)

  useEffect(() => {
    getRooms(dispatch);
  }, []);

  useEffect(()=>{
    const points=filteredRooms.map(room=>({
      type:'Feature',
      properties:{
        cluster: false,
        roomId: room._id,
        price: room.price,
        title: room.title,
        description: room.description,
        lng: room.lng,
        lat: room.lat,
        images: room.images,
        uPhoto: room.uPhoto,
        uName: room.uName
      },
      geometry:{
        type:'Point',
        coordinates:[parseFloat(room.lng),parseFloat(room.lat)]
      }
    }));
    setPoints(points);
  },[filteredRooms]);

  useEffect(() => {
    if (mapRef.current) {
      // getbounds give two objects - lat and longitude , flat is used to convert them to the array
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);

useEffect(()=>{
  supercluster.load(points)
  // getCluster is a function present in supercluster that gives clusters based on bounds of the map and zoom
  setClusters(supercluster.getClusters(bounds,zoom));
},[points,zoom,bounds])

 
  return (
    <>
    <ReactMapGL
      ref={mapRef}
      mapboxAccessToken={import.meta.env.VITE_APP_MAP_TOKEN}
      initialViewState={{
          latitude: 77.7680952, 
          longitude: 29.0188653 
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
      >
        {clusters.map((cluster) => {
          // cluster properties are present in the supercluster
        const { cluster: isCluster, point_count } = cluster.properties;

        const [longitude, latitude] = cluster.geometry.coordinates;

        if (isCluster) {
          return (
            // marker is present in react map-gl , supercluster gives id to every cluster
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
            >
              {/* this is the single cluster */}
              <div
                className="cluster-marker"
                style={{
                  width: `${10 + (point_count / points.length) * 20}px`,
                  height: `${10 + (point_count / points.length) * 20}px`,
                }}
                onClick={() => {
                  const zoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  mapRef.current.flyTo({
                    // fly to location of the cluster
                    center: [longitude, latitude],
                    zoom,
                    speed: 1,
                  });
                }}
              >
                {/* the number of rooms will be shown at the current longitude and latitude */}
                {point_count}
              </div>
            </Marker>
          );
        }
        return (
          <Marker
            key={`room-${cluster.properties.roomId}`}
            longitude={longitude}
            latitude={latitude}
          >
            <Tooltip title={cluster.properties.uName}>
              <Avatar
                src={cluster.properties.uPhoto}
                component={Paper}
                elevation={2}
                onClick={() => setPopupInfo(cluster.properties)}
              />
            </Tooltip>
          </Marker>
        );
      })}
      <GeocoderInput />
      
    
      {popupInfo && (
        <Popup
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          maxWidth="auto"
          closeOnClick={false}
          focusAfterOpen={false}
          onClose={() => setPopupInfo(null)}
        >
          <PopupRoom {...{ popupInfo }} />
        </Popup>
      )}
    </ReactMapGL>
    </>
  );
};

export default ClusterMap;