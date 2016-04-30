import $ from 'jquery';
import Element from './element.jsx';
import Elements from '../../api/elements.js';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Meteor } from 'meteor/meteor';
import { after, before, describe, it } from 'meteor/practicalmeteor:mocha';
import { render } from 'react-dom';
import { should, expect } from 'meteor/practicalmeteor:chai';
should();
import { createContainer } from 'meteor/react-meteor-data';

if (Meteor.isClient) {
  describe.only('Element.jsx', () => {
    let elementId;
    let childElementId;
    let element;
    before(() => {
      const testEnvironment = document.createElement('div');
      testEnvironment.setAttribute('id', 'test-environment');
      document.body.appendChild(testEnvironment);

      elementId = Elements.add(undefined, 'hierarchy');
      childElementId = Elements.add(elementId, 'hierarchy');
      element = Elements.collection.findOne(elementId);

      render(<Element key={elementId} data={element} />,
              document.getElementById('test-environment'));
    });

    after(() => {
      //$('#test-environment').remove();
    });

    it('should exist', () => {
      $('.element').length.should.be.above(0);
    });

    it('should have an add- and a remove-element-button', () => {
      TestUtils.SimulateNative.mouseOver($('.element div')[0]);
      $('.element .buttons .add-element-button').length.should.be.above(0);
      $('.element .buttons .remove-element-button').length.should.be.above(0);
    });

    describe('with a child element', () => {
      before((done) => {
        const interval = setInterval(() => {
          if ($('.element .element').length > 0) {
            clearInterval(interval);
            done();
          }
        }, 100);
      });

      it('the child element is shown', () => {
        $('.element .element').length.should.not.equal(0);
      });

      describe('when clicking the tree toggle button', () => {
        before(() => {
          TestUtils.Simulate.click($('.element div span')[0]);
        });

        after(() => {
          TestUtils.Simulate.click($('.element div span')[0]);
        });

        it('the child element disappears', () => {
          $('.element .element').length.should.equal(0);
        });
      });

      describe('when clicking the remove-element-button on the child element', () => {
        before(() => {
          TestUtils.Simulate.mouseEnter($('.element .element div')[0]);
          TestUtils.Simulate.click($('.element .element .remove-element-button')[0]);
        });

        it('the element is deleted from the database', () => {
          let childElement = Elements.collection.findOne(childElementId);
          expect(childElement).to.equal(undefined);
        });

        it('the element is not visible in the UI', (done) => {
          const interval = setInterval(() => {
            if ($('.element .element').length === 0) {
              $('.element .element').length.should.equal(0);
              done();
              clearInterval(interval);
            }
          });
        });
      });
    });
  });
}

export default createContainer(() => {
  return { Elements: Elements.collection.find().fetch() };
}, Element);
