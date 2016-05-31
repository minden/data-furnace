/* eslint-env mocha */

import $ from 'jquery';
import ElementDetails from './element-details.jsx';
import Elements from '../../../api/elements/elements.js';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { should } from 'chai';
import TestUtils from 'react-addons-test-utils';
should();

if (Meteor.isClient) {
  describe('Element details', () => {
    let elementId;
    let element;
    let elementDetails;

    before(() => {
      elementId = Elements.add(null, 'dimension');
      element = Elements.collection.findOne(elementId);
      const testEnvironment = document.createElement('div');
      testEnvironment.setAttribute('id', 'test-environment');
      document.body.appendChild(testEnvironment);
      render(
        <ElementDetails
          elementId={elementId}
          element={element}
          setSelectedElementId={() => {}}
        />,
        document.getElementById('test-environment')
      );
      elementDetails = $('#test-environment .panel.panel-default');
    });

    after(() => {
      // $('#test-environment').remove();
    });

    it('should exist', () => {
      elementDetails.length.should.be.above(0);
    });

    it('should show the correct type label', () => {
      $('span.label').text().should.equal('Dimension');
    });

    describe('after changing the description', () => {
      const elementDescription = 'example description';

      before(() => {
        TestUtils.Simulate.click($('.form-group div.inplace-edit-textfield')[0]);
        $('input.inplace-edit-inputfield').val(elementDescription);
        TestUtils.Simulate.blur($('input.inplace-edit-inputfield')[0]);
      });

      it('the new description is in the mongoDB', () => {
        Elements.collection.findOne(elementId).description.should.equal(elementDescription);
      });

      it('the new description is displayed', (done) => {
        const interval = setInterval(() => {
          if ($('.form-group div.inplace-edit-textfield').text() === elementDescription) {
            true.should.equal(true);
            clearInterval(interval);
            done();
          }
        }, 0);
      });
    });

    describe('attributes', () => {
      describe('when clicking the plus button', () => {
        before(() => {
          $('button.glyphicon-plus').click();
        });

        it('a new attribute is displayed', (done) => {
          const interval = setInterval(() => {
            if ($('#element-attributes .form-group').length === 1) {
              true.should.equal(true);
              clearInterval(interval);
              done();
            }
          }, 0);
        });

        it('a new attribute is added to the element', () => {
          Elements.collection.findOne(elementId).attributes.length.should.equal(1);
        });
      });

      describe('when changing the name of the attribute', () => {
        const attributeName = 'example attribute name';

        before(() => {
          TestUtils.Simulate.click($('.attribute-name div.inplace-edit-textfield')[0]);
          $('.attribute-name input.inplace-edit-inputfield').val(attributeName);
          TestUtils.Simulate.blur($('.attribute-name input.inplace-edit-inputfield')[0]);
        });

        it('the new description is in the mongoDB', () => {
          Elements.collection.findOne(elementId).attributes[0].name.should.equal(attributeName);
        });

        it('the new description is displayed', (done) => {
          const interval = setInterval(() => {
            if ($('.attribute-name div.inplace-edit-textfield').text() === attributeName) {
              true.should.equal(true);
              clearInterval(interval);
              done();
            }
          }, 0);
        });
      });

      describe('when changing the type of the attribute', () => {
        const attributeType = 'example attribute name';

        before(() => {
          TestUtils.Simulate.click($('.attribute-type div.inplace-edit-textfield')[0]);
          $('.attribute-type input.inplace-edit-inputfield').val(attributeType);
          TestUtils.Simulate.blur($('.attribute-type input.inplace-edit-inputfield')[0]);
        });

        it('the new description is in the mongoDB', () => {
          Elements.collection.findOne(elementId).attributes[0].type.should.equal(attributeType);
        });

        it('the new description is displayed', (done) => {
          const interval = setInterval(() => {
            if ($('.attribute-type div.inplace-edit-textfield').text() === attributeType) {
              true.should.equal(true);
              clearInterval(interval);
              done();
            }
          }, 0);
        });
      });
    });
  });
}
