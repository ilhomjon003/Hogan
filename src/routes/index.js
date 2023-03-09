import Home from "./Home";
import Register from "./Auth/Register";
import Products from "./Products";
import ProductInfo from "./Products/ProductInfo";
import UserProfile from "./Profile";

const App__Routes = [
  {
    id: 0,
    link: "/",
    component: <Home />,
  },
  {
    id: 1,
    link: "/register",
    component: <Register />,
  },
  {
    id: 3,
    link: "/products",
    component: <Products />,
  },
  {
    id: 4,
    link: "/products/:id",
    component: <ProductInfo />,
  },
  {
    id: 5,
    link: "/profile",
    component: <UserProfile />,
  }
];
export default App__Routes;
