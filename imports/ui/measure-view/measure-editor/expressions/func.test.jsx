/* eslint-env mocha */

import $ from 'jquery';
import Func from './func.jsx';
import Measures from '../../../../api/measures/measures.js';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { should } from 'chai';
should();

if (Meteor.isClient) {
  describe('Expression.function', () => {
    let measureId;
    let measure;
    let expressionId;
    let expression;
    let expressionComponent;

    before((done) => {
      resetDatabase();
      const interval = setInterval(() => {
        if (Measures.collection.find().count() === 0) {
          done();
          clearInterval(interval);
        }
      }, 0);
    });

    before(() => {
      const testEnvironment = document.createElement('div');
      testEnvironment.setAttribute('id', 'test-environment');
      document.body.appendChild(testEnvironment);

      measureId = Measures.add();
      expressionId = Measures.Expressions.addBehindExpression(measureId, 'func');

      measure = Measures.collection.findOne(measureId);
      expression = measure.expressions.find(
        (expressionEntity) => expressionEntity._id === expressionId);

      render(
        <Func
          measure={measure}
          expression={expression}
          cursor={{ expressionIdBefore: undefined }}
          setCursor={() => {}}
        />,
        document.getElementById('test-environment')
      );
      expressionComponent = $('#test-environment button.fa-code');
    });

    after(() => {
      $('#test-environment').remove();
    });

    it('should exist', () => {
      expressionComponent.length.should.equal(1);
    });
  });
}
