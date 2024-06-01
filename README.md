##### Spam Detection and Contact Management API
     This is a REST API for a mobile app that helps users manage their contacts and detect spam numbers. The API is built using Node.js, Express, Prisma, and PostgreSQL.


#### Features

    User registration and authentication
    Add, update, and retrieve personal contacts
    Mark numbers as spam
    Check the spam status of a phone number
     Search for contacts by name or phone number

### REQUIREMENTS
     
     
       Node.js (v14 or later)
       PostgreSQL
       Prisma


### Installation




    
    npm install

    Create a .env file in the root of your project and add the following:
    DATABASE_URL="postgresql://user:password@localhost:5432/your-database"
      JWT_SECRET="your_jwt_secret_key"



    npx prisma generate
    npx prisma migrate dev --name init


    npm run server


## API ENDPOINTS
     

      Authentication
          Register a new user: POST /api/auth/register
          Login a user: POST /api/auth/login

      Contacts
          Add a contact: POST /api/contacts/add (Protected)
          Get all contacts for a user: GET /api/contacts (Protected)

      Spam
          Mark a number as spam: POST /api/spam/mark (Protected)
          Check spam status of a number: GET /api/spam/check/:phone (Protected)


## USAGE
       Register a user:
           POST /api/auth/register
           Content-Type: application/json

            {
            "name": "John Doe",
            "phone": "1234567890",
            "password": "yourpassword"
            }
    
         LOGIN A USER:
           
           POST /api/auth/login
            Content-Type: application/json

            {
            "phone": "1234567890",
            "password": "yourpassword"
            } 

            The login endpoint will return a JWT token that you need to include in the Authorization header for all protected routes.


        ADD A CONTACT:  

        POST /api/contacts/add
        Authorization: Bearer <your_token>
        Content-Type: application/json

        {
        "name": "Jane Doe",
        "phone": "0987654321"
        }


        MARK A NUMBER AS SPAM:
         
        POST /api/spam/mark
        Authorization: Bearer <your_token>
        Content-Type: application/json

        {
        "phone": "0987654321"
        }


        Check spam status of a number:


            GET /api/spam/check/:phone
            Authorization: Bearer <your_token>

        Search contacts by name:
           GET /api/search/name?name=John
           Authorization: Bearer <your_token>
        

        Search contacts by phone:

        GET /api/search/phone?phone=1234567890
        Authorization: Bearer <your_token>



##   TO POPULATE THE DATA
     

     npm install @faker-js/faker



     node seed.js
     