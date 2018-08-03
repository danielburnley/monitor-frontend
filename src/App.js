import React from 'react';
import ProjectForm from './Components/ProjectForm';
import ProjectPage from './Components/ProjectPage';
import ReturnPage from './Components/ReturnPage';
import GetProject from './UseCase/GetProject';
import GetReturn from './UseCase/GetReturn';
import CreateReturn from './UseCase/CreateReturn';
import ProjectGateway from './Gateway/ProjectGateway';
import ReturnGateway from './Gateway/ReturnGateway';

import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const getProjectUsecase = new GetProject(new ProjectGateway());
const getReturnUsecase = new GetReturn(new ReturnGateway());
const createReturn = new CreateReturn(new ReturnGateway());

const App = () => (
  <Router>
    <div className="monitor-container">
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/project/:id"
        render={props => (
          <ProjectPage
            {...props}
            getProject={getProjectUsecase}
            getReturn={getReturnUsecase}
            createReturn={createReturn}
          />
        )}
      />
      <Route
        exact
        path="/project/:projectId/return"
        render={props => (
          <ReturnPage
            {...props}
            getProject={getProjectUsecase}
            getReturn={getReturnUsecase}
            createReturn={createReturn}
          />
        )}
      />
      <Route
        exact
        path="/project/:projectId/return/:returnId"
        render={props => (
          <ReturnPage
            {...props}
            getProject={getProjectUsecase}
            getReturn={getReturnUsecase}
            createReturn={createReturn}
          />
        )}
      />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default App;
