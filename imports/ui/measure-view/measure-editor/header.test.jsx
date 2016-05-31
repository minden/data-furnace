/* eslint-env mocha */

import $ from 'jquery';
import Header from './header.jsx';
import Measures from '../../../api/measures/measures.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { should } from 'chai';
should();

if (Meteor.isClient) {
  describe('Measure editor header', () => {
    let measureId;
    let measure;
    let header;

    before((done) => {
      resetDatabase(null, done);
    });

    before(() => {
      const testEnvironment = document.createElement('div');
      testEnvironment.setAttribute('id', 'test-environment');
      document.body.appendChild(testEnvironment);

      measureId = Measures.add();
      measure = Measures.collection.findOne(measureId);

      render(
        <Header
          measure={measure}
        />,
        document.getElementById('test-environment')
      );
      header = $('#test-environment .inplace-edit-textfield');
    });

    after(() => {
      $('#test-environment').remove();
    });

    it('should exist', () => {
      header.length.should.equal(1);
    });

    describe('changing the name', () => {
      const newMeasureName = 'My awesome new measure';
      before(() => {
        TestUtils.Simulate.click($('div.inplace-edit-textfield')[0]);
        $('input.inplace-edit-inputfield').val(newMeasureName);
        TestUtils.Simulate.blur($('input.inplace-edit-inputfield')[0]);
      });

      it('should change the name in the db', () => {
        Measures.collection.findOne(measureId).name.should.equal(newMeasureName);
      });
    });
  });
}
