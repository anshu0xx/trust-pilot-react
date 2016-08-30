import React from 'react';
import TrustPilot from 'TrustPilot';
import renderComponent from 'renderComponent';

describe('TrustPilot - small component', function() {
  beforeEach(function() {
    this.props = {
      stars: 4,
      trustScore: 4,
      reviews: [{ consumer: {}, title: 'review title' }]
    };
  });

  describe('when small', function() {
    beforeEach(function() {
      this.props.small = true;
    });

    it('does not show the reviews', function() {
      const component = renderComponent(<TrustPilot { ...this.props }/>);

      expect(component.element).not.toContainText('review title');
    });
  });

  describe('when not small', function() {
    beforeEach(function() {
      this.props.small = undefined;
    });

    it('shows the reviews', function() {
      const component = renderComponent(<TrustPilot { ...this.props }/>);

      expect(component.element).toContainText('review title');
    });
  });
});
