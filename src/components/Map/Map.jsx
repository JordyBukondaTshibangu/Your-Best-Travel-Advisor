import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles' 
import { LocationOnOutlined } from '@material-ui/icons';

const Map = ({ setCoordinates, setBounds, coordinates, places, setChildCliked, weatherData}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width : 600px)');

  return (
  <div className={classes.mapContainer}>
      <GoogleMapReact 
        bootstrapURLKeys={{ key : process.env.REACT_APP_GOOGLE_MAPS_API_KEY}} 
        defaultCenter={coordinates} 
        center={coordinates} 
        defaultZoom={14} 
        margin={[50,50,50,50]} 
        options={''}
        onChange={
          event => {
            setCoordinates({ lat : event.center.lat, lng : event.center.lng})
            setBounds({ ne : event.marginBounds.ne, sw : event.marginBounds.sw})
            }
          }
        onChildClick={(child) =>  setChildCliked(child)} > 
      {
        places?.map((place, index) => (
          <div className={classes.markerContainer} lat={(Number(place.latitude))} lng={Number(place.longitude)} key={index}>
            {
              !isDesktop ? (
                <LocationOnOutlinedIcon color='primary'/>
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant='subtitle1'>{place.name}</Typography>
                  <img className={classes.pointer} src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} alt={place.name} />
                  <Rating size='small' value={Number(place.rating)} readOnly />
                </Paper>
              )
            }
          </div>
        )) }
        {
          weatherData?.list?.map((data, index) => (
            <div key={index} lat={data.coord.lat} lng={data.coord.lon}>
              <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt='weather' height='100'/>
            </div>
          ))
        }
      </GoogleMapReact>
  </div>);
};

export default Map;
