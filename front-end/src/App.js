
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login';
import AddProduct from './components/Addproduct';
import Productlist from './components/Productlist';
import Update from './components/Update';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
          <Routes>
            <Route element={<PrivateComponent/>}>
            <Route path='/' element={<Productlist/>}/>
            <Route path='/add' element={<AddProduct/>}/>
            <Route path='/update/:id' element={<Update/>}/>
            <Route path='/logout' element={<h1>logout from here</h1>}/>
            <Route path='/profile' element={<h1>your profile</h1>}/>
             </Route>

            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            
          </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
