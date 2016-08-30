import React from 'react';
import TrustPilot from 'TrustPilot';
import renderComponent from 'renderComponent';

describe('TrustPilot', function() {
  beforeEach(function() {
    this.props = {
      reviews: []
    };
  });

  describe('when stars is < 4', function() {
    beforeEach(function() {
      this.props.stars = 3;
    });

    it('is not visible', function() {
      const component = renderComponent(<TrustPilot { ...this.props }/>);

      expect(component.element.html()).toEqual('');
    });
  });

  describe('when stars is >= 4', function() {
    beforeEach(function() {
      this.props.stars = 4;
    });

    it('is visible', function() {
      const component = renderComponent(<TrustPilot { ...this.props }/>);

      expect(component.element).toContainText('How our clients rate us');
    });
  });
});
