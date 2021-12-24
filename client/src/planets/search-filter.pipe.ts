import { Pipe, PipeTransform } from "@angular/core";
import { Planet } from "./model/Planet";

@Pipe({
  name: "searchFilter",
})
export class SearchFilterPipe implements PipeTransform {
  transform(planets: Planet[], searchValue: string): Planet[] {
    if (!planets || !searchValue) {
      return planets;
    }

    return planets.filter(
      (planet) =>
        planet.planetName
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        planet.distInMillionsKM.fromEarth
          .toString()
          .includes(searchValue.toLocaleLowerCase()) ||
        planet.planetColor
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase()) ||
        planet.planetRadiusKM
          .toString()
          .includes(searchValue.toLocaleLowerCase()) ||
        planet.distInMillionsKM.fromSun
          .toString()
          .includes(searchValue.toLocaleLowerCase())
    );
  }
}
