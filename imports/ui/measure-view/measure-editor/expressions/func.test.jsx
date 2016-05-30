import $ from 'jquery';
import Func from './func.jsx';
import Measures from '../../../../api/measures/measures.js';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { after, before, describe, it } from 'meteor/practicalmeteor:mocha';
import { render } from 'react-dom';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { should } from 'meteor/practicalmeteor:chai';
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
      expressionId = Measures.Expressions.add(measureId, 'func');

      measure = Measures.collection.findOne(measureId);
      expression = measure.expressions.find(
        (expressionEntity) => expressionEntity._id === expressionId);

      render(
        <Func measure={measure} expression={expression} />,
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
