import React, { useState, useEffect, useCallback } from 'react';
import { ProductDetails } from '../ProductDetails';
import { NewProductForm } from '../NewProductForm';
import { addProduct } from '../../api/api';
import { Product } from '../../types/product';

import './ProductsList.scss';

type Props = {
  products: Product[],
  selectedProductId: number,
  setSelectedPProductId: React.Dispatch<React.SetStateAction<number>>,
  updateProducts: () => void,
};

export const ProductsList: React.FC<Props> = ({
  products,
  selectedProductId,
  setSelectedPProductId,
  updateProducts,
}) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  const [load, setLoad] = useState('');

  const productsFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'name':
        setSortedProducts(products.sort((a, b) => a.name.localeCompare(b.name)));
        setLoad(event.target.value);
        break;
      case 'count':
        setSortedProducts(products.sort((a, b) => a.count - b.count));
        setLoad(event.target.value);
        break;
      case 'weight':
        setSortedProducts(products.sort((a, b) => a.weight.localeCompare(b.weight)));
        setLoad(event.target.value);
        break;
      default:
        setSortedProducts(products);
    }
  };

useEffect(() => {
  setSortedProducts(sortedProducts);
}, [load]);

const onProductAdd = useCallback(async (
  id: number,
  imageUrl: string,
  name: string,
  count: number,
  sizeWidth: number,
  sizeHeight: number,
  weight: string
  ) => {
  await addProduct(id, imageUrl, name, count, sizeWidth, sizeHeight, weight);
  updateProducts();
}, []);

  return (
    <div className='products'>
      <h1 className='products__title'>Products:</h1>
      
      <button
          type="button"
          className="products__add-button button"
          onClick={() => {}}
        >
          <p>add product</p>
      </button>

      <section>
        <div className="ProductDetails__form">
          <NewProductForm
            onProductAdd={onProductAdd}
          />
        </div>
      </section>

      <div className='products__sort'>
        <p>Sorted by:</p>
        <select
          onChange={productsFilter}
          className='products__sort-select'
        >
          <option value='name'>name</option>
          <option value='count'>count</option>
          <option value='weight'>weight</option>
        </select>
      </div>
      
      <div className='products__container'>
        <ul className='products__list'>
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
                type='button'
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
