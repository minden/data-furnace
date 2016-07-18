/* eslint-env mocha */

import $ from 'jquery';
import Operator from './operator.jsx';
import Measures from '../../../../api/measures/measures.js';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { should } from 'chai';
import subscribeAndWait from '../../../../helpers/subscribe-and-wait.js';
should();

if (Meteor.isClient) {
  describe('Expression.operator', () => {
    let measureId;
    let measure;
    let expressionId;
    let expression;
    let expressionComponent;

    before((done) => {
      subscribeAndWait(['measures'], done);
    });

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
      expressionId = Measures.Expressions.addBehindExpression(measureId, 'operator');

      measure = Measures.collection.findOne(measureId);
      expression = measure.expressions.find(
        (expressionEntity) => expressionEntity._id === expressionId);

      render(
        <Operator
          measure={measure}
          expression={expression}
          cursor={{ expressionIdBefore: undefined }}
          setCursor={() => {}}
        />,
        document.getElementById('test-environment')
      );
      expressionComponent = $('#test-environment .dropdown-toggle.fa-calculator');
    });

    after(() => {
      $('#test-environment').remove();
    });

    it('should exist', () => {
      expressionComponent.length.should.equal(1);
    });

    describe('selecting an operator', () => {
      before(() => {
        $('.dropdown-toggle').click();
        $('ul.dropdown-menu li a')[1].click();
      });

      it('should set the selected operator in the expression object name', () => {
        const updatedMeasure = Measures.collection.findOne({ 'expressions._id': expressionId });
        updatedMeasure.expressions[0].name.should.equal('-');
      });
    });
  });
}
