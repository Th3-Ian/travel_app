import React from 'react';
import { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './API';
import Header from './components/Header/Header';
import List from './components/List/List';
import { Map } from './components/Map/Map';

function App() {
  const [places, setPlaces] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
	const [childClicked, setChildClicked] = useState(null)
	const [isLoading, setIsLoading] = useState(false);
	const [type, setType] = useState('restaurants')
	const [rating, setRating] = useState('')


	useEffect(() => {
		navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
			setCoordinates({ lat: latitude, lng: longitude })
		})
	}, [])

	useEffect(() => {
		const filteredPlaces = places.filter((place) => places.rating > rating)

		setFilteredPlaces(filteredPlaces)
	}, [rating])

  useEffect(() => {
		setIsLoading(true)
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      setPlaces(data);
			setFilteredPlaces([])
			setIsLoading(false);
    });
  }, [type, coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
						places={filteredPlaces.length ? filteredPlaces : places}
						childClicked={childClicked}
						isLoading={isLoading}
						type={type}
						rating={rating}
						setType={setType}
						setRating={setRating} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
						places={filteredPlaces.length ? filteredPlaces : places}
						setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
