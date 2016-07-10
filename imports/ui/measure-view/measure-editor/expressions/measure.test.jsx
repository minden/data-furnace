/* eslint-env mocha */

import $ from 'jquery';
import Measure from './measure.jsx';
import Measures from '../../../../api/measures/measures.js';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { should } from 'chai';
should();

if (Meteor.isClient) {
  describe('Expression.measure', () => {
    let measureId;
    let measure;
    let measure2Id;
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
      measure2Id = Measures.add();
      expressionId = Measures.Expressions.addBehindExpression(measureId, 'measure');

      measure = Measures.collection.findOne(measureId);
      expression = measure.expressions.find(
        (expressionEntity) => expressionEntity._id === expressionId);

      render(
        <Measure
          measure={measure}
          expression={expression}
          cursor={{ expressionIdBefore: undefined }}
          setCursor={() => {}}
        />,
        document.getElementById('test-environment')
      );
      expressionComponent = $('#test-environment .dropdown-toggle.fa-balance-scale');
    });

    after(() => {
      $('#test-environment').remove();
    });

    it('should exist', () => {
      expressionComponent.length.should.equal(1);
    });

    describe('selecting a measure', () => {
      before(() => {
        $('.dropdown-toggle').click();
        $('ul.dropdown-menu li a')[1].click();
      });

      it('should change the measureId of the expression in the db', () => {
        const updatedMeasure = Measures.collection.findOne({ 'expressions._id': expressionId });
        updatedMeasure.expressions[0].measureId.should.equal(measure2Id);
      });
    });
  });
}
