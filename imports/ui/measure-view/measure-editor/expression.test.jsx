import $ from 'jquery';
import Expression from './expression.jsx';
import Measures from '../../../api/measures/measures.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Meteor } from 'meteor/meteor';
import { after, before, describe, it } from 'meteor/practicalmeteor:mocha';
import { render } from 'react-dom';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { should } from 'meteor/practicalmeteor:chai';
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
      expressionId = Measures.Expressions.add(measureId, 'attribute');

      measure = Measures.collection.findOne(measureId);
      expression = measure.expressions.find(
        (expressionEntity) => expressionEntity._id === expressionId);

      render(
        <Expression.attribute measure={measure} expression={expression} />,
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
      expressionId = Measures.Expressions.add(measureId, 'measure');

      measure = Measures.collection.findOne(measureId);
      expression = measure.expressions.find(
        (expressionEntity) => expressionEntity._id === expressionId);

      render(
        <Expression.measure measure={measure} expression={expression} />,
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
