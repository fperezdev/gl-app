import "./App.css";
import Header from "./components/Header";
import Login from "./pages/login/Login";
import Search from "./pages/search/Search";
import useStore from "./store";

function App() {
  const user = useStore((state) => state.user);

  return (
    <>
      <Header />
      {user ? <Search /> : <Login />}
    </>
  );
}

export default App;
