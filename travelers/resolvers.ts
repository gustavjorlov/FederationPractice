type Traveler = {
  id: number;
  name: string;
  age: number;
  favourite_location: number;
};

const travelers: Array<Traveler> = [
  {
    id: 1,
    name: "Gustav",
    age: 36,
    favourite_location: 1,
  },
  {
    id: 2,
    name: "Sofia",
    age: 36,
    favourite_location: 1,
  },
  {
    id: 3,
    name: "Fredrik",
    age: 27,
    favourite_location: 2,
  },
];

export const resolvers = {
  Query: {
    allTravelers: () => travelers,
  },
  Traveler: {
    favourite_location: (context) => {
      return { id: context.favourite_location };
    },
  },
};
