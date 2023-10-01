import { Counter } from "./components/Counter";
import { Clientes } from "./components/Clientes";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
      path: '/Clientes',
      element: <Clientes />
  }
];

export default AppRoutes;
