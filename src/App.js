import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import SignUp from "./Components/SignUp/SignUp";
import MainPage from "./Components/MainPage/MainPage";
function App() {
  return (
   <BrowserRouter>
       <Route exact path={'/'} component={SignUp}/>
       <Route path={'/panel'} component={MainPage}/>

   </BrowserRouter>
  );
}

export default App;
