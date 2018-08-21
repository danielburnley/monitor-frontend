# Local Authority Monitoring Frontend

The Local Authority Monitoring Frontend runs alongside the [Local Authority Monitoring API](https://github.com/madetech/hif-api) to visualise the creation, updating and fetching of Projects and Returns.

The Local Authority Monitoring Frontend is written in [React](https://reactjs.org/) and runs on [Node](https://nodejs.org/en/). 

The Local Authority Monitoring project's goal is to visualise the status of HIF (and future) contracts for both Local Authorities and Homes England

## Json Schema Form

The Local Authority Monitoring Frontend currently converts the The Local Authority Monitoring API json data into a [Json Schema Form](https://mozilla-services.github.io/react-jsonschema-form/) React [implemention](https://github.com/mozilla-services/react-jsonschema-form) and renders the result. This logic will soon be moved into the API so the Frontend's only task is to render the Json Schema Form.


## Testing the application

Once you have cloned the repository run all tests with the following command: 

`make test`

## Running the application

Once you have cloned the repository you can run the application with the following command: 

`make serve`

The `docker-compose.yml` sets the Local Authority Monitoring API in the `web:` `environment:` this is defaulted to : `REACT_APP_HIF_API_URL: 'http://localhost:4567/'`

If you are running the API elsewhere you should update the field
