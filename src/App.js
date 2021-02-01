import logo from "./img/logo512.png";
import "./App.css";
import Notifications from "./components/Notifications";
import Header from "./components/Header";
function App() {
  return (
    <div className='App'>
      <Header />
      <Notifications />
    </div>
  );
}

export default App;
