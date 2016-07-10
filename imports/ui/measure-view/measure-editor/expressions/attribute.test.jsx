/* eslint-env mocha */

import $ from 'jquery';
import Attribute from './attribute.jsx';
import Measures from '../../../../api/measures/measures.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { should } from 'chai';
should();

if (Meteor.isClient) {
  describe('Expression.attribute', () => {
    let measureId;
    let measure;
    let expressionId;
    let expression;
    let expressionComponent;

    before((done) => {
      resetDatabase(null, done);
    });

    before(() => {
      const testEnvironment = document.createElement('div');
      testEnvironment.setAttribute('id', 'test-environment');
      document.body.appendChild(testEnvironment);

      measureId = Measures.add();
      expressionId = Measures.Expressions.addBehindExpression(measureId, 'attribute');

      measure = Measures.collection.findOne(measureId);
      expression = measure.expressions.find(
        (expressionEntity) => expressionEntity._id === expressionId);

      render(
        <Attribute
          measure={measure}
          expression={expression}
          cursor={{ expressionIdBefore: undefined }}
          setCursor={() => {}}
        />,
        document.getElementById('test-environment')
      );
      expressionComponent = $('#test-environment .inplace-edit-textfield');
    });

    after(() => {
      $('#test-environment').remove();
    });

    it('should exist', () => {
      expressionComponent.length.should.equal(1);
    });

    describe('changing the name', () => {
      const newExpressionName = 'My awesome new expression';
      before(() => {
        TestUtils.Simulate.click($('div.inplace-edit-textfield')[0]);
        $('input.inplace-edit-inputfield').val(newExpressionName);
        TestUtils.Simulate.blur($('input.inplace-edit-inputfield')[0]);
      });

      it('should change the name in the db', () => {
        const updatedMeasure = Measures.collection.findOne({ 'expressions._id': expressionId });
        updatedMeasure.expressions[0].name.should.equal(newExpressionName);
      });
    });
  });
}
