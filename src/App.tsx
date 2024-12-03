import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './views/home/Home';
import Header from './views/common/header/Header';
import NotFound from './views/not-found/NotFound';
import CargoList from './views/cargo-list/CargoList';
import ItemEdit from './views/cargo-edit/CargoEdit';
import ResultList from './views/result-list/ResultList';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/cargo-list" element={<CargoList />} />
        <Route path="/cargo-edit/:id" element={<ItemEdit />} />
        <Route path="/result-list" element={<ResultList />} />
        <Route
          path="/result/:instanceId/:resultId/:truckIndex"
          element={<>View Result</>}
        />
      </Routes>
    </Router>
  );
}

export default App;
