import React from 'react';
import ProjectForm from './Components/ProjectForm';
import ProjectPage from './Components/ProjectPage';
import ReturnPage from './Components/ReturnPage';
import GetProject from './UseCase/GetProject';
import GetReturn from './UseCase/GetReturn';
import GetBaseReturn from './UseCase/GetBaseReturn';
import CreateReturn from './UseCase/CreateReturn';
import SubmitReturn from './UseCase/SubmitReturn';
import UpdateReturn from './UseCase/UpdateReturn';
import ProjectGateway from './Gateway/ProjectGateway';
import ReturnGateway from './Gateway/ReturnGateway';
import Footer from './Components/Footer'
import Header from './Components/Header'

import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const getProjectUseCase = new GetProject(new ProjectGateway());
const getReturnUseCase = new GetReturn(new ReturnGateway());
const getBaseReturnUseCase = new GetBaseReturn(new ReturnGateway());
const createReturnUseCase = new CreateReturn(new ReturnGateway());
const submitReturnUseCase = new SubmitReturn(new ReturnGateway());
const updateReturnUseCase = new UpdateReturn(new ReturnGateway());

const App = () => (
  <Router>
    <div class="app-container">
      <Header/>

      <div className="monitor-container">
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/project/:id"
          render={props => (
            <ProjectPage
              {...props}
              getProject={getProjectUseCase}
            />
          )}
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
            />
          )}
        />
      </div>

      <Footer/>
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default App;
