# Homes England Monitor - Frontend

The Monitoring Frontend runs alongside the [Monitoring API][link_api_repo] to 
visualise the status of HIF (and future) contracts for both Local Authorities 
and Homes England.

## Technical documentation

This is a [React][link_react] application that allows the user to interact with the Monitor API. It renders schemas
provided by the API which the user can then fill out and submit.

More in depth technical documentation can be found in [here](docs/README.md).

### Dependencies

- [Monitor API][link_api_repo] - The API which the application interacts with.
- [React JSON Schema Form][link_react_schema] - Renders the schema provided by the API for all forms provided by the API.
- [Create React App](https://github.com/facebook/create-react-app) - Contains the dependencies and configuration for running the React application.

### Running the application

```
make serve
```

Running `make serve` will run the application in Docker in development mode. This will be running on port `3000` and will set up environment variables which assume you're running the Monitor API in it's default Docker set up. 

To set this up without docker you will need to set up your 
[environment variables](docs/README.md) accordingly and run the application 
with `npm start`.

### Running the test suite

```
make test
```

Running `make test` will run the tests inside docker using `npm test`, which will automatically run
tests related to the currently changed files using [jest](https://jestjs.io/) in watch mode. 


[link_api_repo]: https://github.com/homes-england/monitor-api
[link_react]: https://reactjs.org/
[link_json_schema]: https://mozilla-services.github.io/react-jsonschema-form/
[link_react_schema]: https://github.com/mozilla-services/react-jsonschema-form/
