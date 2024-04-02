import logo from './logo.svg';
import './App.css';
import Photos from './components/Photos';
import 'bootstrap/dist/css/bootstrap.min.css';
import PhotoCarousel from "./components/PhotoCarousel";

function App() {
  return (
    <div className="App">
        <PhotoCarousel />
    </div>
  );
}

export default App;
