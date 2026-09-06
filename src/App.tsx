import { Navigate, Route, Routes } from 'react-router-dom';
import { TopBrandsPage } from './pages/shop/TopBrandsPage';
import { NearbyStoresPage } from './pages/shop/NearbyStoresPage';
import { MarketplaceListPage } from './pages/shop/marketplace/MarketplaceListPage';
import { ProductDetailPage } from './pages/shop/marketplace/ProductDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/shop/marketplace" replace />} />
      <Route path="/shop" element={<Navigate to="/shop/marketplace" replace />} />
      <Route path="/shop/top-brands" element={<TopBrandsPage />} />
      <Route path="/shop/nearby-stores" element={<NearbyStoresPage />} />
      <Route path="/shop/marketplace" element={<MarketplaceListPage />} />
      <Route path="/shop/marketplace/:productId" element={<ProductDetailPage />} />
      <Route path="*" element={<Navigate to="/shop/marketplace" replace />} />
    </Routes>
  );
}

export default App;
