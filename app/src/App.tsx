import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login } from './components/Login';
import { RegisterParticipant } from './participants/RegisterParticipant';
import { CreateEvent } from './admins/CreateEvent';
import { Dashboard } from './admins/Dashboard';
import { ListUsers } from './admins/ListUsers';
import { ListEvents } from './admins/ListEvents';
import { CreateTeam } from './admins/CreateTeam';
import { ListTeams } from './admins/ListTeams';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/home",
    element: <Dashboard />
  },
  {
    path: "/user/list",
    element: <ListUsers />
  },
  {
    path: "/user/register-participant",
    element: <RegisterParticipant />
  },
  {
    path: "/event/list",
    element: <ListEvents />
  },
  {
    path: "/event/create-event",
    element: <CreateEvent />
  },
  {
    path: "/team/list",
    element: <ListTeams />
  },
  {
    path:"/team/create-team",
    element:<CreateTeam />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
