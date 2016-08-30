import React from 'react';
import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';

function submitForm(targetSelector = 'form') {
  const target = $(React.findDOMNode(this)).find(targetSelector);
  if (target.length === 0) {
    throw new Error(`unable to find element with selector ${targetSelector}`);
  }

  TestUtils.Simulate.submit(target[0]);
}

function clickOn(targetSelector) {
  if (!targetSelector) {
    return TestUtils.Simulate.click(this.element[0]);
  }

  const targets = $(React.findDOMNode(this)).find(targetSelector);
  if (targets.length === 0) {
    throw new Error(`unable to find element with selector ${targetSelector}`);
  }

  Reflect.apply(Array.prototype.slice, targets).forEach((target) => {
    TestUtils.Simulate.mouseDown(target, { button: 0 });
    TestUtils.Simulate.mouseUp(target);
    TestUtils.Simulate.click(target);
    TestUtils.Simulate.change(target);
  });
}

function changeInput(targetSelector) {
  let target = $(React.findDOMNode(this)).find(targetSelector);

  if (target.length === 0) {
    throw new Error(`unable to find element with targetSelector ${targetSelector}`);
  }

  return {
    to(value) {
      target = target[0];
      target.value = value;

      TestUtils.Simulate.change(target);
    }
  };
}

export default (component) => {
  component = TestUtils.renderIntoDocument(component);
  component.element = $(React.findDOMNode(component));
  component.clickOn = clickOn;
  component.changeInput = changeInput;
  component.submitForm = submitForm;
  component.mouseDown = TestUtils.Simulate.mouseDown.bind(TestUtils.Simulate);
  component.mouseMove = TestUtils.Simulate.mouseMove.bind(TestUtils.Simulate);

  return component;
};
