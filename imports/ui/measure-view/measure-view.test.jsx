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

  before((done) => {
    view = mount(<MeasureView />);
    const interval = setInterval(() => {
      if (view.find('MeasureView').props().ready) {
        clearInterval(interval);
        done();
      }
    });
  });

  it('contains the measure explorer', () => {
    view.find(MeasureExplorer).should.have.length(1);
  });

  it('contains the measure editor', () => {
    view.find(MeasureEditor).should.have.length(1);
  });
});
