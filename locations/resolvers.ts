type Location = {
  id: number;
  name: string;
  coordinate: {
    lat: number;
    lon: number;
  };
};

const locations: Array<Location> = [
  {
    id: 1,
    name: "Alingsås",
    coordinate: { lat: 12.45, lon: 52.1 },
  },
  {
    id: 2,
    name: "Null Island",
    coordinate: { lat: 0, lon: 0 },
  },
];

export const resolvers = {
  Query: {
    allLocations: () => locations,
  },
  Location: {
    __resolveReference: (context: { id: string }) => {
      return locations.find((location) => location.id === Number(context.id));
    },
  },
};
