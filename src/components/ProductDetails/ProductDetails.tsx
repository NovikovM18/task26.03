import React, { useCallback, useEffect, useState } from 'react';
import { getProductDetails, deleteProduct, getComments, deleteComment, addComment } from '../../api/api';
import { Product } from '../../types/product';
import { Comment } from '../../types/comment';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';

import './ProductDetails.scss';

type Props = {
  selectedProductId: number
};

export const ProductDetails: React.FC<Props> = ({ selectedProductId }) => {
  const [product, setProduct] = useState<Product>();
  const [comments, setComment] = useState<Comment[]>([]);
  const [isCommentsHidden, setIsCommentsHidden] = useState(true);
  const [loading, setIsLoading] = useState(false);
  
  const fetchComments = useCallback(async () => {
    const commentFromServer = await getComments(selectedProductId);
    setComment(commentFromServer);
    setIsLoading(false);
  }, [selectedProductId]);

  const updateComments = () => {
    fetchComments();
  };

  const fetchProduct = useCallback(async () => {
    const productFromServer = await getProductDetails(selectedProductId);

    setProduct(productFromServer);
    updateComments();
    setIsLoading(false);
  }, [selectedProductId]);

  useEffect(() => {
    setIsLoading(true);
    fetchProduct();
  }, [selectedProductId]);

  const onProductDelete = async (id: number) => {
    setIsLoading(true);
    await deleteProduct(id);
    setIsLoading(false);
  };

  const onCommentDelete = async (id: number) => {
    setIsLoading(true);
    await deleteComment(id);
    setIsLoading(false);
  };

  const onCommentAdd = useCallback(async (id: number, productId: number, description: string, date: string) => {
    await addComment(id, productId, description, date);
  }, [selectedProductId]);

  return loading ? (
    <Loader />
  ) : (
    <div className="PostDetails">
      <h2>Product details:</h2>

      <section className="PostDetails__post">
        <p>{product?.name}</p>
        {/* <button
          type="button"
          className="PostDetails__remove-button button"
          onClick={() => onProductDelete(product?.id)}
        >
          X
        </button> */}
      </section>

      <section className="PostDetails__comments">
        <>
          <button
            type="button"
            className="button"
            onClick={() => setIsCommentsHidden(!isCommentsHidden)}
          >
            {`${isCommentsHidden ? 'Show' : 'Hide'} ${comments.length} comments`}
          </button>

          {!isCommentsHidden && (
            <ul className="ProductDetails__list">
              {comments.map(comment => (
                <li key={comment.id} className="ProductDetails__item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => onCommentDelete(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.description}</p>
                  <p>{comment.date}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      </section>
      <section>
        <div className="ProductDetails__form">
          <NewCommentForm
            onCommentAdd={onCommentAdd}
            selectedProductId={selectedProductId}
          />
        </div>
      </section>
    </div>
  );
};
