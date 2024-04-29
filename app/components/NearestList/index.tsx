import { useFetcher } from "@remix-run/react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import { NearestListProps } from "@/types"
import { IndexActionType } from "@/routes/_index";

export default function NearestList({ cities, citiesTableInfo }: 
  NearestListProps 
) {
  const fetcher = useFetcher<IndexActionType>();

  return (
    <>
      <Table>
        {
          cities.length === 0 ?
          <TableCaption>No nearby cities found.</TableCaption>
          :
          <>
            <TableCaption>A list of your nearest cities.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">City</TableHead>
                <TableHead>Lat</TableHead>
                <TableHead>Lng</TableHead>
                <TableHead className="text-right">Country</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cities.map((city) => (
                <TableRow key={city.name}>
                  <TableCell className="font-medium">{city.name}</TableCell>
                  <TableCell>{city.lat}</TableCell>
                  <TableCell>{city.lng}</TableCell>
                  <TableCell className="text-right">{city.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </>
        }
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {citiesTableInfo.currentPage} of{" "}
          {citiesTableInfo.pages}.
        </div>
        <fetcher.Form method="post">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              name="pageToNavigate"
              value={citiesTableInfo.currentPage - 1}
              onClick={(e) => fetcher.submit((e.target as HTMLButtonElement).value)}
              disabled={citiesTableInfo.currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              name="pageToNavigate"
              value={citiesTableInfo.currentPage + 1}
              onClick={(e) => fetcher.submit((e.target as HTMLButtonElement).value)}
              disabled={citiesTableInfo.currentPage === citiesTableInfo.pages}
            >
              Next
            </Button>
          </div>
        </fetcher.Form>
      </div>
    </>
  )
}

