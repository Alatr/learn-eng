import Admin from "./pages/Admin.tsx";
import HomePage from "./pages/Home.tsx";
import NoMatchPage from "./pages/NoMatch.tsx";

const routes = {
  homePage: {
    path: "/",
    component: <HomePage />,
  },
  admin: {
    path: "/admin",
    component: <Admin />,
  },
  notMatchPage: {
    path: "*",
    component: <NoMatchPage />,
  },
};

export default routes;
