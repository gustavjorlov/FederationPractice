# React + TypeScript + Vite

## Adding New GraphQL Queries

To add new GraphQL queries to the application:

1. Define your query in `src/graphql/operations.graphql`:
   ```graphql
   query YourNewQuery($param: Type!) {
     queryField(param: $param) {
       field1
       field2
       nestedField {
         subField
       }
     }
   }
   ```

2. Generate TypeScript types and hooks:
   ```bash
   npm run codegen
   ```
   This will:
   - Read the schema from `router/superschema.graphql`
   - Generate TypeScript types for your query
   - Create a React hook (e.g., `useYourNewQueryQuery`)
   - Output everything to `src/generated/graphql.ts`

3. Use the generated hook in your components:
   ```typescript
   import { useYourNewQueryQuery } from '../generated/graphql';

   function YourComponent() {
     const { data, loading, error } = useYourNewQueryQuery({
       variables: {
         param: value
       }
     });
   }
   ```

The codegen configuration (`codegen.ts`) automatically generates TypeScript types and React hooks for all queries defined in `.graphql` files under the `src` directory.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
