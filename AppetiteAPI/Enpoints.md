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
Returns a JSON Web Token on valid username/password combination used for authentication with other endpoints
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
  - Response: Status Code 200 Ok if successful; Status Code 409 Conflict if the user still has unfinished orders
  - Response Body: None

## RestaurantAdministration
### ```POST /RestaurantAdministration```
Creates a restaurant account
  - Parameters:
    - Email: string
    - Name: string
    - Password: string
    - Address.Street: string
    - Address.Housenumber: string
    - Address.ZipCode: string
    - Address.City: string
    - Address.Country: string
    - Address.Latitude: double
    - Address.Longitude: double
    - PhoneNumber: string
    - RestaurantType: int
    - Logo: binary file
    - DeliveryCosts: double
  - Body: None
  - Response: Status Code 200 Ok if successful; Status Code 409 Conflict if the email is already taken
  - Response Body: None

### ```POST /RestaurantAdministration/Authenticate```
Returns a JSON Web Token on valid username/password combination used for authentication with other endpoints
  - Parameters: None
  - Body:
  ```
  {
    "email": "string",
    "password": "string"
  }
  ```
  - Response: Status Code 200 Ok if successful; Status Code 400 BadRequest if email/password combination incorrect
  - Response Body:
  ```
  {
    "id": int,
    "name": "string",
    "email": "string",
    "token": "string"
  }
  ```

### ```DELETE /RestaurantAdministration```
Deletes restaurant account
  - Parameters: None
  - Body:
  ```
  {
    "email": "string"
  }
  ```
  - Response: Status Code 200 if successful; Status Code 401 Unauthorized if not authorized; Status Code 400 BadRequest if there are unfinished orders associated with the account
  - Response Body: None

### ```GET /RestaurantAdministration/Categories```
Gets all available restaurant categories
  - Parameters: None
  - Body: None
  - Response: Status Code 200 Ok if successful;
  - Response Body:
  ```
  {
    "categoreies: {
      "cateogryNumber": "categoryName",
      "cateogryNumber": "categoryName",
      ...
    }
  }
  ```

### ```PATCH /RestaurantAdministration/DeliveryCosts```
Sets the delivery costs for a restaurant
  - Parameters: None
  - Body:
  ```
  {
    "email": "string",
    "costs": 0
  }
  ```
  - Response: Status Code 200 Ok if successful; Status Code 401 Unauthorized if unauthorized
  - Response Body: None

## RestaurantFinder
### ```POST /RestaurantFinder```
Find local restaurants
  - Parameter: None
  - Body:
  ```
  {
    "coordinate": {
     "latitude": "double",
     "longitude": "double"
    },
    "distance": "int",
    "type": "enum"
  }
  ```
  - Response: Status Code 200 Ok if successful; Status Code 401 Conflict if no restaurants are found
  - Response Body: Array with restaurants
  ```
  [
  {
    "id": "int",
    "name": "string",
    "email": "string",
    "phoneNumber": "string",
    "adress": {
      "id": "int",
      "street": "string",
      "housenumber": "string",
      "zipcode": "string",
      "city": "string",
      "country": "string",
      "latitute": "double",
      "longitude": "double"
    },
    "restaurantType": "int",
    "openingTime": "DateTime",
    "closingTime": "DateTime",
    "logo": "string",
    "averageRating": "enum"
  },
  ...
  ]
```

### ```GET /RestaurantFinder/Logo```
Get Logo by path
  - Parameter:
    - picturePath: string
  - Body: None
  - Response: Status Code 200 Ok if successful, 400 if picture is not found
  - Response Body: picture

## ProductService
### ```POST /ProductService```
Create a product
  - Parameter:
    - Name: string
    - Description: string
    - Price: double
    - Ingredients: array of strings
    - RestaurantEmail: string
    - Pictures: array of binary files
  - Body: None
  - Response: Status Code 200 Ok if successful; Status Code 409 Conflict if product with same name exists already; Status Code 401 Unauthorized if not authorized to create products for this restaurant
  - Response Body: None

