/* eslint-env mocha */

import $ from 'jquery';
import MeasureExplorer from './measure-explorer.jsx';
import Measures from '../../api/measures/measures.js';
import { mount } from 'enzyme';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { should } from 'chai';
import { ListGroupItem } from 'react-bootstrap';
import subscribeAndWait from '../../helpers/subscribe-and-wait.js';
should();

describe('Measure explorer', () => {
  if (Meteor.isServer) return;

  let measureExplorer;
  let setSelectedMeasureIdFunctionCalled = false;

  before((done) => {
    measureExplorer = mount(
      <MeasureExplorer
        setSelectedMeasureId={function setSelected() {
          setSelectedMeasureIdFunctionCalled = true;
        }}
      />,
    );
    resetDatabase(null, () => {
      subscribeAndWait(['measures'], done);
    });
  });

  after(() => {
    $('#test-environment').remove();
  });

  it('should start of with a clean measure collection', () => {
    Measures.collection.find().count().should.equal(0);
  });

  describe('the plus button', () => {
    before(() => {
      measureExplorer.find('button.glyphicon-plus').simulate('click');
    });

    it('should insert a new measure into the db', () => {
      Measures.collection.find().count().should.equal(1);
    });

    it('should create a new measure in the ui', (done) => {
      const interval = setInterval(() => {
        if (measureExplorer.find(ListGroupItem).length === 1) {
          clearInterval(interval);
          true.should.equal(true);
          done();
        }
      }, 100);
    });
  });

  describe('the measure list', () => {
    before(() => {
      Measures.add();
      measureExplorer.find('.list-group div').first().simulate('click');
    });

    it('calls the setSelectedElementId() function, when measure is clicked', () => {
      setSelectedMeasureIdFunctionCalled.should.equal(true);
    });
  });
});
