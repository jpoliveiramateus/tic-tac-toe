import './App.css';
import Result from './components/Result';
import TicTacToe from './components/TicTacToe';
import Provider from './context/Provider';

function App() {
  return (
    <div className="App">
      <Provider>
        <TicTacToe />
        <Result />
      </Provider>
    </div>
  );
}

export default App;
