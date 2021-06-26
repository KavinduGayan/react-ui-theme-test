
import './App.css';
if (process.env.REACT_APP_NAME === 'client-1') {
  require("./resource/env/client1/env.scss");
}
else {
  require("./resource/env/client2/env.scss");
}

function App() {
  return (
    <div className="App">
      <h1>{process.env.REACT_APP_NAME}</h1>
    </div>
  );
}

export default App;
