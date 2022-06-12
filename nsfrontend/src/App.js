import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register'
import { Routes, Route } from 'react-router-dom';
import ProductAdd from './components/ProductAdd/ProductAdd';
import ProductsDisplay from './components/ProductsDisplay/ProductsDisplay';
import ProductUpdate from './components/ProductUpdate/ProductUpdate';
import CustomerProductDisplay from './components/CustomerProductDisplay/CustomerProductDisplay';
import CheckOut from './components/CheckOut/CheckOut';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='login' element={<Login/>} />
        <Route path='customer'>
          <Route path=':userId/products' element={<CustomerProductDisplay />} />
          <Route path=':userId/checkout' element={<CheckOut />} />
        </Route>
        <Route path='admin'>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='product'>
            <Route path='add' element={<ProductAdd />} />
            <Route path='display_all' element={<ProductsDisplay />} />
            <Route path='update/:id' element={<ProductUpdate />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
