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
  {
    id: 4,
    name: "Emma",
    age: 29,
    favourite_location: 3,
    icecream_taste: "Vanilla",
  },
  {
    id: 5,
    name: "Lucas",
    age: 42,
    favourite_location: 4,
    icecream_taste: "Strawberry",
  },
  {
    id: 6,
    name: "Alice",
    age: 31,
    favourite_location: 5,
    icecream_taste: "Pistachio",
  },
  {
    id: 7,
    name: "Oscar",
    age: 25,
    favourite_location: 3,
    icecream_taste: "Coffee",
  },
  {
    id: 8,
    name: "Maja",
    age: 33,
    favourite_location: 4,
    icecream_taste: "Rocky Road",
  },
  {
    id: 9,
    name: "Erik",
    age: 38,
    favourite_location: 5,
    icecream_taste: "Cookie Dough",
  },
  {
    id: 10,
    name: "Linnea",
    age: 28,
    favourite_location: 6,
    icecream_taste: "Butter Pecan",
  },
  {
    id: 11,
    name: "William",
    age: 45,
    favourite_location: 7,
    icecream_taste: "Rum Raisin",
  },
  {
    id: 12,
    name: "Olivia",
    age: 23,
    favourite_location: 3,
    icecream_taste: "Mango",
  },
  {
    id: 13,
    name: "Hugo",
    age: 34,
    favourite_location: 8,
    icecream_taste: "Caramel",
  }
];

export const resolvers = {
  Query: {
    allTravelers: (_context: any, args: any) => {
      return travelers.filter((t) => t.age > args.overAge);
    },
  },
  Traveler: {
    favourite_location: (context: Traveler) => {
      return { id: context.favourite_location };
    },
    __resolveReference: (context: { id: string }) => {
      return travelers.find((traveler) => traveler.id === Number(context.id));
    },
  },
};
