# Project #3. Blockchain to Front-End Client via APIs

This is Project 3, Blockchain to Front-End Client via APIs, in this project I created RESTful Web API with Node.js Framework to GET and POST blocks.

## Built With

* [hapi.js](https://hapijs.com/) - The Node.js web framework used
* [crypto-js](https://github.com/brix/crypto-js) - Dependency for hashing
* [joi](https://github.com/hapijs/joi) - Dependency for Object schema validation

## Endpoints
GET a block:
```
http://localhost:8000/block/2
```
POST a block with a body:
```
http://localhost:8000/block
```
```
{
      "body": "Testing block with test string data"
}
```
## Setup project.

To setup the project do the following:
1. Clone/Download then naviagte to the repository to your local computer.
2. Open the terminal and install the packages: `npm install`.
3. Run your application `npm start`
4. Test the Endpoints with Curl or Postman.