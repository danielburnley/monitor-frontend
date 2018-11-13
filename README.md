# Monitoring Frontend

The Monitoring Frontend runs alongside the [Monitoring API][link_api_repo] to visualise the creation, updating and fetching of Projects and Returns.

The Monitoring Frontend is written in [React][link_react] and runs on [Node][link_node].

The Monitoring project's goal is to visualise the status of HIF (and future) contracts for both Local Authorities and Homes England

## Json Schema Form

The Monitoring Frontend currently converts the The Monitoring API json data into a [Json Schema Form][link_json_schema] React [implemention][link_react_schema] and renders the result. This logic will soon be moved into the API so the Frontend's only task is to render the Json Schema Form.

## Testing the application

Once you have cloned the repository run all tests with the following command:

`make test`

## Running the application

Once you have cloned the repository you can run the application with the following command:

`make serve`

The `docker-compose.yml` sets the Monitoring API in the `web:` `environment:` this is defaulted to : `REACT_APP_HIF_API_URL: 'http://localhost:4567/'`

If you are running the API elsewhere you should update the field

[link_api_repo]: https://github.com/homes-england/monitor-api
[link_react]: https://reactjs.org/
[link_node]: https://nodejs.org/en/
[link_json_schema]: [https://mozilla-services.github.io/react-jsonschema-form/]
[link_react_schema]: [https://github.com/mozilla-services/react-jsonschema-form/]