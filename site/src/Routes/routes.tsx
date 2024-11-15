import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import DetailsPokemonPage from '../pages/DetailsPokemonPage';

const router = createBrowserRouter([
   {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorPage />,
   },
   {
      path: '/detalhes/:id',
      element: <DetailsPokemonPage />,
   },
]);

export default function AppRouter() {
   return <RouterProvider router={router} />;
}
