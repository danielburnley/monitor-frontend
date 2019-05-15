# Technical Documentation

## Technical Architecture

### Glossary

- Domain object - A class that describes the interface between gateways and usecases
- Gateway - A class that handles communication with the Monitor API
- Use case - A class that provides discrete functionality for a user story


### Folder structure

All of our classes are stored in modules with a single class per module, where the unit tests for the
class live alongside the production code.

- `/`
  - `src/`
    - `App.js` - Where the application is set up, including its routes and the components they use. 
    - `App.test.js` - Acceptance tests for the application
    - `Components`
      - `*/` - The component name
        - `index.js` - The production code for the component
        - `<componentName>.test.js` - Unit tests for the react component
    - `Domain`
      - `*/`
        - `index.js` - The domain object class
    - `Gateway`
      - `*/` 
        - `index.js` - The gateway class
        - `<gatewayName>.test.js` - Unit tests for the gateway
    - `UseCase`
      - `*/`
        - `index.js` - The use case class
        - `<useCaseName>.test.js` - Unit tests for the use case
  - `test/` - Contains classes used to support unit/acceptance tests

## Environment variables

- REACT_APP_HIF_API_URL
  - The URL of the Monitor API
  - Value in `docker-compose`: `http://localhost:4567/`
- REACT_APP_FF_OPTION_ENABLED
  - Whether or not to display the Forward Funding option in the
    project creation list
  - Value in `docker-compose`: `yes`
  - Acceptable values: `yes`, `no`

## User Roles

The UI Supports the following user roles, which restricts access to certain features based on roles:
- Superuser
- Homes England
- Local Authority

## Architecture

This is discussed [here](./architecture.md).

## JSON Schema

Monitor Frontend depends heavily on JSON Schema, using a library for rendering JSON Schema as a form as well as extending JSON Schema functionality to provide a more rich user experience.

### Rendering the form

Monitor Frontend's forms are powered by [React JSON Schema Form](https://github.com/mozilla-services/react-jsonschema-form)'s
`Form` component.

This component reads JSON Schema and form data in order to determine what the form the user fills out will look like.

### Monitor JSON Schema

Although we haven't changed any of the core JSON Schema behaviour,
we depend on a particular structure being provided from the API, as
well as extending it to allow the API to specify particular
formats.

#### Navigation tabs

Monitor Frontend will display the schema in sections, pulling the 
top level properties from the schema and displaying them and their 
title in the top bar above the form.

For example, if the API provided the schema:

```json
{
  "title": "Example schema",
  "type": "object",
  "properties": {
    "sectionOne": {
      "title": "Section one",
      "type": "array",
      "items": {}
    },
    "sectionTwo": {
      "title": "Section two",
      "type": "object",
      "properties": {}
    }
  }
}
```

The sections shown in the form would be "Section one" and "Section two". 
The sections support both being an object, or an array of objects. 

When a tab has been selected, the page will display a `<Form>` component provided by 
[React JSON Schema Form][link_react_schema] which renders the form and the data provided.

#### JSON Schema - Additional properties

We have also extended JSON Schema to add additional flags which allows us to specify 
certain behaviour in the UI. The list of these flags the relevant behaviour can 
be found [here](./custom_components.md).

[link_react_schema]: [https://github.com/mozilla-services/react-jsonschema-form/]