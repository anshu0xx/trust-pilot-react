import React from 'react';
import TrustPilot from 'TrustPilot';
import moment from 'moment';
import _ from 'lodash';
import renderComponent from 'renderComponent';

describe('TrustPilot - large component', function() {
  beforeEach(function() {
    this.props = {
      stars: 5,
      trustScore: 10,
      reviews: []
    };
  });

  describe('stars', function() {
    describe('when stars is 4', function() {
      beforeEach(function() {
        this.props.stars = 4;
      });

      it('has 4 filled stars', function() {
        const component = renderComponent(<TrustPilot { ...this.props }/>);

        expect(component.element.find('.star.filled')).toHaveLength(4);
        expect(component.element.find('.star:not(.filled)')).toHaveLength(1);
      });
    });

    describe('when stars is 5', function() {
      beforeEach(function() {
        this.props.stars = 5;
      });

      it('has 5 filled stars', function() {
        const component = renderComponent(<TrustPilot { ...this.props }/>);

        expect(component.element.find('.star.filled')).toHaveLength(5);
        expect(component.element.find('.star:not(.filled)')).toHaveLength(0);
      });
    });
  });

  describe('trust score', function() {
    beforeEach(function() {
      this.props.trustScore = 7;
    });

    it('displays the trust score out of 10', function() {
      const component = renderComponent(<TrustPilot { ...this.props }/>);

      expect(component.element).toContainText('7 out of 10');
    });

    describe('when stars is 4', function() {
      beforeEach(function() {
        this.props.stars = 4;
      });

      it('says "Good"', function() {
        const component = renderComponent(<TrustPilot { ...this.props }/>);

        expect(component.element).toContainText('Good');
      });
    });

    describe('when stars is 5', function() {
      beforeEach(function() {
        this.props.stars = 5;
      });

      it('says "Excellent"', function() {
        const component = renderComponent(<TrustPilot { ...this.props }/>);

        expect(component.element).toContainText('Excellent');
      });
    });
  });

  describe('reviews', function() {
    beforeEach(function() {
      this.props.reviews = [{
        consumer: { displayName: 'Billy' },
        title: 'hello',
        createdAt: moment().subtract(1, 'd').toDate().toISOString()
      }, {
        consumer: { displayName: 'Sally' },
        title: 'hello',
        createdAt: moment().subtract(5, 'd').toDate().toISOString()
      }];
    });

    it('formats the dates', function() {
      const component = renderComponent(<TrustPilot { ...this.props }/>);

      expect(component.element).toContainText('a day ago');
      expect(component.element).toContainText('5 days ago');
    });

    it('displays the consumer name', function() {
      const component = renderComponent(<TrustPilot { ...this.props }/>);

      expect(component.element).toContainText('Billy');
      expect(component.element).toContainText('Sally');
    });

    describe('when the title is more than 47 characters', function() {
      beforeEach(function() {
        this.props.reviews[0].title = _.times(100).map(() => 'x').join('');
        this.props.reviews[1].title = _.times(48).map(() => 'y').join('');
      });

      it('truncates to 50 characters and adds an ellipsis', function() {
        const component = renderComponent(<TrustPilot { ...this.props }/>);
        const ellipsis = '\u2026';
        const xs = _.times(45).map(() => 'x').join('');
        const ys = _.times(45).map(() => 'y').join('');

        expect(component.element).toContainText(xs + ellipsis);
        expect(component.element).toContainText(ys + ellipsis);
      });
    });

    describe('when the title is not more than 47 characters', function() {
      beforeEach(function() {
        this.props.reviews[0].title = 'PolicyGenius is cool';
        this.props.reviews[1].title = _.times(47).map(() => 'y').join('');
      });

      it('returns the title untouched', function() {
        const component = renderComponent(<TrustPilot { ...this.props }/>);

        expect(component.element).toContainText('PolicyGenius is cool');
        expect(component.element).toContainText(_.times(47).map(() => 'y').join(''));
      });
    });
  });
});
