import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import QuizMarker from './pages/quizMarker/QuizMarker';
import QuizResults from './pages/quizResults/QuizResults';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter basename="/quiz-app">
          <Routes>
            <Route path="/" element={<QuizMarker />} />
            <Route path="/results" element={<QuizResults />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
