import React from 'react';
import { times } from 'lodash';

export default class Stars extends React.Component {
  wrapperClasses() {
    const { stars } = this.props;
    const ratingClass = {
      '1': 'bad',
      '2': 'poor',
      '3': 'average',
      '4': 'good',
      '5': 'excellent'
    }[stars];

    return `stars ${ratingClass}`;
  }

  star(index) {
    const { stars } = this.props;

    if (index < stars) {
      return <div key={ index } className='star filled'/>;
    } else {
      return <div key={ index } className='star'/>;
    }
  }

  render() {
    return (
      <div className={ this.wrapperClasses() }>
        { times(5, (i) => { return this.star(i); }) }
      </div>
    );
  }
}
