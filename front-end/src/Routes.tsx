import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RouteWrapper from './RouteWrapper';
import Processo from './pages/Processo';

const Routes: React.FC = () => {
  return (
      <BrowserRouter>
        <Switch>
            <RouteWrapper path="/" exact component={Login}/>
            <RouteWrapper path="/register" component={Register}/>
            <RouteWrapper path="/dashboard" isPrivate component={Dashboard}/>
            <RouteWrapper path="/add-processo" isPrivate component={Processo}/>
        </Switch>
      </BrowserRouter>
  )
}

export default Routes;