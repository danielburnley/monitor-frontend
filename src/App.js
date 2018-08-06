import React from 'react';
import ProjectForm from './Components/ProjectForm';
import ProjectPage from './Components/ProjectPage';
import ReturnPage from './Components/ReturnPage';
import GetProject from './UseCase/GetProject';
import GetReturn from './UseCase/GetReturn';
import GetBaseReturn from './UseCase/GetBaseReturn';
import SubmitReturn from './UseCase/SubmitReturn';
import ProjectGateway from './Gateway/ProjectGateway';
import ReturnGateway from './Gateway/ReturnGateway';

import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const getProjectUseCase = new GetProject(new ProjectGateway());
const getReturnUseCase = new GetReturn(new ReturnGateway());
const getBaseReturnUseCase = new GetBaseReturn(new ReturnGateway());
const submitReturnUseCase = new SubmitReturn(new ReturnGateway());

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
            getProject={getProjectUseCase}
            getReturn={getReturnUseCase}
          />
        )}
      />
      <Route
        exact
        path="/project/:projectId/return"
        render={props => (
          <ReturnPage
            {...props}
            getProject={getProjectUseCase}
            getReturn={getReturnUseCase}
            getBaseReturn={getBaseReturnUseCase}
            submitReturn={submitReturnUseCase}
          />
        )}
      />
      <Route
        exact
        path="/project/:projectId/return/:returnId"
        render={props => (
          <ReturnPage
            {...props}
            getProject={getProjectUseCase}
            getReturn={getReturnUseCase}
            getBaseReturn={getBaseReturnUseCase}
            submitReturn={submitReturnUseCase}
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
