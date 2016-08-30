import React from 'react';
import TestimonialCard from '../cards/TestimonialCard';

export default class Landscape extends React.Component {
  review(review, index) {
    return (
      <TestimonialCard
        { ...this.props }
        key={ index }
        review={ review }
      />
    );
  }

  render() {
    const { reviews } = this.props;

    return (
      <div className='mod-trustpilot-list'>
        { reviews.map(this.review) }
      </div>
    );
  }
}
