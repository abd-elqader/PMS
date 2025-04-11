import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import AuthLayout from './modules/shared/AuthLayout/AuthLayout';
import NotFound from './modules/shared/NotFound/NotFound';
import Login from './modules/Authentication/Login/Login';
import ForgetPass from './modules/Authentication/ForgetPass/ForgetPass';
import ResetPass from './modules/Authentication/ResetPass/ResetPass';
import VerifyAccount from './modules/Authentication/VerifyAccount/VerifyAccount';
import Register from './modules/Authentication/Register/Register';
import MasterLayout from './modules/shared/MasterLayout/MasterLayout';
import Dashboard from './modules/Dashboard/Dashboard';

import { Bounce, ToastContainer } from 'react-toastify';
import ProjectsList from './modules/Projects/ProjectsList/ProjectsList.tsx';
import ProjectData from './modules/Projects/ProjectData/ProjectData.tsx';
import TasksList from './modules/Tasks/TasksList/TasksList.tsx';
import TaskData from './modules/Tasks/TaskData/TaskData.tsx';
import UsersList from './modules/Users/UsersList/UsersList.tsx';
import ProtectedRoute from './modules/shared/ProtectedRoute/ProtectedRoute.tsx';
function App() {
  const routes = createBrowserRouter(
    [
      {
        path:'',
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Login/>},
          {path:"login",element:<Login/>},
          { path: "register", element: <Register /> },
          { path: "forget-password", element: <ForgetPass /> },
          { path: "reset-password", element: <ResetPass /> },
          { path: "verify-account", element: <VerifyAccount /> },
        ]
      },
      {
        path:'dashboard',
        element:<ProtectedRoute><MasterLayout/></ProtectedRoute>,
        errorElement:<NotFound/>,
        children:[ 
          {index:true,element:<Dashboard/>},          
          {path:'projects',element:<ProjectsList/>},          
          {path:'projects/new-Project',element:<ProjectData/>},          
          {path:'projects/:id',element:<ProjectData/>},
          {path:'tasks',element:<TasksList/>},          
          {path:'tasks/new-task',element:<TaskData/>},          
          {path:'tasks/:id',element:<TaskData/>},
          {path:'users',element:<UsersList/>},

        ]
      }
    ]);

  return (
    <>

<RouterProvider router={routes} />
    {/* Toastify Container */}

    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Bounce}
    />

  </>
  );

}

export default App
