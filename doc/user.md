# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "Anre",
  "password": "rahasia",
  "name": "Anre Franciscus"
}
```

Response Body (Success) 
```json
{
  "data": {
    "username": "Anre",
    "name": "Anre Franciscus"
  }
}
```