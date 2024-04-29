export type City = {
  country: string;
  name: string;
  lat: string;
  lng: string;
}

export type CitiesTableInfoType = {
  currentPage: number,
  pages: number,
}

export type NearestListProps = {
  cities: City[],
  citiesTableInfo: CitiesTableInfoType
}
