# API Endpoints
## UserService
### ```POST /UserService```
Creates a new user account
  - Parameter: None
  - Body:
  ```
  {
    "email": "string",
    "name": "string",
    "password": "string"
  }
  ```
  - Response: Status Code 200 Ok if successful; Status Code 409 Conflict if email is taken
  - Response Body: None

### ```POST /UserService/Authenticate```
Reeeturns a JSON Web Token on valid username/password combination used for authentication with other endpoints
  - Parameters: None
  - Body: 
  ```
  {
    "email": "string",
    "password": "string"
  }
  ```
  - Response: Status Code 200 Ok if succesfull; Status Code 400 BadRequest on invalid username and/or password
  - Response Body:
  ```
  {
    "id": int,
    "name": "string",
    "email": "string",
    "token": "string"
  }
  ```
  
### ```DELETE /UserService```
Deletes a user account and all its associated orders and reviews
  - Parameters: None
  - Body:
  ```
  {
    "email": "string"
  }
  ```
  - Response: Status Code 200 Ok if succesfull; Status Code 409 Conflict if the user still has unfinished orders
  - Response Body: None
