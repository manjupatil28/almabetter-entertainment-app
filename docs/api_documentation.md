# Entertainment App API Documentation

### Welcome to the API documentation for the Entertainment App. This documentation provides details on how to interact with our API to access various entertainment-related resources.


#### Base URL
```
https://entertainment-app-y6rc.onrender.com/
```

#### Authentication
To access protected endpoints, you need to include your Mongodb API key in the Environtment variables while deploying the app.

To set the process.env.API_KEY environment variable, you can follow these steps:

Create a .env file in the root directory of your project if it doesn't exist.

Open the .env file and add the following line:
```
API_KEY=your-api-key
```
Replace your-api-key with the actual API key value you want to set.

Save the .env file.

Make sure you have the dotenv package installed in your project. If not, you can install it by running:
```
npm install dotenv
```
Import and load the environment variables from the .env file in your main application file. This is typically the file where you initialize your server or run your application. Add the following code at the top of that file:
```
require('dotenv').config();
```
Now, you can access the API key value using process.env.API_KEY anywhere in your code. For example, you can assign it to a variable like this:
```
const apiKey = process.env.API_KEY;
```
Ensure that you keep your .env file secure and do not commit it to a public repository, as it may contain sensitive information. It's a best practice to add the .env file to your .gitignore file to prevent it from being accidentally committed to version control.

## Endpoints

## User Endpoints

### Register User

**Endpoint:** `POST /user/`  
**Description:** Register a new user.  
**Request:**  
- **Body:** User data  
**Response:**  
- **Status:** 200 OK  
- **Body:** User data  

#### Example
```
 POST /user/
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```
```
200 OK
{
  "user_id": 123,
  "username": "john_doe",
  "email": "john@example.com",
  "created_at": "2024-01-12T12:30:45Z",
  "updated_at": "2024-01-12T12:30:45Z"
}

```
### Login User

**Endpoint:** `POST /user/login`  
**Description:** Log in an existing user.  
**Request:**  
- **Body:** User credentials  
**Response:**  
- **Status:** 200 OK  
- **Body:** User data  

#### Example
```
POST /user/login
{
  "email": "john@example.com",
  "password": "securepassword"
}
```
```
200 OK
{
  "user_id": 123,
  "username": "john_doe",
  "email": "john@example.com"
}

```

### Validate User

**Endpoint:** `GET /user/`  
**Description:** Validate user credentials and retrieve user information.  
**Request:**  
- **Headers:**  
  - Authorization: Bearer <token>  
**Response:**  
- **Status:** 200 OK  
- **Body:** User data  

#### Example
```
GET /user/
Headers:
  Authorization: Bearer <token>
```
```
200 OK
{
  "user_id": 123,
  "username": "john_doe",
  "email": "john@example.com"
}


```
## Bookmark Endpoints

### Get Bookmarks

**Endpoint:** `GET /bookmarks/`  
**Description:** Get a list of bookmarks for the authenticated user.  
**Request:**  
- **Headers:**  
  - Authorization: Bearer <token>  
**Response:**  
- **Status:** 200 OK  
- **Body:** List of bookmarks  

#### Example

```
GET /bookmarks/
Headers:
  Authorization: Bearer <token>

```
```
200 OK
[  {    "bookmark_id": 1,    "title": "Interstellar",    "type": "movie",    "user_id": 123  },  {    "bookmark_id": 2,    "title": "Stranger Things",    "type": "tvshow",    "user_id": 123  }]

```
### Set Bookmark

**Endpoint:** `POST /bookmarks/`  
**Description:** Add a new bookmark for the authenticated user.  
**Request:**  
- **Headers:**  
  - Authorization: Bearer <token>  
- **Body:** Bookmark data  
**Response:**  
- **Status:** 200 OK  
- **Body:** New bookmark data  

#### Example

```
POST /bookmarks/
Headers:
  Authorization: Bearer <token>
Body:
{
  "title": "Inception",
  "type": "movie"
}

```
```
200 OK
{
  "bookmark_id": 3,
  "title": "Inception",
  "type": "movie",
  "user_id": 123
}

```
### Delete Bookmark

