import logo from './logo.svg';
import './App.css';
import Ajax from "./components/Ajax";
import {NoAjax} from "./components/NoAjax";
import {Scale} from "./oldFiles/Scale4.js.old";
import {Test} from "./components/Test";
import {Pages} from "./components/Pages";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {/*<a*/}
        {/*  className="App-link"*/}
        {/*  href="https://reactjs.org"*/}
        {/*  target="_blank"*/}
        {/*  rel="noopener noreferrer"*/}
        {/*>*/}
        {/*  Learn React*/}
        {/*</a>*/}
        {/*  <Scale4Js />*/}
        {/*  <Test />*/}
          <Pages />
      </header>
    </div>
  );
}

export default App;
