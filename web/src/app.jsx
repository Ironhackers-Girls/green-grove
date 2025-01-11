import { Route, Routes } from 'react-router-dom';
import { CartPage, HomePage, ProductDetailPage, ProductsPage, SearchPage, WishlistPage, ContactPage, AboutPage, NotFoundPage } from './pages';
import { PageLayout } from './components/layouts';
import NavBar from './components/ui/navbar/navbar';
import Footer from './components/ui/footer/footer';
import { ScrollToTop } from './components/layouts'

function App() {

  return (
    <>
      <PageLayout>
        <ScrollToTop/>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cart' element={<CartPage />} /> 
          <Route path='/products/:id' element={<ProductDetailPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/wishlist' element={<WishlistPage />} />
          <Route path='/contact' element={<ContactPage/>} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
        <Footer/>
      </PageLayout>
    </>
  )
}

export default App
