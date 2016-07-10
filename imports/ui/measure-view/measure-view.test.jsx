/* eslint-env mocha */
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import MeasureExplorer from './measure-explorer.jsx';
import MeasureEditor from './measure-editor/measure-editor.jsx';
import MeasureView from './measure-view.jsx';

describe('MeasureView', () => {
  if (Meteor.isServer) return;
  let view;

  before(() => {
    view = mount(<MeasureView />);
  });

  it('contains the measure explorer', () => {
    view.find(MeasureExplorer).should.have.length(1);
  });

  it('contains the measure editor', () => {
    view.find(MeasureEditor).should.have.length(1);
  });

  it('sets the selected measure state on setSelectedMeasureId function call', () => {
    view.instance().setSelectedMeasureId('1');
    view.state('selectedMeasureId').should.equal('1');
  });
});