### ```DELETE /ProductService```
Deletes product from menu
  - Parameters: None
  - Body:
  ```
  {
    "name": "string"
  }
  ```
  - Response: Status Code 200 Ok if successful; Status Code 401 Unauthorized if not authorized to delete this product
  - Response Body: None

### ```GET /ProductService```
Gets complete menu of restaurant
  - Parameters:
    - Email: string
  - Body: None
  - Response: Status Code 200 Ok if successful
  - Response Body: None

### ```GET /ProductService/Picture```
Gets picture associated with product
  - Parameters:
    - picturePath: string
  - Body: None
  - Response: Status Code 200 Ok if successful; Status Code 404 NotFound if no image found
  - Response: binary file

## Order Service
### ```POST /OrderService```
Create new order
  - Parameters: None
  - Body: 
  
    ```
     {
      "userEmail": "string",
      "restaurantEmail": "string",
      "products": [
         {
            "name": "string"
         }
       ]
     }
     ```
  - Response: Status Code 200 Ok if successful; Status Code 400 if restaurant or product does not exist
  - Response: None
  
### ```DELETE /OrderService```
Delete order
  - Parameters: None
  - Body: 
  
    ```
     {
       "userEmail": "string",
       "orderId": "int"
     }
    ```
  - Response: Status Code 200 Ok if successful; Status Code 400 if order already finished or no Order found
  - Response: None
  
  ### ```GET  OrderService/UserGetAll```
Get all orders from a user
  - Parameters: userEmail: string
  - Body: None
  - Response: Status Code 200 Ok if successful; Status Code 400 if no orders found
  - Response Body: 
  
   	```
    [
    {
       "id": "int",
       "user": {
         "email": "string",
         "name": "string"
       },
      "restaurant": {
        "id": "int",
        "name": "string",
        "email": "string",
        "phoneNumber": "string",
        "adress": null,
        "restaurantType": enum
        "openingTime": "string"
        "closingTime": "string",
        "logo": "string",
        "averageRating": enum
      },
      "deliveryCost": "double"
      "orderReceivedTime": "string
      "products": [
        {
          "id": "int",
          "price": "double"
          "name": "string"
          "description": "string"
          "ingredients": [
            "string",
            ...
           ],
          "pictures": [
            "string",
            ...
           ],
          "orders": null
        },
        ...
      ],
      "isDone": "bool"
    },
    ...
    ]
    ```
    
### ```GET  OrderService/RestaurantGetAll```
Get all orders from a restaurant
  - Parameters: restaurantEmail: string
  - Body: None
  - Response: Status Code 200 Ok if successful; Status Code 400 if no orders found, Status Code 401 Unauthorized if not authorized to get these orders
  - Response Body: siehe OrderService/UserGetAll

### ```GET  OrderService/UserGetUnfinished````
Get unfinished orders from a user
  - Parameters: userEmail: string
  - Body: None
  - Response: Status Code 200 Ok if successful; Status Code 400 if no orders found, Status Code 401 Unauthorized if not authorized to get these orders
  - Response Body: siehe OrderService/UserGetAll

### ```GET  OrderService/RestaurantGetUnfinished```
Get unfinished orders from a restaurant
  - Parameters: restaurantEmail: string
  - Body: None
  - Response: Status Code 200 Ok if successful; Status Code 400 if no orders found; Status Code 401 Unauthorized if not authorized to get these orders
  - Response Body: siehe OrderService/UserGetAll

### ```PATCH  OrderService/FinshOrder```
Finish an order
  - Parameters: 
     - restaurantEmail: string
     - orderId: int
  - Body: None
  - Response: Status Code 200 Ok if successful; Status Code 400 if no orders found; Status Code 401 Unauthorized if not authorized to finish this order
  - Response Body: None
  
