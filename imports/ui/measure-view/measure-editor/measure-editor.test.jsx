/* eslint-env mocha */

import $ from 'jquery';
import MeasureEditor from './measure-editor.jsx';
import Measures from '../../../api/measures/measures.js';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { should } from 'chai';
should();

if (Meteor.isClient) {
  let measureEditor;
  let measureId;

  describe('Measure editor', () => {
    before(() => {
      const testEnvironment = document.createElement('div');
      testEnvironment.setAttribute('id', 'test-environment');
      document.body.appendChild(testEnvironment);

      measureId = Measures.add();

      render(
        <MeasureEditor selectedMeasureId={measureId} />,
        document.getElementById('test-environment')
      );
      measureEditor = $('#test-environment .panel');
    });


    after((done) => {
      $('#test-environment').remove();
      resetDatabase(null, done);
    });

    it('should exist', () => {
      measureEditor.length.should.equal(1);
    });

    it('should show the title component', () => {
      $('.inplace-edit-textfield').length.should.equal(1);
    });

    it('should show the expressions component', () => {
      $('#test-environment .panel-body .btn-toolbar .fa.fa-balance-scale').length.should.equal(1);
    });

    it('should show the toolbox component', () => {
      $('#test-environment .panel-footer .btn-group .fa.fa-calculator').length.should.equal(1);
    });
  });
}
