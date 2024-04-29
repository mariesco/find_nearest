import * as React from "react"
import { useFetcher } from "@remix-run/react"
import { PaperPlaneIcon } from "@radix-ui/react-icons"

import useMediaQuery from "@/lib/useMediaQuery"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { City } from "@/types"
import { IndexActionType } from "@/routes/_index"
import { normalizeCityName } from "@/lib/normalizeCityName"
import extractNumberAfterPlus from "@/lib/extractNumberAfterPlus"

export default function SearchInput({
  defaultSelectedCity
}: {
    defaultSelectedCity: City 
  }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedCity, setSelectedCity] = React.useState<City | null>(
    null
  )
  //TODO: If urlParams have selectedCity, add default value to button

  const SearchButton = () => {
    return (
      <div className="flex">
        <PaperPlaneIcon className="pt-1 mr-2"/>
        <p className=""> Search your city </p>
      </div>
    )
  }

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-self-center">
            {selectedCity ? <>{selectedCity.name}</> : <SearchButton />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <PossibleCitiesList setOpen={setOpen} setSelectedCity={setSelectedCity} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-self-center">
            {selectedCity ? <>{selectedCity.name}</> : <SearchButton />}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <PossibleCitiesList setOpen={setOpen} setSelectedCity={setSelectedCity} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function PossibleCitiesList({
  setOpen,
  setSelectedCity,
}: {
  setOpen: (open: boolean) => void
  setSelectedCity: (city: City | null) => void
}) {

  const fetcher = useFetcher<IndexActionType>();
  const possibleCitiesToSearch = 
            fetcher.data ? 
            fetcher.data.possibleCitiesToSearch :
            []

  const onSelectPossibleCity = (citySelected: string) => {
   
    const possibleCityIndex = extractNumberAfterPlus(citySelected);
    if(possibleCityIndex){
      const cityToSearch = 
        possibleCitiesToSearch[possibleCityIndex]

      setSelectedCity(cityToSearch)
      fetcher.submit({ 
        selectedCity: normalizeCityName(cityToSearch.name),
        selectedLng: cityToSearch.lng,
        selectedLat: cityToSearch.lat
      }, { method: 'post' });
    }

    setOpen(false);
  }

  return (
    <Command>
      <fetcher.Form method="post">
        <CommandInput 
          name="searchedCity" 
          placeholder="Find your city..." 
          onChangeCapture={e => fetcher.submit(e.currentTarget.form, {
            method: 'POST'
          })}
          />
        <CommandList>
          <CommandEmpty>No cities found.</CommandEmpty>
          <CommandGroup>
            {possibleCitiesToSearch.map((city, i) => (
              <CommandItem
                key={city.name + i}
                value={`${city.name}+${i}`}
                onSelect={onSelectPossibleCity}
              >
                {city.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </fetcher.Form>
    </Command>
  )
}

