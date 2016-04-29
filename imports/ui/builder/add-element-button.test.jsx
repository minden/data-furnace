import $ from 'jquery';
import AddElementButton from './add-element-button.jsx';
import Elements from '../../api/elements.js';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { after, before, describe, it } from 'meteor/practicalmeteor:mocha';
import { render } from 'react-dom';
import { should } from 'meteor/practicalmeteor:chai';
should();

if (Meteor.isClient) {
  describe('AddElementButton', () => {
    before(() => {
      const testEnvironment = document.createElement('div');
      testEnvironment.setAttribute('id', 'test-environment');
      document.body.appendChild(testEnvironment);
      render(<AddElementButton />, document.getElementById('test-environment'));
    });

    after(() => {
      $('#test-environment').remove();
    });

    const addElementButton = $('.test-environment .dropdown.btn-group');
    it('should exist', () => {
      addElementButton.should.exist;
    });

    describe('click on "plus" and "Referece object" button', () => {
      let amountBefore;
      let amountAfter;

      before( () => {
        amountBefore = Elements.collection.find().count();
        $('.btn-group')[0].click();
        $('a:contains("Hierarchy")')[0].click();
        amountAfter = Elements.collection.find().count();
      });

      it('should create a new referenceObject element in the database', () => {
        amountBefore.should.equal(amountAfter - 1);
      });
    });
  });
}
