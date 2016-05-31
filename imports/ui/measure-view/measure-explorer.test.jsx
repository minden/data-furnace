/* eslint-env mocha */

import $ from 'jquery';
import MeasureExplorer from './measure-explorer.jsx';
import Measures from '../../api/measures/measures.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { should } from 'chai';
should();

if (Meteor.isClient) {
  describe('Measure explorer', () => {
    let measureExplorer;
    let setSelectedMeasureIdFunctionCalled = false;
    before(() => {
      const testEnvironment = document.createElement('div');
      testEnvironment.setAttribute('id', 'test-environment');
      document.body.appendChild(testEnvironment);
      render(
        <MeasureExplorer
          setSelectedMeasureId={function setSelected() {
            setSelectedMeasureIdFunctionCalled = true;
          }}
        />,
        document.getElementById('test-environment')
      );
      measureExplorer = $('#test-environment .panel');
    });

    before((done) => {
      resetDatabase(null, done);
    });

    after(() => {
      $('#test-environment').remove();
    });

    it('should start of with a clean measure collection', () => {
      Measures.collection.find().count().should.equal(0);
    });

    it('should exist', () => {
      measureExplorer.length.should.be.above(0);
    });

    describe('the plus button', () => {
      before(() => {
        TestUtils.Simulate.click($('button.glyphicon-plus')[0]);
      });

      it('should insert a new measure into the db', () => {
        Measures.collection.find().count().should.equal(1);
      });

      it('should create a new measure in the ui', (done) => {
        const interval = setInterval(() => {
          if ($('.list-group button').length === 1) {
            clearInterval(interval);
            true.should.equal(true);
            done();
          }
        }, 0);
      });
    });

    describe('the measure list', () => {
      before(() => {
        Measures.add();
        $('.list-group button')[0].click();
      });

      it('calls the setSelectedElementId() function, when measure is clicked', () => {
        setSelectedMeasureIdFunctionCalled.should.equal(true);
      });
    });
  });
}
