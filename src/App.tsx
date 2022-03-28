import React, { useCallback, useEffect, useState } from 'react';
import { getAllProducts } from './api/api';
import { Product } from './types/product';
import { ProductsList } from './components/ProductsList';
import { Loader } from './components/Loader';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedPProductId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const productsFromServer = await getAllProducts();

      setProducts(productsFromServer);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
      <div className="App__sidebar">
          {isError && <h1>ERROR</h1>}
          {isLoading
            ? <Loader />
            : (
              <ProductsList
                products={products}
                selectedProductId={selectedProductId}
                setSelectedPProductId={setSelectedPProductId}
                fetchProducts={fetchProducts}
              />
            )}
        </div>
      </main>
    </div>
  );
}

export default App;
