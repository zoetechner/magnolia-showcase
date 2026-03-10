import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import AdminPage from "./pages/AdminPage";
import LandingPage from "./pages/LandingPage";
import { useBakeryStore } from "./store/bakeryStore";

type Route = "/" | "/admin";

function getRoute(): Route {
  const hash = window.location.hash.replace("#", "");
  if (hash === "/admin") return "/admin";
  return "/";
}

export default function App() {
  const [route, setRoute] = useState<Route>(getRoute);
  const store = useBakeryStore();

  useEffect(() => {
    const handler = () => setRoute(getRoute());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (path: Route) => {
    window.location.hash = path;
    setRoute(path);
  };

  return (
    <>
      {route === "/" && (
        <LandingPage
          data={store.data}
          onNavigateAdmin={() => navigate("/admin")}
        />
      )}
      {route === "/admin" && (
        <AdminPage
          data={store.data}
          store={store}
          onNavigateHome={() => navigate("/")}
        />
      )}
      <Toaster position="bottom-right" />
    </>
  );
}
