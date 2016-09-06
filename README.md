# Trustpilot React

Trustpilot React is a React component that can be used to display Trustpilot reviews in a React application.

## Why?

Trustpilot provides a [Trustbox](http://apps.trustpilot.com/trustboxes/), which is a widget that allows you to quickly an easily add your Trustpilot review to your page. In many cases, this will be the correct solution to trying to display reviews.

At PolicyGenius, we wanted more control over what and how the data was displayed, such as building styles that were more consistent with the rest of the application or displaying reviews that were more relevant to what our clients were viewing at a given time. This led us to building the Trustpilot React component

## Installation

`$ npm install --save trust-pilot-react`

## Usage

```javascript
import TrustPilot from 'trust-pilot-react';

<TrustPilot { ...props } />
```

When passing props to the component, they should conform to the following format (which matches the TrustPilot API):

```javascript
{
  reviews: [{
    consumer: {
      displayName: "Billy", 
      createdAt: "monday"
    },
    stars: 5,
    title: "Best life insurance buying experience ever!",
    text: "PolicyGenius was just so amazing I couldn't even control myself!",
    isVerified: true
  }, {
    consumer: {
      displayName: "Suzie", 
      createdAt: "wednesday"
    },
    stars: 5,
    title: "PG is so cool!",
    text: "Seriously, their team must be full of some sort of geniuses!",
    isVerified: true
  }],
  trustScore: 9.5,
  stars: 5
}
```

### Contributing
TODO

## Copyright and License
MIT
