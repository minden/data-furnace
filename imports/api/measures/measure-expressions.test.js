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

          it('has a UI name', () => {
            type.uIName.should.exist;
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

  describe('Expressions.addBehindExpression', () => {
    let measureId;
    let firstExpressionId;

    before(() => {
      resetDatabase();
      measureId = Measures.add();
      firstExpressionId = Expressions.addBehindExpression(measureId, 'attribute');
    });

    it('should insert an Expression into the expressions array of a measure', (done) => {
      let measure;
      Meteor.setInterval(() => {
        measure = Measures.collection.findOne(measureId);
        if (measure) {
          measure.expressions[0].typeName.should.equal('attribute');
          done();
        }
      }, 100);
    });

    it('inserts an Expression behind the provided ExpressionId', () => {
      const secondExpressionId =
        Expressions.addBehindExpression(measureId, 'attribute', firstExpressionId);
      Measures.collection.findOne(measureId).expressions[1]._id.should.equal(secondExpressionId);
    });
  });

  describe('Expressions.remove', () => {
    let measureId;
    let firstExpressionId;

    before(() => {
      resetDatabase();
      measureId = Measures.add();
      firstExpressionId = Expressions.addBehindExpression(measureId, 'operator');
      Expressions.addBehindExpression(measureId, 'attribute');
      Expressions.remove(measureId, firstExpressionId);
    });

    it('removes the expression', () => {
      Measures.collection.findOne(measureId).expressions[0].typeName.should.equal('attribute');
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
      expressionId = Expressions.addBehindExpression(measureId, 'operator');
      Meteor.call('Measures.Expressions.setName', measureId, expressionId, newExpressionName);
    });

    it('should set the name of an expression', () => {
      Measures.collection.findOne(measureId).expressions[0].name.should.equal(newExpressionName);
    });
  });

  describe('Measures.Expressions.setMeasureId', () => {
    let measureId;
    let expressionId;
    const newExpressionMeasure = 'My awesome new measure Id';

    before(() => {
      resetDatabase();
      measureId = Measures.add();
      expressionId = Expressions.addBehindExpression(measureId, 'operator');
      Meteor.call(
        'Measures.Expressions.setMeasureId',
        measureId,
        expressionId,
        newExpressionMeasure
      );
    });

    it('should set the measure of an expression', () => {
      const measure = Measures.collection.findOne(measureId);
      measure.expressions[0].measureId.should.equal(newExpressionMeasure);
    });
  });
}
