export type Traveler = {
  id: number;
  name: string;
  age: number;
  icecream_taste: string;
  favourite_location?: number;
};

export const travelers: Array<Traveler> = [
  {
    id: 1,
    name: "Gustav",
    age: 36,
    favourite_location: 1,
    icecream_taste: "Chocolate",
  },
  {
    id: 2,
    name: "Sofia",
    age: 36,
    icecream_taste: "Lemon",
  },
  {
    id: 3,
    name: "Fredrik",
    age: 27,
    favourite_location: 2,
    icecream_taste: "Mint",
  },
];

export const resolvers = {
  Query: {
    allTravelers: (context: any, args: any) => {
      return travelers.filter((t) => t.age > args.overAge);
    },
  },
  Traveler: {
    favourite_location: (context: Traveler) => {
      return { id: context.favourite_location };
    },
  },
};
