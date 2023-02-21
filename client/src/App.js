import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SearchResults from './components/SearchResults';
import ReviewForm from './components/ReviewForm';
import DisplayReview from './components/DisplayReview';
import EditReview from './components/EditReview';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/search' element={<SearchResults />}/>
          <Route path='/reviewForm' element={<ReviewForm />}/>
          <Route path='/reviewPage/:id' element={<DisplayReview />}/>
          <Route path='/editReview/:id' element={<EditReview />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

