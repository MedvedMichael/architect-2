import { ProvidedFlat } from "./provider";
import SearchQuery from "@interfaces/search-query-interface";

export abstract class Specification {
  constructor(protected query: SearchQuery) {}
  abstract isSatisfiedBy(item: ProvidedFlat): boolean;
}

export class MinSpecification extends Specification {
  isSatisfiedBy(item: ProvidedFlat) {
    return !this.query.minPrice || item.cost >= this.query.minPrice;
  }
}

export class MaxSpecification extends Specification {
  isSatisfiedBy(item: ProvidedFlat) {
    return !this.query.maxPrice || item.cost <= this.query.maxPrice;
  }
}

export class StreetContainsSpecification extends Specification {
  isSatisfiedBy(item: ProvidedFlat) {
    return (
      !this.query.street ||
      item.street.toLowerCase().includes(this.query.street.toLowerCase())
    );
  }
}

export class RoomsSpecification extends Specification {
  isSatisfiedBy(item: ProvidedFlat) {
    return !this.query.rooms || item.rooms === this.query.rooms;
  }
}
