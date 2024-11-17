import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Error404, Home, PokeDetails } from './pages';
import App from './app';
import About from './pages/About';
import Tools from './pages/Tools';

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
         {
            path: '/sobre',
            element: <About />,
         },
         {
            path: '/ferramentas',
            element: <Tools />,
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
