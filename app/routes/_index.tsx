import { Combobox } from "@/components/Combobox";
import { NearestList } from "@/components/NearestList";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Find Nearest" },
    { name: "description", content: "Find Nearest!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Combobox/>
      <NearestList />
    </div>
  );
}
