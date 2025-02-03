import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  join__FieldSet: { input: any; output: any; }
  link__Import: { input: any; output: any; }
};

export type LatLon = {
  __typename?: 'LatLon';
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
};

export type Location = {
  __typename?: 'Location';
  coordinate?: Maybe<LatLon>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  allLocations?: Maybe<Array<Maybe<Location>>>;
  allTravelers?: Maybe<Array<Maybe<Traveler>>>;
};


export type QueryAllTravelersArgs = {
  overAge: Scalars['Int']['input'];
};

export type Traveler = {
  __typename?: 'Traveler';
  age?: Maybe<Scalars['Int']['output']>;
  favourite_location?: Maybe<Location>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export enum Join__Graph {
  Locations = 'LOCATIONS',
  Travelers = 'TRAVELERS'
}

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}

export type GetAllLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLocationsQuery = { __typename?: 'Query', allLocations?: Array<{ __typename?: 'Location', id: string, name?: string | null, coordinate?: { __typename?: 'LatLon', lat?: number | null, lon?: number | null } | null } | null> | null };

export type GetAllTravelersQueryVariables = Exact<{
  overAge: Scalars['Int']['input'];
}>;


export type GetAllTravelersQuery = { __typename?: 'Query', allTravelers?: Array<{ __typename?: 'Traveler', id?: string | null, name?: string | null, age?: number | null, favourite_location?: { __typename?: 'Location', id: string, name?: string | null, coordinate?: { __typename?: 'LatLon', lat?: number | null, lon?: number | null } | null } | null } | null> | null };


export const GetAllLocationsDocument = gql`
    query GetAllLocations {
  allLocations {
    id
    name
    coordinate {
      lat
      lon
    }
  }
}
    `;

/**
 * __useGetAllLocationsQuery__
 *
 * To run a query within a React component, call `useGetAllLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllLocationsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllLocationsQuery, GetAllLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllLocationsQuery, GetAllLocationsQueryVariables>(GetAllLocationsDocument, options);
      }
export function useGetAllLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllLocationsQuery, GetAllLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllLocationsQuery, GetAllLocationsQueryVariables>(GetAllLocationsDocument, options);
        }
export function useGetAllLocationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllLocationsQuery, GetAllLocationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllLocationsQuery, GetAllLocationsQueryVariables>(GetAllLocationsDocument, options);
        }
export type GetAllLocationsQueryHookResult = ReturnType<typeof useGetAllLocationsQuery>;
export type GetAllLocationsLazyQueryHookResult = ReturnType<typeof useGetAllLocationsLazyQuery>;
export type GetAllLocationsSuspenseQueryHookResult = ReturnType<typeof useGetAllLocationsSuspenseQuery>;
export type GetAllLocationsQueryResult = Apollo.QueryResult<GetAllLocationsQuery, GetAllLocationsQueryVariables>;
export const GetAllTravelersDocument = gql`
    query GetAllTravelers($overAge: Int!) {
  allTravelers(overAge: $overAge) {
    id
    name
    age
    favourite_location {
      id
      name
      coordinate {
        lat
        lon
      }
    }
  }
}
    `;

/**
 * __useGetAllTravelersQuery__
 *
 * To run a query within a React component, call `useGetAllTravelersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTravelersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTravelersQuery({
 *   variables: {
 *      overAge: // value for 'overAge'
 *   },
 * });
 */
export function useGetAllTravelersQuery(baseOptions: Apollo.QueryHookOptions<GetAllTravelersQuery, GetAllTravelersQueryVariables> & ({ variables: GetAllTravelersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTravelersQuery, GetAllTravelersQueryVariables>(GetAllTravelersDocument, options);
      }
export function useGetAllTravelersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTravelersQuery, GetAllTravelersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTravelersQuery, GetAllTravelersQueryVariables>(GetAllTravelersDocument, options);
        }
export function useGetAllTravelersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllTravelersQuery, GetAllTravelersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTravelersQuery, GetAllTravelersQueryVariables>(GetAllTravelersDocument, options);
        }
export type GetAllTravelersQueryHookResult = ReturnType<typeof useGetAllTravelersQuery>;
export type GetAllTravelersLazyQueryHookResult = ReturnType<typeof useGetAllTravelersLazyQuery>;
export type GetAllTravelersSuspenseQueryHookResult = ReturnType<typeof useGetAllTravelersSuspenseQuery>;
export type GetAllTravelersQueryResult = Apollo.QueryResult<GetAllTravelersQuery, GetAllTravelersQueryVariables>;