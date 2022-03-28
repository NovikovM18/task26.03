import React, { useState } from 'react';

// import './NewProductForm.scss';

type Props = {
  onProductAdd: (
    id: number,
    imageUrl: string,
    name: string,
    count: number,
    sizeWidth: number,
    sizeHeight: number,
    weight: string
  ) => void
};

export const NewProductForm: React.FC<Props> = ({ onProductAdd }) => {
  const [id, setId] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const [sizeWidth, setSizeWidth] = useState(200);
  const [sizeHeight, setSizeHeight] = useState(200);
  const [weight, setWeight] = useState('');


  const clearInputs = () => {
    setId(0);
    setImageUrl('');
    setName('');
    setCount(0);
    setSizeWidth(200);
    setSizeHeight(200);
    setWeight('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onProductAdd(id, imageUrl, name, count, sizeWidth, sizeHeight, weight);
    clearInputs();
  };

  return (
    <form className="NewProductForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <input
          type="text"
          name="imageUrl"
          placeholder="imageUrl"
          className="NewCommentForm__input"
          required
          value={imageUrl}
          onChange={event => setImageUrl(event.target.value)}
        />  
      </div>

      <div className="form-field">
        <input
          type="text"
          name="name"
          placeholder="name"
          className="NewCommentForm__input"
          required
          value={name}
          onChange={event => setName(event.target.value)}
        />  
      </div>

      <div className="form-field">
        <input
          type="text"
          name="count"
          placeholder="count"
          className="NewCommentForm__input"
          required
          value={count}
          onChange={event => setCount(+event.target.value)}
        />  
      </div>

      <div className="form-field">
        <input
          type="text"
          name="weight"
          placeholder="weight"
          className="NewCommentForm__input"
          required
          value={weight}
          onChange={event => setWeight(event.target.value)}
        />  
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add product
      </button>
    </form>
  );
};
