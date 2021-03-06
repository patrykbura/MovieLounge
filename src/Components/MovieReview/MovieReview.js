import React from 'react';
import { Card } from 'antd';
import "./MovieReview.scss"
import { Scrollbars } from 'react-custom-scrollbars';

const MOVIE_REVIEW_CARD_WIDTH = 315;

const MovieReview = (props) => {
  const {
    review
  } = props;

  return (
    <div className='movie-review'>
      <Card 
        title={`Review by: ${review.author}`} 
        bordered={false} 
        style={{ width: MOVIE_REVIEW_CARD_WIDTH }}
      >
        <Scrollbars autoHeight >
          <div className='movie-review__content'>
            {review.content}
          </div>
        </Scrollbars>
      </Card>
    </div>
  );
};

MovieReview.defaultProps = {
  review: {
    author: 'no one yet :(',
    content: 'This movie has no reviews'
  }
};

export default MovieReview