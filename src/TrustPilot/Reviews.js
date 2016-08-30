import React from 'react';
import moment from 'moment';

const truncate = (text) => {
  if (text.length > 47) {
    return `${text.substr(0, 45)}\u2026`;
  } else {
    return text;
  }
};

const formatDate = (date) => {
  return moment(date).fromNow();
};

export default class Reviews extends React.Component {
  review = (review, index) => {
    const { consumer, title, createdAt } = review;

    return (
      <div key={ index } className='review'>
        <p>{ truncate(title) }</p>
        <div className='meta'>
          <span>{ consumer.displayName }, </span>
          <em>{ formatDate(createdAt) }</em>
        </div>
      </div>
    );
  };

  render() {
    const { reviews } = this.props;

    return <div>{ reviews.map(this.review) }</div>;
  }
}
