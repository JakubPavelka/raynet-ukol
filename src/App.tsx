import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Clients from "./pages/Clients";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

const Layout = () => {
  return (
    <main>
      <div className="app">
        <Sidebar />
        <div className="outlet-nav-wrapper">
          <Header />
          <Outlet />
        </div>
      </div>
    </main>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "clients", element: <Clients /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
    children: [{ path: "*", element: <ErrorPage /> }],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
