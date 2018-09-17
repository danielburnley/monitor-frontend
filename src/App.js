import React from "react";
import qs from "qs";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ProjectForm from "./Components/ProjectForm";
import ProjectPage from "./Components/ProjectPage";
import ReturnPage from "./Components/ReturnPage";
import GetToken from "./Components/GetToken";
import Portal from "./Components/Portal";

import CreateReturn from "./UseCase/CreateReturn";
import GenerateDisabledUISchema from "./UseCase/GenerateDisabledUISchema";
import GenerateReadOnlySchema from "./UseCase/GenerateReadOnlySchema";
import GenerateUISchema from "./UseCase/GenerateUISchema";
import GetBaseReturn from "./UseCase/GetBaseReturn";
import CanAccessProject from "./UseCase/CanAccessProject";
import GetProject from "./UseCase/GetProject";
import GetReturn from "./UseCase/GetReturn";
import SubmitReturn from "./UseCase/SubmitReturn";
import UpdateReturn from "./UseCase/UpdateReturn";
import RequestToken from "./UseCase/RequestToken";
import ValidateReturn from "./UseCase/ValidateReturn";

import ProjectGateway from "./Gateway/ProjectGateway";
import ReturnGateway from "./Gateway/ReturnGateway";
import ApiKeyGateway from "./Gateway/ApiKeyGateway"
import TokenGateway from "./Gateway/TokenGateway";

import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

const returnGateway = new ReturnGateway(new ApiKeyGateway())
const validateReturnUseCase = new ValidateReturn(returnGateway);
const createReturnUseCase = new CreateReturn(returnGateway);
const generateDisabledUISchema = new GenerateDisabledUISchema();
const generateReadOnlySchema = new GenerateReadOnlySchema();
const generateUISchema = new GenerateUISchema();
const getBaseReturnUseCase = new GetBaseReturn(returnGateway);
const getProjectUseCase = new GetProject(new ProjectGateway());
const getReturnUseCase = new GetReturn(returnGateway);
const canAccessProjectUseCase = new CanAccessProject(new TokenGateway());
const requestTokenUseCase = new RequestToken(new TokenGateway());
const submitReturnUseCase = new SubmitReturn(returnGateway);
const updateReturnUseCase = new UpdateReturn(returnGateway);

const renderReturnPage = props => (
  <ReturnPage
    {...props}
    validateReturn={validateReturnUseCase}
    getReturn={getReturnUseCase}
    getBaseReturn={getBaseReturnUseCase}
    createReturn={createReturnUseCase}
    submitReturn={submitReturnUseCase}
    updateReturn={updateReturnUseCase}
    generateUISchema={generateUISchema}
    generateSubmittedSchema={generateDisabledUISchema}
  />
);

const renderProjectPage = props => (
  <ProjectPage
    {...props}
    getProject={getProjectUseCase}
    generateUISchema={generateDisabledUISchema}
  />
);

const App = () => (
  <Router>
    <div className="app-container">
      <Header />

      <div className="monitor-container">
        <Route exact path="/" component={Home} />
        <Route
          path="/project/:id"
          render={props => (
            <Portal
              {...props}
              projectId={props.match.params.id}
              onApiKey={apiKey => {
                window.apiKey = apiKey;
              }}
              requestToken={requestTokenUseCase}
              token={
                qs.parse(props.location.search, { ignoreQueryPrefix: true })
                  .token
              }
              canAccessProject={canAccessProjectUseCase}
            >
              <Route exact path="/project/:id" render={renderProjectPage} />
              <Route
                exact
                path="/project/:projectId/return"
                render={renderReturnPage}
              />
              <Route
                exact
                path="/project/:projectId/return/:returnId"
                render={renderReturnPage}
              />
            </Portal>
          )}
        />
      </div>

      <Footer />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default App;
