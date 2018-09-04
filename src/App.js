import React from 'react';
import qs from 'qs';

import Footer from './Components/Footer';
import Header from './Components/Header';
import ProjectForm from './Components/ProjectForm';
import ProjectPage from './Components/ProjectPage';
import ReturnPage from './Components/ReturnPage';
import GetToken from './Components/GetToken'
import Portal from './Components/Portal';

import CreateReturn from './UseCase/CreateReturn';
import GenerateDisabledUISchema from './UseCase/GenerateDisabledUISchema'
import GenerateReadOnlySchema from './UseCase/GenerateReadOnlySchema'
import GenerateUISchema from './UseCase/GenerateUISchema'
import GetBaseReturn from './UseCase/GetBaseReturn';
import CanAccessProject from './UseCase/CanAccessProject';
import GetProject from './UseCase/GetProject';
import GetReturn from './UseCase/GetReturn';
import SubmitReturn from './UseCase/SubmitReturn';
import UpdateReturn from './UseCase/UpdateReturn';
import RequestToken from './UseCase/RequestToken'

import ProjectGateway from './Gateway/ProjectGateway';
import ReturnGateway from './Gateway/ReturnGateway';
import TokenGateway from './Gateway/TokenGateway'

import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const createReturnUseCase = new CreateReturn(new ReturnGateway());
const generateDisabledUISchema = new GenerateDisabledUISchema();
const generateReadOnlySchema = new GenerateReadOnlySchema();
const generateUISchema = new GenerateUISchema();
const getBaseReturnUseCase = new GetBaseReturn(new ReturnGateway());
const getProjectUseCase = new GetProject(new ProjectGateway());
const getReturnUseCase = new GetReturn(new ReturnGateway());
const canAccessProjectUseCase = new CanAccessProject(new TokenGateway());
const requestTokenUseCase = new RequestToken(new TokenGateway());
const submitReturnUseCase = new SubmitReturn(new ReturnGateway());
const updateReturnUseCase = new UpdateReturn(new ReturnGateway());

const App = () => (
  <Router>
    <div className="app-container">
      <Header />

      <div className="monitor-container">
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/project/:id"
          render={ props =>
            <Portal
              {...props}
              projectId={props.match.params.id}
              onApiKey={(apiKey) => {window.apiKey = apiKey}}
              requestToken={requestTokenUseCase}
              token={qs.parse(props.location.search, { ignoreQueryPrefix: true }).token}
              canAccessProject={canAccessProjectUseCase}
            ><ProjectPage
                {...props}
                getProject={getProjectUseCase}
                generateUISchema={generateDisabledUISchema}
              />
              </Portal>
          }
        />
        <Route
          exact
          path="/project/:projectId/return"
          render={props => (
            <ReturnPage
              {...props}
              getReturn={getReturnUseCase}
              getBaseReturn={getBaseReturnUseCase}
              createReturn={createReturnUseCase}
              submitReturn={submitReturnUseCase}
              updateReturn={updateReturnUseCase}
              generateUISchema={generateUISchema}
              generateSubmittedSchema={generateDisabledUISchema}
            />
          )}
        />
        <Route
          exact
          path="/project/:projectId/return/:returnId"
          render={props => (
            <ReturnPage
              {...props}
              getReturn={getReturnUseCase}
              createReturn={createReturnUseCase}
              getBaseReturn={getBaseReturnUseCase}
              submitReturn={submitReturnUseCase}
              updateReturn={updateReturnUseCase}
              generateUISchema={generateUISchema}
              generateSubmittedSchema={generateDisabledUISchema}
            />
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
