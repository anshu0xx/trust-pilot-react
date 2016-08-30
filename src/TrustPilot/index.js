import React from 'react';
import AggregateCard from './cards/AggregateCard';
import LandscapeLayout from './layouts/Landscape';

const openTrustPilot = () => {
  window.open('https://www.trustpilot.com/review/policygenius.com', '_blank');
};

export default class TrustPilot extends React.Component {
  render() {
    const {
      stars,
      landscape
    } = this.props;

    if (stars < 4) {
      return <span />;
    }
    else if (landscape) {
      return (
        <LandscapeLayout
          openTrustPilot={ openTrustPilot }
          { ...this.props }
        />
      );
    } else {
      return (
        <AggregateCard
          openTrustPilot={ openTrustPilot }
          { ...this.props }
        />
      );
    }
  }
}
