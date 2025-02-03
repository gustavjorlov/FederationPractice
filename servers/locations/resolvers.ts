type Location = {
  id: number;
  name: string;
  coordinate: {
    lat: number;
    lon: number;
  };
  visitors: Array<number>;
};

const locations: Array<Location> = [
  {
    id: 1,
    name: "Alingsås",
    coordinate: { lat: 12.45, lon: 52.1 },
    visitors: [1],
  },
  {
    id: 2,
    name: "Null Island",
    coordinate: { lat: 0, lon: 0 },
    visitors: [1, 3],
  },
  {
    id: 3,
    name: "Stockholm",
    coordinate: { lat: 59.33, lon: 18.07 },
    visitors: [4, 7, 12],
  },
  {
    id: 4,
    name: "Gothenburg",
    coordinate: { lat: 57.71, lon: 11.97 },
    visitors: [5, 8],
  },
  {
    id: 5,
    name: "Malmö",
    coordinate: { lat: 55.61, lon: 13.00 },
    visitors: [6, 9],
  },
  {
    id: 6,
    name: "Uppsala",
    coordinate: { lat: 59.86, lon: 17.64 },
    visitors: [10],
  },
  {
    id: 7,
    name: "Västerås",
    coordinate: { lat: 59.62, lon: 16.55 },
    visitors: [11],
  },
  {
    id: 8,
    name: "Örebro",
    coordinate: { lat: 59.27, lon: 15.21 },
    visitors: [13],
  },
  {
    id: 9,
    name: "Linköping",
    coordinate: { lat: 58.41, lon: 15.62 },
    visitors: [2],
  },
  {
    id: 10,
    name: "Helsingborg",
    coordinate: { lat: 56.05, lon: 12.69 },
    visitors: [],
  },
  {
    id: 11,
    name: "Jönköping",
    coordinate: { lat: 57.78, lon: 14.16 },
    visitors: [],
  },
  {
    id: 12,
    name: "Norrköping",
    coordinate: { lat: 58.59, lon: 16.18 },
    visitors: [],
  }
];

export const resolvers = {
  Query: {
    allLocations: () => locations,
  },
  Location: {
    allVisitors: (context: Location) => {
      return context.visitors.map((id) => ({ id }));
    },
    __resolveReference: (context: { id: string }) => {
      return locations.find((location) => location.id === Number(context.id));
    },
  },
};
