import { FC } from "react";
import {
  Location,
  Traveler,
  useGetAllLocationsQuery,
  useGetAllTravelersQuery,
} from "./generated/graphql.ts";

const App: FC = () => {
  const {
    data: locationsData,
    loading: locationsLoading,
    error: locationsError,
  } = useGetAllLocationsQuery();
  const {
    data: travelersData,
    loading: travelersLoading,
    error: travelersError,
  } = useGetAllTravelersQuery({
    variables: { overAge: 18 },
  });

  if (locationsLoading || travelersLoading) {
    return <div>Loading...</div>;
  }
  if (locationsError || travelersError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <h2>Locations</h2>
      <ul>
        {locationsData?.allLocations?.map(
          (location: Location | null) =>
            location && (
              <li key={location.id}>
                {location.name} ({location.coordinate?.lat},{" "}
                {location.coordinate?.lon})
              </li>
            )
        )}
      </ul>

      <h2>Travelers (Over 18)</h2>
      <ul>
        {travelersData?.allTravelers?.map(
          (traveler: Traveler | null) =>
            traveler && (
              <li key={traveler.id}>
                {traveler.name} (Age: {traveler.age})
                {traveler.favourite_location && (
                  <div>
                    Favorite Location: {traveler.favourite_location.name}
                  </div>
                )}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default App;
