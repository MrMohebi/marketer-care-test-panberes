import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import SignUp from "./Components/SignUp/SignUp";
function App() {
  return (
   <BrowserRouter>
       <Route path={'/'} component={SignUp}/>

   </BrowserRouter>
  );
}

export default App;
