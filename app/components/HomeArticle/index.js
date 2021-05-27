import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import ButtonWrapper from '../ButtonWrapper';

export default function HomeArticle() {
  return (
    <article className="article article--anonymous">
      <h1 className="article__title mb-5">
        Build All Of Your Invoices In One Go!
      </h1>

      <ButtonWrapper className="btn btn-primary mb-5">
        <Link to="/signup" className="btn__link mx-auto">TRY FOR FREE</Link>
      </ButtonWrapper>

      <div className="container mb-5 article__free-text">
        Try it free for 14 days. No risk.
      </div>
    </article>
  );
}
