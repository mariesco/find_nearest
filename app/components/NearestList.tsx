import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { City } from "@/types"

export default function NearestList({ cities }: {
  cities: City[]
}) {

  return (
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
  )
}