**Endpoint:** `DELETE /bookmarks/:id`  
**Description:** Delete a bookmark for the authenticated user.  
**Request:**  
- **Headers:**  
  - Authorization: Bearer <token>  
- **Params:**  
  - id: Bookmark ID to delete  
**Response:**  
- **Status:** 200 OK  
- **Body:** Message indicating successful deletion

#### Example
```
DELETE /bookmarks/3
Headers:
  Authorization: Bearer <token>
```
```
200 OK
{
  "message": "Bookmark deleted successfully"
}
```
## Movies Endpoints:

### Search Movies

- **Endpoint:** `GET /movies/search`
- **Description:** Search for movies based on a query.
- **Request:**
  - **Query Parameters:**
    - `query` (string): The search query.
- **Response:**
  - **Status:** 200 OK
  - **Body:** List of movies matching the search query.

#### Example

```
GET /movies/search?query=Inception
```
```
200 OK
[  {    "movie_id": 456,    "title": "Inception",    "poster": "https://example.com/posters/inception.jpg",    "synopsis": "A mind-bending movie...",    "release_date": "2010-07-16",    "genre": "Sci-Fi",    "rating": "9.2"  }]
```

### Popular Movies

- **Endpoint:** `GET /movies/popular`
- **Description:** Get a list of popular movies.
- **Request:**
  - None
- **Response:**
  - **Status:** 200 OK
  - **Body:** List of popular movies.

#### Example

```
GET /movies/popular

```
```
200 OK
[
  {
    "movie_id": 1,
    "title": "Inception",
    "poster": "https://example.com/inception.jpg",
    "synopsis": "A mind-bending movie...",
    "release_date": "2010-07-16",
    "genre": "Sci-Fi",
    "rating": "9.2"
  },
  {
    "movie_id": 2,
    "title": "The Dark Knight",
    "poster": "https://example.com/dark_knight.jpg",
    "synopsis": "Gotham's protector...",
    "release_date": "2008-07-18",
    "genre": "Action",
    "rating": "9.0"
  },
  // ... additional movies
]

```

### Movie Details

- **Endpoint:** `GET /movies/:id`
- **Description:** Get details of a specific movie.
- **Request:**
  - **Params:**
    - `id` (string): Movie ID.
- **Response:**
  - **Status:** 200 OK
  - **Body:** Details of the requested movie.

#### Example

```
GET /movies/1

```
```
200 OK
{
  "movie_id": 1,
  "title": "Inception",
  "poster": "https://example.com/inception.jpg",
  "synopsis": "A mind-bending movie...",
  "release_date": "2010-07-16",
  "genre": "Sci-Fi",
  "rating": "9.2"
}

```

## TV Shows Endpoints:

### Search TV Shows

- **Endpoint:** `GET /tvshows/search`
- **Description:** Search for TV shows based on a query.
- **Request:**
  - **Query Parameters:**
    - `query` (string): The search query.
- **Response:**
  - **Status:** 200 OK
  - **Body:** List of TV shows matching the search query.

### Popular TV Shows

- **Endpoint:** `GET /tvshows/popular`
- **Description:** Get a list of popular TV shows.
- **Request:**
  - None
- **Response:**
  - **Status:** 200 OK
  - **Body:** List of popular TV shows.

### TV Show Details

- **Endpoint:** `GET /tvshows/:id`
- **Description:** Get details of a specific TV show.
- **Request:**
  - **Params:**
    - `id` (string): TV show ID.
- **Response:**
  - **Status:** 200 OK
  - **Body:** Details of the requested TV show.

#### Error Handling
In case of errors, the API may return appropriate HTTP status codes along with a JSON-formatted error response.  

## HTTP Status Codes and Error Types

### 400 Bad Request

- **Description:** Invalid request format or missing required parameters.

### 401 Unauthorized

- **Description:** Unauthorized access, invalid credentials, or missing authentication token.

### 404 Not Found

- **Description:** Resource not found.

### 500 Internal Server Error

- **Description:** Server-side error, please contact support.

