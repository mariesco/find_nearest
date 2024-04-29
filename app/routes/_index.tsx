import NearestList from "@/components/NearestList";
import SearchInput from "@/components/SearchInput";
import { formatCityName } from "@/lib/formatCityName";
import getCities from "@/lib/getCities";
import { City } from "@/types";
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Find Nearest" },
    { name: "description", content: "Find Nearest!" },
  ];
};

export const loader = ({request}: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const selectedCity = url.searchParams.get('selectedCity');
  const selectedLat = parseFloat(url.searchParams.get('lat') as string);
  const selectedLng = parseFloat(url.searchParams.get('lng') as string);
  const pageToNavigate = Number(url.searchParams.get('page'));

  const { cities, citiesTableInfo } = getCities({ pageToNavigate, selectedLat, selectedLng }); 
  
  return json({ 
    cities,
    citiesTableInfo,
    selectedCityName: selectedCity ? formatCityName(selectedCity) : ''
  })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const pageToNavigate = formData.get('pageToNavigate') as string;
  if(pageToNavigate){
    const url = new URL(request.url);
    url.searchParams.set('page', pageToNavigate);
    return redirect(url.toString());
  }


  const selectedCity = formData.get("selectedCity") as string;
  const selectedLat = formData.get("selectedLat") as string;
  const selectedLng = formData.get("selectedLng") as string;

  if(selectedCity){
    return redirect(
      `/?selectedCity=${selectedCity}&lat=${selectedLat}&lng=${selectedLng}`
    )
  }

  const { allCities } = getCities({});

  const searchedCity = formData.get("searchedCity") as string;
  if(searchedCity){
    const possibleCitiesToSearch = allCities.filter(city => 
      city.name.toLowerCase().includes(searchedCity.toLowerCase())
    );

    if(possibleCitiesToSearch.length < 15){
      return json({ possibleCitiesToSearch });
    }
    return json({ possibleCitiesToSearch: possibleCitiesToSearch.slice(0,15) });
  }
  return null
}
export type IndexActionType = typeof action;

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <h1 className="pb-2 text-lg font-bold">Search your nearby city!</h1>
      <h3> Tu ciudad es: </h3>
      <SearchInput defaultSelectedCityName={data?.selectedCityName} />
      <NearestList 
        cities={data.cities} 
        citiesTableInfo={data?.citiesTableInfo} />
    </div>
  );
}
