import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Error404, Home, PokeDetails } from './pages';
import App from './app';

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      errorElement: <Error404 />,
      children: [
         {
            path: '/',
            element: <Home />,
         },
         {
            path: '/detalhes/:id',
            element: <PokeDetails />,
         },
      ],
   },
   //  {
   //     path: '/detalhes/:id',
   //     element: <DetailsPokemonPage />,
   //  },
]);

export default function AppRouter() {
   return <RouterProvider router={router} />;
}
