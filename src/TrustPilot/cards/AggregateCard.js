import React from 'react';
import Stars from '../Stars';
import TrustScore from '../TrustScore';
import Reviews from '../Reviews';

export default class AggregateCard extends React.Component {
  render() {
    const {
      trustScore,
      stars,
      reviews,
      openTrustPilot,
      small
    } = this.props;

    return (
      <div className='mod-trustpilot' onClick={ openTrustPilot } style={ { cursor: 'pointer' } }>
        <h4>How our clients rate us</h4>
        <div className='content'>
          <div className='powered-by'>
            <span>Ratings powered by</span>
            <div className='trustpilot-logo'/>
          </div>
          <Stars stars={ stars }/>
          <TrustScore stars={ stars } score={ trustScore }/>
          { small ? '' : <Reviews reviews={ reviews }/> }
        </div>
      </div>
    );
  }
}
