import logo from './logo.svg';
import './App.css';
import './Components/Project.css'
import Connection from './Connection/Connection';
import CustomThemeProvider from './Context/ThemeContext';
function App() {
  return (
    <CustomThemeProvider>
      <div className="App wrapper">
        <Connection />
      </div>
    </CustomThemeProvider>
  );
}

export default App;
