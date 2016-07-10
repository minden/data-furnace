/* eslint-env mocha */
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import CursorPlaceholder from './cursor-placeholder.jsx';
import { Button } from 'react-bootstrap';

describe('CursorPlaceholder', () => {
  if (Meteor.isServer) return;
  let placeholder;
  const cursor = { expressionIdBefore: undefined };
  const setCursor = () => {};
  const expressionId = undefined;

  before(() => {
    placeholder = mount(
      <CursorPlaceholder cursor={cursor} setCursor={setCursor} expressionId={expressionId} />
    );
  });

  it('contains a Button with a "|"', () => {
    placeholder.find('button').text().should.equal('|');
  });

  describe('when it is active', () => {
    before(() => {
      placeholder.setProps({ cursor: { expressionIdBefore: '1' }, setCursor, expressionId: '1' });
    });

    it('shows a blinking vertical bar', (done) => {
      const interval = setInterval(() => {
        if (placeholder.find(Button).props().style.color === 'black') {
          clearInterval(interval);
          done();
        }
      });
    });
  });

  describe('when it is not active', () => {
    before(() => {
      placeholder.setProps({ cursor: { expressionIdBefore: '1' }, setCursor, expressionId: '2' });
    });

    it('shows a blinking vertical bar', () => {
      placeholder.find(Button).props().style.color.should.equal('white');
    });
  });
});
