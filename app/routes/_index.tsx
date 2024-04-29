import NearestList from "@/components/NearestList";
import SearchInput from "@/components/SearchInput";
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
  const cities = getCities(); 
  const url = new URL(request.url)
  const selectedCity = url.searchParams.get('selectedCity');

  if(!selectedCity){
    //TOOD: Send all cities with pagination
    return json({ 
      cities: [cities[0], cities[1], cities[2]],
      selectedCity: '' 
    })
  } else {
    //TODO: Filter cities for proximity
    const nearbyCities: City[] = [];
    return json({ 
      cities: nearbyCities,
      selectedCity 
    });
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const selectedCity = formData.get("selectedCity") as string;
  const selectedLat = formData.get("selectedLat") as string;
  const selectedLng = formData.get("selectedLng") as string;

  if(selectedCity){
    return redirect(
      `/?selectedCity=${selectedCity}&lat=${selectedLat}&lng=${selectedLng}`
    )
  }

  const allCities = getCities();
  const searchedCity = formData.get("searchedCity") as string;
  const possibleCitiesToSearch = allCities.filter(city => 
    city.name.toLowerCase().includes(searchedCity.toLowerCase())
  );

  if(possibleCitiesToSearch.length < 15){
    return json({ possibleCitiesToSearch });
  }
  return json({ possibleCitiesToSearch: possibleCitiesToSearch.slice(0,15) });
}
export type IndexActionType = typeof action;

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="p-6">
      <h1 className="pb-2 text-lg font-bold">Search your nearby city!</h1>
      <h3> Tu ciudad es: </h3>
      <SearchInput defaultSelectedCity={data?.selectedCity} />
      <NearestList cities={data.cities} />
    </div>
  );
}
