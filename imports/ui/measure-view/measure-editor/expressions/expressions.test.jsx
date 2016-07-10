/* eslint-env mocha */
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button } from 'react-bootstrap';
import Expressions from './expressions.jsx';
import Measures from '../../../../api/measures/measures.js';

describe('Expressions', () => {
  if (Meteor.isServer) return;
  let expressions;

  before(() => {
    const measureId = Measures.add();
    Measures.setName(measureId, 'The measure name');
    Measures.Expressions.addBehindExpression(measureId, 'attribute');
    const measure = Measures.collection.findOne(measureId);
    const cursor = { expressionIdBefore: undefined };
    const setCursor = () => {};
    expressions = mount(<Expressions measure={measure} cursor={cursor} setCursor={setCursor} />);
  });

  it('contains a button with the measure name', () => {
    expressions.find(Button).first().text().should.equal(' The measure name');
  });

  it('contains an attribute expression', () => {
    expressions.find('button.fa.fa-tag').should.have.length(1);
  });
});
