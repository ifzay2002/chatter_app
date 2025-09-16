
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Login from './pages/authentication/Login.jsx';
import SignUp from './pages/authentication/SignUp.jsx';
import { store } from './store/store.js';
import { Provider } from "react-redux";
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
])


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <RouterProvider router={router} />

  </Provider>
)
