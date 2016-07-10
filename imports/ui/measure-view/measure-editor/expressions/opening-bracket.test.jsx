/* eslint-env mocha */
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Measures from '../../../../api/measures/measures.js';
import OpeningBracket from './opening-bracket.jsx';
import CursorPlaceholder from './cursor-placeholder.jsx';

describe('OpeningBrackets', () => {
  if (Meteor.isServer) return;
  let bracket;

  before(() => {
    const measureId = Measures.add();
    const expressionId = Measures.Expressions.addBehindExpression(measureId, 'attribute');
    const measure = Measures.collection.findOne(measureId);
    const expression = Measures.Expressions.get(measureId, expressionId);
    const cursor = { expressionIdBefore: undefined };
    const setCursor = () => {};
    bracket = mount(
      <OpeningBracket
        measure={measure}
        expression={expression}
        buttonStyle={{}}
        cursor={cursor}
        setCursor={setCursor}
      />
    );
  });

  it('contains a cursor placeholder component', () => {
    bracket.find(CursorPlaceholder).should.have.length(1);
  });

  it('show a closing bracket', () => {
    bracket.find('button').first().text().should.equal('(');
  });
});
