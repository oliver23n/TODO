import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from "react-router-dom";

import App from './App.jsx';
import Error from './pages/Error.jsx';
import Login from './pages/Login.jsx';
import Todo from './pages/Todo.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    errorElement: <Error />,
    children:[
      {
        index: true,
        element: <Todo />
      },
      {
        path:'/login',
        element: <Login />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router ={router} />
)
