import React from 'react';
import Stars from '../Stars';
import Reviews from '../Reviews';

export default class TestimonialCard extends React.Component {
  render() {
    const {
      review,
      openTrustPilot,
      review: { stars }
    } = this.props;

    return (
      <div
        className='mod-trustpilot'
        onClick={ openTrustPilot }
        style={ { cursor: 'pointer' } }
      >
        <div className='content'>
          <Stars stars={ stars }/>
          <Reviews reviews={ [review] } />
        </div>
      </div>
    );
  }
}
