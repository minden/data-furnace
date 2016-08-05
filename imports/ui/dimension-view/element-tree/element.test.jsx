/* eslint-env mocha */

import $ from 'jquery';
import Element from './element.jsx';
import Elements from '../../../api/elements/elements.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { should, expect } from 'chai';
import subscribeAndWait from '../../../helpers/subscribe-and-wait.js';
should();

if (Meteor.isClient) {
  let elementId;
  let element;
  let childElementId;
  let childChildElementId;

  describe('Element.jsx', () => {
    before((done) => {
      subscribeAndWait(['elements'], done);
    });

    before(() => {
      const testEnvironment = document.createElement('div');
      testEnvironment.setAttribute('id', 'test-environment');
      document.body.appendChild(testEnvironment);

      elementId = Elements.add(undefined, 'dimensionLevel');
      childElementId = Elements.add(elementId, 'dimensionLevel');
      element = Elements.collection.findOne(elementId);

      render(<Element key={elementId} element={element} setSelectedElementId={() => {}} />,
              document.getElementById('test-environment'));
    });

    after(() => {
      $('#test-environment').remove();
    });

    it('should exist', () => {
      $('.element').length.should.be.above(0);
    });

    it('should have an add- and a remove-element-button', () => {
      TestUtils.SimulateNative.mouseOver($('.element div')[0]);
      $('.element .buttons .add-element-button').length.should.be.above(0);
      $('.element .buttons .remove-element-button').length.should.be.above(0);
    });

    describe('when adding a child child element', () => {
      before((done) => {
        childChildElementId = Elements.add(childElementId, 'dimensionLevel');
        $('span.glyphicon-chevron-right').click();
        $('span.glyphicon-chevron-right').click();
        $('span.glyphicon-chevron-right').click();
        const interval = setInterval(() => {
          if ($('.element .element .element').length > 0) {
            clearInterval(interval);
            done();
          }
        }, 100);
      });

      it('the child child element is shown', () => {
        $('.element .element .element').length.should.not.equal(0);
      });

      describe('when changing the name', () => {
        const newElementName = 'newElementName';
        before(() => {
          TestUtils.Simulate.click($('.element .element .element div.inplace-edit-textfield')[0]);
          $('input.inplace-edit-inputfield').val(newElementName);
          TestUtils.Simulate.blur($('.element .element .element input.inplace-edit-inputfield')[0]);
        });

        it('should change the name in the mongo db', () => {
          Elements.collection.findOne(childChildElementId).name.should.equal(newElementName);
        });
      });

      describe('when clicking the tree toggle button', () => {
        before(() => {
          TestUtils.Simulate.click($('.element .element div span')[0]);
        });

        after(() => {
          TestUtils.Simulate.click($('.element .element div span')[0]);
        });

        it('the child child element disappears', () => {
          $('.element .element .element').length.should.equal(0);
        });
      });

      describe('when clicking the remove-element-button on the child child element', () => {
        before(() => {
          TestUtils.Simulate.mouseEnter($('.element .element .element div')[0]);
          TestUtils.Simulate.click($('.element .element .element .remove-element-button')[0]);
        });

        it('the child child element is deleted from the database', () => {
          const childChildElement = Elements.collection.findOne(childChildElementId);
          expect(childChildElement).to.equal(undefined);
        });

        it('the child child element is not visible in the UI', (done) => {
          const interval = setInterval(() => {
            if ($('.element .element .element').length === 0) {
              $('.element .element .element').length.should.equal(0);
              done();
              clearInterval(interval);
            }
          });
        });
      });
    });
  });
}
