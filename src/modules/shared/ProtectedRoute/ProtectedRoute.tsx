// import { Navigate, useLocation } from 'react-router-dom'
// import { ReactNode, useContext } from 'react';
// import { Authcontext } from '../../AuthContext/AuthContext';

// export default function ProtectedRoute({ children }: { children: ReactNode }) {
//     const authContext = useContext(Authcontext);
//     const role = authContext?.role; 
//   const { pathname } =  useLocation()
//   if (!localStorage.getItem('token')) return <Navigate to='/login'/>
// // * prevent deep link
//   if ( role !== 'Manager' && (pathname === '/dashboard/users')) {
//     return <Navigate to='/dashboard'/>
//   }
//   return children;

// }
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useContext } from 'react';
import { Authcontext } from '../../AuthContext/AuthContext';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const authContext = useContext(Authcontext);
  const role = authContext?.role;
  const { pathname } = useLocation();

  if (!localStorage.getItem('token')) return <Navigate to='/login' />
  //* prevent deep linking

  //* Paths that are restricted to Managers (including dynamic paths)
  const managerOnlyPaths: string[] = [
    '/dashboard/users',
    '/dashboard/projects/new-Project',
    '/dashboard/projects/',
    '/dashboard/tasks/new-task',
    '/dashboard/tasks/',
  ];
  const isRestrictedPath: boolean = managerOnlyPaths.some((path) => pathname.startsWith(path));

  if (role !== 'Manager' && isRestrictedPath) {
    return <Navigate to='/dashboard' />;
  }

  return children;
}
