import './App.css';
import './components/icon';
import Content from './components/content/content';
import ThemeContextProvider from './Context/themeContext';
import BtnView from './components/btnView/btnView';

function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <BtnView />
        <Content />
      </ThemeContextProvider>
    </div>
  );
}

export default App;