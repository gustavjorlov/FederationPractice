# Federation Practice

This project demonstrates a GraphQL Federation setup with a React client and multiple microservices.

## Project Structure

```
.
├── client/          # React frontend application
└── servers/         # Backend microservices
    ├── locations/   # Location service
    ├── router/      # Apollo Router (Federation Gateway)
    └── travelers/   # Travelers service
```

## Technologies Used

### Client
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Apollo Client** for GraphQL communication
- **GraphQL Code Generator** for type-safe GraphQL operations

### Server
- **Apollo Federation v2** for distributed GraphQL
- **Apollo Router** as the federation gateway
- Multiple subgraphs (locations, travelers) implementing different domains
- TypeScript for type-safe backend development
- Docker Compose for containerization and service orchestration

## Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- Docker and Docker Compose
- pnpm, npm, or yarn

### Starting the Backend Services

1. Start the Apollo Router:
```bash
cd servers/router
docker-compose up
```

2. Start the Locations service:
```bash
cd servers/locations
docker-compose up
```

3. Start the Travelers service:
```bash
cd servers/travelers
docker-compose up
```

The GraphQL Gateway will be available at `http://localhost:4000` with the following features:
- GraphQL Sandbox enabled for testing
- CORS configured for local development
- Introspection enabled
- Subgraph error propagation

### Starting the Client

1. Install dependencies:
```bash
cd client
npm install
```

2. Generate TypeScript types from GraphQL schema:
```bash
npm run generate
```

3. Start the development server:
```bash
npm run dev
```

The client application will be available at `http://localhost:5173`

## Development Workflow

1. **GraphQL Schema Changes**:
   - Update the relevant subgraph schema (`servers/*/schema.graphql`)
   - Update the corresponding resolvers
   - Restart the affected service

2. **Client-side Development**:
   - Write GraphQL operations in `src/graphql/operations.graphql`
   - Run `npm run generate` to update TypeScript types
   - Use generated hooks in your React components

3. **Adding New Features**:
   - For new entities: Create a new subgraph or extend existing ones
   - For new queries/mutations: Add to the relevant subgraph schema
   - Update the client's GraphQL operations accordingly

## Available Scripts

### Client
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run generate`: Generate TypeScript types from GraphQL schema
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Architecture Notes

- The project uses Apollo Federation 2.0 for distributed GraphQL
- Each subgraph is responsible for its own domain
- The Apollo Router handles query planning and execution across subgraphs
- Type definitions are shared between subgraphs using federation directives
- The client uses generated TypeScript types for type-safe GraphQL operations
