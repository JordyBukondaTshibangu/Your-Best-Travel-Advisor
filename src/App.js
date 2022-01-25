import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData, getWeatherData } from './api'


const App = () => {

  const [ weatherData, setWeatherData ] = useState([]);
  const [ places, setPlaces ] = useState([]);
  const [ filteredPlaces, setFilteredPlaces ] = useState([]);
  const [ coordinates, setCoordinates ] = useState({});
  const [type, setType] = useState('');
  const [rating, setRating] = useState('');
  const [ bounds, setBounds ] = useState({});
  const [childCliked, setChildCliked] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    navigator.geolocation.getCurrentPosition(({ coords : { latitude, longitude}}) => {
      setCoordinates({ lat : latitude, lng : longitude })
    })
  }, [])

  useEffect(() => {
      const filteredPl = places.filter(place => place.rating > rating)
      setFilteredPlaces(filteredPl)
  }, [rating])

  useEffect(() => {
    if(bounds.sw && bounds.ne){
      setLoading(true)
      getWeatherData(coordinates.lat, coordinates.lng)
        .then(data => setWeatherData(data))
      getPlacesData(type,bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter(place => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setLoading(false)
      })
    }

  }, [bounds, type]);
  
  return (
    <>
      <CssBaseline/>
      <Header setCoordinates={setCoordinates} />
      <Grid container>
          <Grid item xs={12} md={4}>
            <List 
                type={type}
                rating={rating}
                setType={setType}
                setRating={setRating}
                places={filteredPlaces.length ? filteredPlaces : places} 
                childCliked={childCliked} 
                loading={loading}/>
          </Grid>
          <Grid item xs={12} md={8}>
            <Map  
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={filteredPlaces.length ? filteredPlaces : places}
                setChildCliked={setChildCliked}
                weatherData={weatherData}
            />
          </Grid>
      </Grid>
    </>
  );
}

export default App;
