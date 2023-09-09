import React, { useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { getRooms } from '../../actions/room';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Supercluster from 'supercluster';
import './cluster.css';
import { Avatar, Paper, Tooltip } from '@mui/material';
import PopupRoom from './PopupRoom';

// creates a supercluster of rooms 
const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const ClusterMap = () => {
  // filtered rooms are rooms with filtered pricing from the sidebar
  const {
    state: { filteredRooms },
    dispatch,
    mapRef,
  } = useValue();
  // mapRef is the current state of map in the app
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    getRooms(dispatch);
  }, []);

  useEffect(() => {
    // mapping the rooms with - 1. its latitude and longitude for displaying in the map
    // 2. features - used in pop up rooms function
    const points = filteredRooms.map((room) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        roomId: room._id,
        price: room.price,
        title: room.title,
        description: room.description,
        lng: room.lng,
        lat: room.lat,
        images: room.images,
        uPhoto: room.uPhoto,
        uName: room.uName,
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(room.lng), parseFloat(room.lat)],
      },
    }));
    setPoints(points);
  }, [filteredRooms]);

  useEffect(() => {
    // loading points of rooms in supercluster
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef.current) {
      // if mapRef is not null then setting the bounds of the map , as returned by mapRef object
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef?.current]);
  
  return (
    <div>
    <ReactMapGL
      initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
      mapboxAccessToken={import.meta.env.VITE_APP_MAP_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      ref={mapRef}
      onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
    >
      {/* h1 component is overrided by map */}
          
      {/* function for displaying cluster points which were loaded in useEffect hook*/}
      {clusters.map((cluster) => {
        //for each cluster display a marker with the number of points in cluster count
        const { cluster: isCluster, point_count } = cluster.properties;
        const [longitude, latitude] = cluster.geometry.coordinates;
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
            >
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
                    center: [longitude, latitude],
                    zoom,
                    speed: 1,
                  });
                }}
              >
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
      <h1 style={{width: "200px", height:"450px"}}>Hello </h1>
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
    </div>
  );
};

export default ClusterMap;

