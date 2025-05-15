# @mixcore/sdk-client


<h3></h3>

![npm](https://img.shields.io/npm/v/@mixcore/sdk-client)
![Bundle Size](https://img.shields.io/bundlephobia/min/@mixcore/sdk-client)
![Downloads](https://img.shields.io/npm/dm/@mixcore/sdk-client)

Official JavaScript/TypeScript SDK for Mixcore services.


## Installation

```bash
npm install @mixcore/sdk-client
# or
yarn add @mixcore/sdk-client
# or
pnpm add @mixcore/sdk-client
```

## Usage

```typescript
import { MixcoreClient } from '@mixcore/sdk-client';

const client = new MixcoreClient({
  endpoint: 'https://your-api-endpoint.com',
  tokenType: 'Bearer',
  tokenKey: 'custom_access_token_key',
  refreshTokenKey: 'custom_refresh_token_key' // optional
  ...
});

// Example: Get authSessionInfo
const authSessionInfo = await client.login();
console.log(authSessionInfo);
```

## Development

This package is built using TypeScript and bundled with tsup.

### Available Scripts

- `pnpm build` - Build the package
- `pnpm dev` - Build the package in watch mode
- `pnpm lint` - Run ESLint
- `pnpm clean` - Clean build artifacts

# Mixcore Authentication

The `MixcoreAuth` class provides authentication and user management functionality for the Mixcore system. It handles user login, registration, profile management, and token management.

## Initialization

The `MixcoreAuth` class is automatically initialized with the `MixcoreClient`:

```typescript
import { MixcoreClient } from '@mixcore/sdk-client';

const client = new MixcoreClient({
  endpoint: 'https://your-api-endpoint.com',
  tokenType: 'Bearer',
  tokenKey: 'custom_access_token_key',
  refreshTokenKey: 'custom_refresh_token_key' // optional
});

// Access auth methods through the client
const auth = client.auth;
```

## Login

Authenticate a user with their credentials:

```typescript
// Basic login
const loginData = {
  username: 'user@example.com',
  password: 'your-password'
};

const tokenInfo = await auth.login(loginData);
console.log('Login successful:', tokenInfo);

// Login with callback
await auth.login(loginData, {
  success: (data) => {
    console.log('Login successful:', data);
  },
  error: (error) => {
    console.error('Login failed:', error);
  },
  finally: () => {
    console.log('Login attempt completed');
  }
});
```

## Registration

Register a new user account:

```typescript
const userData = {
  username: 'newuser',
  email: 'newuser@example.com',
  password: 'secure-password',
  // other registration fields
};

await auth.register(userData, {
  success: () => {
    console.log('Registration successful');
  },
  error: (error) => {
    console.error('Registration failed:', error);
  }
});
```

## Logout

Log out the current user:

```typescript
// Basic logout
auth.logout();

// Logout with callback
auth.logout(() => {
  console.log('Logged out successfully');
  // Perform post-logout actions
});
```

## User Profile

Access and manage the current user's profile:

```typescript
// Get current user profile
const profile = await auth.initUserData();
console.log('Current user:', profile);

// Access current user info
console.log('Username:', auth.currentUser?.username);
console.log('Email:', auth.currentUser?.email);
```

## Token Management

The auth class automatically handles token management:

```typescript
// Access token information
console.log('Access token:', auth.tokenInfo?.accessToken);
console.log('Token type:', auth.tokenInfo?.tokenType);
console.log('Expires in:', auth.tokenInfo?.expiresIn);
```

## Security Features

The auth class includes several security features:

1. **Encrypted Login**: Login requests are automatically encrypted using AES encryption
2. **Secure Token Storage**: Tokens are stored securely in local storage
3. **Token Type Configuration**: Supports custom token types (default: 'Bearer')
4. **Refresh Token Support**: Optional refresh token functionality

## Error Handling

All authentication methods support error handling:

```typescript
try {
  await auth.login(loginData);
} catch (error) {
  console.error('Authentication error:', error);
  // Handle specific error cases
}
```

## Best Practices

1. **Secure Storage**: Always use HTTPS endpoints
2. **Token Management**: Let the SDK handle token storage and refresh
3. **Error Handling**: Implement proper error handling for all auth operations
4. **Session Management**: Use the provided logout method to properly clear sessions
5. **Profile Updates**: Use `initUserData()` to refresh user profile information when needed

## API Reference

### Properties

- `client`: Reference to the parent MixcoreClient instance
- `tokenInfo`: Current token information
- `currentUser`: Current user profile information
- `config`: Authentication configuration

### Methods

- `login(request: ILoginRequest, callBack?: IActionCallback<ITokenInfo>): Promise<ITokenInfo>`
  - Authenticates a user and returns token information
  - Supports encrypted login requests
  - Handles token storage automatically

- `register(userData: IRegisterAccountRequest, callBack?: IActionCallback<void>): Promise<void>`
  - Registers a new user account
  - Returns a promise that resolves on successful registration

- `logout(callback?: () => void): void`
  - Logs out the current user
  - Clears all authentication tokens and user data
  - Optional callback for post-logout actions

- `initUserData(): Promise<IProfile>`
  - Initializes or refreshes the current user's profile data
  - Returns the user profile information

### Types

```typescript
interface ILoginRequest {
  username?: string;
  email?: string;
  password: string;
  // other login fields
}

interface IRegisterAccountRequest {
  username: string;
  email: string;
  password: string;
  // other registration fields
}

interface ITokenInfo {
  accessToken: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
}

interface IProfile {
  id: string;
  username: string;
  email: string;
  // other profile fields
}

interface IActionCallback<T> {
  success?: (data: T) => void;
  error?: (error: any) => void;
  finally?: () => void;
}
```




# Mixcore Database

This SDK provides a convenient way to interact with the Mixcore database system through TypeScript/JavaScript. The `MixcoreDatabase` class offers a complete set of CRUD operations and data export functionality.



## Initialization

First, you need to initialize the Mixcore client and create a database instance:

```typescript
import { MixcoreClient, MixcoreDatabase } from '@mixcore/sdk-client';

// Initialize the client
const client = new MixcoreClient({
  // Your client configuration
});

// Access the database via client
client.data.getData('')

// Or Create a database instance
const database = new MixcoreDatabase(client);
```

## Basic Usage

### Retrieving Data

To fetch data from a database with pagination and filtering:

```typescript
import { MixQuery } from '@mixcore/sdk-client';

// Create a query
const query = new MixQuery({
  pageIndex: 1,
  pageSize: 10,
  // Add filters, sorting, etc.
});

// Fetch data
const result = await database.getData<YourDataType>(
  'your-database-name',
  query
);

// Handle the paginated result
console.log(result.data); // Array of items
console.log(result.totalItems); // Total number of items
```

### Creating/Updating Data

To create a new record:

```typescript
const newData = {
  // Your data properties
};

const result = await database.postData<YourDataType>(
  'your-database-name',
  undefined, // No ID for new records
  newData
);
```

To update an existing record:

```typescript
const updatedData = {
  // Updated properties
};

const result = await database.postData<YourDataType>(
  'your-database-name',
  'record-id', // ID of the record to update
  updatedData
);
```

### Partial Updates

To update specific fields of a record:

```typescript
const partialUpdate = {
  // Only the fields you want to update
};

const result = await database.patchData<YourDataType>(
  'your-database-name',
  'record-id',
  partialUpdate
);
```

To update multiple records at once:

```typescript
const updates = [
  { id: 'id1', /* updated fields */ },
  { id: 'id2', /* updated fields */ }
];

const result = await database.patchManyData<YourDataType>(
  'your-database-name',
  updates
);
```

### Deleting Data

To delete a record:

```typescript
const result = await database.deleteData<YourDataType>(
  'your-database-name',
  'record-id'
);
```

### Exporting Data

To export data based on specific criteria:

```typescript
const exportQuery = new MixQuery({
  // Your export criteria
});

const result = await database.exportData<YourDataType>(
  'your-database-name',
  exportQuery
);
```

## Using Callbacks

All methods support optional callback functions for handling success, errors, and completion:

```typescript
await database.getData<YourDataType>(
  'your-database-name',
  query,
  {
    success: (data) => {
      console.log('Data retrieved successfully:', data);
    },
    error: (error) => {
      console.error('Error retrieving data:', error);
    },
    finally: () => {
      console.log('Operation completed');
    }
  }
);
```

## Error Handling

All methods throw errors when the operation fails. You can catch these errors using try-catch blocks:

```typescript
try {
  const result = await database.getData<YourDataType>(
    'your-database-name',
    query
  );
} catch (error) {
  console.error('Operation failed:', error);
}
```

## Type Safety

The SDK is fully typed with TypeScript. Make sure to specify your data type when using the methods:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

// Type-safe database operations
const users = await database.getData<User>('users', query);
```

## Best Practices

1. Always specify the correct data type when using the methods
2. Use the MixQuery class for complex queries
3. Implement proper error handling
4. Use callbacks for better control flow
5. Consider using async/await for cleaner code
6. Keep your database system names consistent

## API Reference

### MixcoreDatabase Class

#### Constructor
- `constructor(client: MixcoreClient)`

#### Methods
- `getData<T>(databaseSystemName: string, query: MixQuery, callBack?: IActionCallback<IPaginationResultModel<T>>): Promise<IPaginationResultModel<T>>`
- `postData<T>(databaseSystemName: string, dataId: number | string | undefined, data: Partial<T>, callBack?: IActionCallback<Partial<T>>): Promise<Partial<T>>`
- `patchData<T>(databaseSystemName: string, dataId: number | string | undefined, data: Partial<T>, callBack?: IActionCallback<Partial<T>>): Promise<Partial<T>>`
- `patchManyData<T>(databaseSystemName: string, data: Partial<T>[], callBack?: IActionCallback<Partial<T>>): Promise<Partial<T>>`
- `deleteData<T>(databaseSystemName: string, dataId: number | string | undefined, callBack?: IActionCallback<Partial<T>>): Promise<Partial<T>>`
- `exportData<T>(databaseSystemName: string, query: MixQuery, callBack?: IActionCallback<T>): Promise<IExportDataResponse>`

# MixQuery

The `MixQuery` class is a powerful query builder for the Mixcore database system. It provides a fluent interface for constructing complex database queries with filtering, sorting, and pagination.

### Basic Usage

```typescript
import { MixQuery } from '@mixcore/sdk-client';

// Create a basic query with pagination
const query = new MixQuery({
  pageIndex: 1,
  pageSize: 10
});

// Use with database operations
const result = await database.getData<YourDataType>('your-database-name', query);
```

### Filtering

MixQuery supports various filtering operations:

```typescript
// Create a query with filters
const query = new MixQuery()
  .page(1, 10) // Set pagination
  .sort('name', ESortDirection.Asc)
  .equal('name', 'John') // Add a filter
  .equal('createdDate', 'desc') // Add sorting
  .select(['id', 'name', 'email']); // Select field
  .whereIf(() => [Your condition], () => like());
```

#### Available Chaining Operators

- `page`: Exact match
- `equal`: Not equal to
- `like`: Contains the value (for strings)
- `greaterThan`: Greater than
- `greaterThanOrEqual`: Greater than or equal to
- `lessThan`: Less than
- `lessThanOrEqual`: Less than or equal to
- `between`: Value is between two values
- `whereIf`: To functional chaning if condition