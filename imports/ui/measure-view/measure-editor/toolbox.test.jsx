import $ from 'jquery';
import Toolbox from './toolbox.jsx';
import Measures from '../../../api/measures/measures.js';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { after, before, describe, it } from 'meteor/practicalmeteor:mocha';
import { render } from 'react-dom';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { should, expect } from 'meteor/practicalmeteor:chai';
should();

if (Meteor.isClient) {
  describe('Measure editor toolbox', () => {
    let measureId;
    let toolbox;

    before((done) => {
      resetDatabase(null, done);
    });

    before(() => {
      const testEnvironment = document.createElement('div');
      testEnvironment.setAttribute('id', 'test-environment');
      document.body.appendChild(testEnvironment);

      measureId = Measures.add();

      render(
        <Toolbox
          measureId={measureId}
        />,
        document.getElementById('test-environment')
      );
      toolbox = $('#test-environment #toolbox');
    });

    after(() => {
      $('#test-environment').remove();
    });

    it('should exist', () => {
      toolbox.length.should.equal(1);
    });

    describe('click on attribute button', () => {
      before(() => {
        $('#test-environment .fa.fa-tag').click();
      });

      after(() => {
        Measures.collection.update(measureId, { expressions: [] });
      });

      it('should insert an attribute expression into the measure', () => {
        Measures.collection.findOne(measureId).expressions[0].typeName.should.equal('attribute');
      });
    });

    describe('click on measure button', () => {
      before(() => {
        $('#test-environment .fa.fa-balance-scale').click();
      });

      after(() => {
        Measures.collection.update(measureId, { expressions: [] });
      });

      it('should insert a measure expression into the measure', () => {
        Measures.collection.findOne(measureId).expressions[0].typeName.should.equal('measure');
      });
    });

    describe('click on operator button', () => {
      before(() => {
        $('#test-environment .fa.fa-calculator').click();
      });

      after(() => {
        Measures.collection.update(measureId, { expressions: [] });
      });

      it('should NOT insert an operator expression into the measure', () => {
        expect(Measures.collection.findOne(measureId).expressions[0]).to.equal(undefined);
      });
    });

    describe('click on func button', () => {
      before(() => {
        $('#test-environment .fa.fa-code').click();
      });

      after(() => {
        Measures.collection.update(measureId, { expressions: [] });
      });

      it('should insert an measure expression into the measure', () => {
        Measures.collection.findOne(measureId).expressions[0].typeName.should.equal('func');
      });
    });

    describe('click on delete button', () => {
      before(() => {
        Measures.collection.update(measureId, { expressions: [
          { _id: '1234', typeName: 'func', name: '' }, { _id: '2234', typeName: 'func', name: '' },
        ] });
        $('#test-environment .fa.fa-trash').click();
      });

      it('removes the last expression from the measure', () => {
        Measures.collection.findOne(measureId).expressions.length.should.equal(1);
      });
    });
  });
}
