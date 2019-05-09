# Technical Architecture

## Folder structure

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
