/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { should } from 'chai';
import Expressions from './measures-expressions.js';
import Measures from './measures.js';
import { resetDatabase } from 'meteor/xolvio:cleaner';
should();

if (Meteor.isServer) {
  describe('Expressions.types', () => {
    it('should be an array', () => {
      Expressions.types.should.be.an('array');
    });

    describe('each type', () => {
      Expressions.types.forEach((type) => {
        describe(type.name, () => {
          it('should have a name', () => {
            type.name.should.exist;
          });

          it('should have an icon', () => {
            type.icon.should.exist;
          });

          it('should have possibleFollowers', () => {
            type.possibleFollowers.should.exist;
          });
        });
      });
    });

    describe('.get', () => {
      let type;

      before(() => {
        type = Expressions.types.get('attribute');
      });

      it('should return a type for a type name', () => {
        type.should.deep.equal(Expressions.types[0]);
      });
    });
  });

  describe('Expressions.add', () => {
    let measureId;

    before(() => {
      resetDatabase();
      measureId = Measures.add();
      Expressions.add(measureId, 'attribute');
    });

    it('should insert an Expression into the expressions array of a measure', () => {
      Measures.collection.findOne(measureId).expressions[0].typeName.should.equal('attribute');
    });
  });

  describe('Expressions.removeLast', () => {
    let measureId;

    before(() => {
      resetDatabase();
      measureId = Measures.add();
      Expressions.add(measureId, 'operator');
      Expressions.add(measureId, 'attribute');
      Expressions.removeLast(measureId);
    });

    it('should remove the last element from the expressions array of the measure', () => {
      Measures.collection.findOne(measureId).expressions[0].typeName.should.equal('operator');
      Measures.collection.findOne(measureId).expressions.length.should.equal(1);
    });
  });

  describe('Measures.Expressions.setName', () => {
    let measureId;
    let expressionId;
    const newExpressionName = 'My awesome new expression name';

    before(() => {
      resetDatabase();
      measureId = Measures.add();
      expressionId = Expressions.add(measureId, 'operator');
      Meteor.call('Measures.Expressions.setName', measureId, expressionId, newExpressionName);
    });

    it('should set the name of an expression', () => {
      Measures.collection.findOne(measureId).expressions[0].name.should.equal(newExpressionName);
    });
  });

  describe('Measures.Expressions.setMeasure', () => {
    let measureId;
    let expressionId;
    const newExpressionMeasure = 'My awesome new measure Id';

    before(() => {
      resetDatabase();
      measureId = Measures.add();
      expressionId = Expressions.add(measureId, 'operator');
      Meteor.call('Measures.Expressions.setMeasure', measureId, expressionId, newExpressionMeasure);
    });

    it('should set the measure of an expression', () => {
      const measure = Measures.collection.findOne(measureId);
      measure.expressions[0].measureId.should.equal(newExpressionMeasure);
    });
  });
}
