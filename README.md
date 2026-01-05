# moea-application
Student Competency Identification System based on the European Competence Matrix

Installation and Run
Prerequisites
Docker

Docker Compose

Setup
Clone the repository.

Create a .env file in the root directory.

Add your Gemini API key (https://aistudio.google.com/app/api-keys): GEMINI_API_KEY=

Execution
Run the following command to build and start the application: docker-compose up --build

API Testing
The Postman collection is located in /documentation/moea.postman_collection.json.

Import the collection into Postman.

Use the AUTH section to register or log in.

Postman will automatically handle cookies for subsequent requests after login.

Register or log in using the requests in the AUTH section.

Authentication is handled via cookies; Postman will automatically include them in subsequent requests after a successful login.
