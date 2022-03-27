import React, { useState, useEffect } from 'react';
import { ProductDetails } from '../ProductDetails';
import { Product } from '../../types/product';

import './ProductsList.scss';

type Props = {
  products: Product[],
  selectedProductId: number,
  setSelectedPProductId: React.Dispatch<React.SetStateAction<number>>
};

export const ProductsList: React.FC<Props> = ({
  products,
  selectedProductId,
  setSelectedPProductId,
}) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);

  const productsFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'name':
        setSortedProducts(products.sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case 'count':
        setSortedProducts(products.sort((a, b) => a.count - b.count));
        break;
      case 'weight':
        setSortedProducts(products.sort((a, b) => a.weight.localeCompare(b.weight)));
        break; 
    }
  };

useEffect(() => {

}, [sortedProducts]);

  return (
    <div className="products">
      <h1>Products:</h1>

      <select
        id="filter-select"
        className="products__input"
        onChange={productsFilter}
      >
        <option value="name">name</option>
        <option value="count">count</option>
        <option value="weight">weight</option>
      </select>

      <div className="products__container">
        <ul className="products__list">
          {sortedProducts.map(product => (
            <li className='products__item'
                key={product.id}>
              <div className='products__details'>
                <img
                  src={product.imageUrl}
                  alt='apple'
                  width={product.size.width}
                  height={product.size.height}
                ></img>
                <p className='products__details__item'>{product.name}</p>
                <p className='products__details__item'>{product.count}</p>
                <p className='products__details__item'>{product.weight}</p>
              </div>

              <button
                className='products__buttom'
                type="button"
                onClick={() => {
                  if (product.id === selectedProductId) {
                    setSelectedPProductId(0);
                  } else {
                    setSelectedPProductId(product.id);
                  }
                }}
              >
                {product.id === selectedProductId ? 'Close' : 'Details'}
              </button>
            </li>
          ))}
        </ul>

        {(selectedProductId > 0)
        &&
        <ProductDetails
          selectedProductId={selectedProductId}
        />}
      </div>
    </div>
  );
};
