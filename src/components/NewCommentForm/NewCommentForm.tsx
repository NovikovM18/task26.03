import React, { useState } from 'react';

import './NewCommentForm.scss';

type Props = {
  selectedProductId: number,
  onCommentAdd: (id: number, productId: number, description: string, date: string) => void
};

export const NewCommentForm: React.FC<Props> = ({ selectedProductId, onCommentAdd }) => {
  const [id, setId] = useState(0);
  const [productId, setProductId] = useState(selectedProductId);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(`${new Date()}`);

  const clearInputs = () => {
    setDescription('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onCommentAdd(id, productId, description, date);
    clearInputs();
  };

  return (
    <form className="NewCommentForm" onSubmit={handleSubmit}>
      <div className="form-field">
        <textarea
          name="body"
          placeholder="Type comment here"
          className="NewCommentForm__input"
          required
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
      </div>

      <button
        type="submit"
        className="NewCommentForm__submit-button button"
      >
        Add a comment
      </button>
    </form>
  );
};
