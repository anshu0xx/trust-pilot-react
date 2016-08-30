import React from 'react';

export default class TrustScore extends React.Component {
  rating() {
    const { stars } = this.props;

    return {
      '1': 'Bad',
      '2': 'Poor',
      '3': 'Average',
      '4': 'Good',
      '5': 'Excellent'
    }[stars];
  }

  score() {
    const { score } = this.props;

    return `${score} out of 10`;
  }

  render() {
    return (
      <div className='rating'>
        <strong>{ this.rating() } </strong>
        &ndash; { this.score() }
      </div>
    );
  }
}
