import { City } from '@/types';
import allCities from '../../public/cities.json';
import { getDistanceFromLatLonInKm } from './getDistanceFromLatLng';

const getCities = ({ pageToNavigate, selectedLat, selectedLng }: {
  pageToNavigate?: number,
  selectedLat?: number | null,
  selectedLng?: number | null 
}) => {

  const itemsPerPage = 10;
  let cities, citiesTableInfo; 

  if(selectedLat && selectedLng){
    const nearestCities: {city: City, distance: number}[] = [];

      allCities.forEach((city: City) => {
        const distance = getDistanceFromLatLonInKm(selectedLat, selectedLng, parseFloat(city.lat), parseFloat(city.lng));
        if (city.lat !== selectedLat.toString() || city.lng !== selectedLng.toString()) {
          if (nearestCities.length < 4) {
            nearestCities.push({ city, distance });
            nearestCities.sort((a, b) => a.distance - b.distance);
          } else if (distance < nearestCities[3].distance) {
            nearestCities[3] = { city, distance };
            nearestCities.sort((a, b) => a.distance - b.distance);
          }
        }
      });


    citiesTableInfo = {
      currentPage: pageToNavigate ? pageToNavigate : 1,
      pages: Math.ceil(nearestCities.length / itemsPerPage)
    }
    const offset = (citiesTableInfo.currentPage - 1) * itemsPerPage; 

    cities = nearestCities.map(n => n.city).slice(offset, offset + itemsPerPage)
  } else {

    citiesTableInfo = {
      currentPage: pageToNavigate ? pageToNavigate : 1,
      pages: Math.ceil(allCities.length / itemsPerPage)
    }
    const offset = (citiesTableInfo.currentPage - 1) * itemsPerPage; 
    cities = allCities.slice(offset, offset + itemsPerPage);
  }

  return { 
    cities,
    allCities,
    citiesTableInfo
  }
}

export default getCities;
