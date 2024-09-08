'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker, InfoWindow } from '@react-google-maps/api';
import ReactGA from 'react-ga4';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// map size
const mapContainerStyle = {
    height: "100vh",
    width: "80vw"
};

// default center
const center = {
    lat: 40.712776,
    lng: -74.005974
};

const mapOptions = {
    zoom: 12,
    center: center,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false,
};

function GoogleMaps() {
    const [map, setMap] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(center);
    const [destinationPosition, setDestinationPosition] = useState(null);
    const [autocompleteDestination, setAutocompleteDestination] = useState(null);
    const [lodgingMarkers, setLodgingMarkers] = useState([]);
    const [wheelchairMarkers, setWheelchairMarkers] = useState([]); // New state for wheelchair spots
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [placeDetails, setPlaceDetails] = useState([]);

    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: '/google_maps',
            title: "Hotel Markers Page Using Google Maps API"
        });
    }, []);

    const fetchPlaceDetails = (markers) => {
        const service = new window.google.maps.places.PlacesService(map);
        const detailRequests = markers.map(marker =>
            new Promise((resolve, reject) => {
                service.getDetails({ placeId: marker.placeId }, (place, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        resolve({
                            ...marker,
                            details: place
                        });
                    } else {
                        reject(new Error('Place details request failed: ' + status));
                    }
                });
            })
        );
        Promise.all(detailRequests)
            .then(results => {
                setPlaceDetails(results);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onPlaceChanged = (autocomplete) => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
            const location = place.geometry.location;
            setDestinationPosition({
                lat: location.lat(),
                lng: location.lng(),
            });
            map.panTo(location);
            searchLodging(location);
            searchWheelchairSpots(location); // Search for wheelchair spots
        } else {
            console.log('No details available for input: ' + place.name);
        }
    };

    const searchLodging = (location) => {
        const service = new window.google.maps.places.PlacesService(map);

        const request = {
            location: location,
            radius: '2500',
            type: ['lodging']
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const markers = results.map((place) => ({
                    position: place.geometry.location,
                    name: place.name,
                    placeId: place.place_id
                }));
                setLodgingMarkers(markers);
                fetchPlaceDetails(markers);
            } else {
                console.error('Places search failed: ', status);
            }
        });
    };

    const searchWheelchairSpots = (location) => {
        const service = new window.google.maps.places.PlacesService(map);

        const request = {
            location: location,
            radius: '2500',
            keyword: 'wheelchair accessible'
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const markers = results.map((place) => ({
                    position: place.geometry.location,
                    name: place.name,
                    placeId: place.place_id
                }));
                setWheelchairMarkers(markers);
            } else {
                console.error('Places search for wheelchair spots failed: ', status);
            }
        });
    };

    const handleMarkerClick = (placeId) => {
        const service = new window.google.maps.places.PlacesService(map);
        service.getDetails({ placeId: placeId }, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setSelectedPlace(place);
            } else {
                console.error('Place details request failed: ', status);
            }
        });
    };

    return (
        <LoadScript googleMapsApiKey={API_KEY} libraries={['places']}>
            <main className='w-full h-screen flex flex-row overflow-y-hidden'>
                <div className='w-[20%] overflow-auto bg-[#00aa6c] shadow-inner'>
                    <h1 className='text-white underline font-extrabold text-center p-4 text-3xl font-mono'>Places to Stay</h1>
                    {placeDetails.map((place, index) => (
                        <div className='w-[90%] text-black flex flex-col mx-auto items-center justify-center my-6 rounded-2xl text-xl shadow-2xl bg-white p-6' key={index}>
                            <h1 className='mb-2 font-bold'>{place.details.name}</h1>
                            <div className='flex flex-row items-center justify-center'>
                                {place.details.photos && (
                                    <img
                                        src={place.details.photos[0].getUrl()}
                                        alt={place.details.name}
                                        style={{ width: "5vw", height: "5vw" }}
                                        className='rounded-lg'
                                    />
                                )}
                                <div className='text-center p-3 text-xl justify-center items-center flex flex-col'>
                                    <p className=''>{place.details.vicinity}</p>
                                    <p>Rating: {place.details.rating}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    options={mapOptions}
                    onLoad={onLoad}
                >
                    <Marker position={markerPosition} />
                    {destinationPosition && <Marker position={destinationPosition} />}
                    {lodgingMarkers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker.position}
                            onClick={() => handleMarkerClick(marker.placeId)}
                        />
                    ))}
                    {wheelchairMarkers.map((marker, index) => (
                        <Marker
                            key={`wheelchair-${index}`}
                            position={marker.position}
                            onClick={() => handleMarkerClick(marker.placeId)}
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                            }}
                        />
                    ))}
                    {selectedPlace && (
                        <InfoWindow
                            position={{
                                lat: selectedPlace.geometry.location.lat(),
                                lng: selectedPlace.geometry.location.lng(),
                            }}
                            onCloseClick={() => setSelectedPlace(null)}
                        >
                            <div className='items-center text-black justify-center text-lg flex-col flex gap-y-2'>
                                <h2>{selectedPlace.name}</h2>
                                <p>{selectedPlace.vicinity}</p>
                                <p>Rating: {selectedPlace.rating}</p>
                                {selectedPlace.photos && (
                                    <img
                                        src={selectedPlace.photos[0].getUrl()}
                                        alt={selectedPlace.name}
                                        style={{ width: "100%", height: "150px" }}
                                    />
                                )}
                            </div>
                        </InfoWindow>
                    )}
                    <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1 }}>
                        <Autocomplete
                            className='text-2xl'
                            onLoad={(autocomplete) => setAutocompleteDestination(autocomplete)}
                            onPlaceChanged={() => onPlaceChanged(autocompleteDestination)}
                        >
                            <input
                                id="origin-autocomplete"
                                type="text"
                                placeholder="Search for places"
                                className='p-5 w-96 h-16 text-2xl text-black'
                            />
                        </Autocomplete>
                    </div>
                </GoogleMap>
            </main>
        </LoadScript>
    );
}

export default GoogleMaps;
