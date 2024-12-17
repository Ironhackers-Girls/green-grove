import { Route, Routes } from 'react-router-dom';
import { CartPage, HomePage, ProductPage } from './pages';
import NavBar from './components/ui/navbar/navbar';
import { PageLayout } from './components/layouts';

function App() {

  return (
    <>
      <PageLayout>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<CartPage />} /> 
          <Route path='/products/:id' element={<ProductPage />} />
        </Routes>
      </PageLayout>
    </>
  )
}

export default App
