import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import Elements from '../../api/elements.js';
import { createContainer } from 'meteor/react-meteor-data';
import AddElementButton from './add-element-button.jsx';

export default Element = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      subElements: Elements.collection.find({parentId: this.props.data._id}).fetch(),
    }
  },

  getInitialState: function() {
    return {childrenVisible: true, buttonsVisible: false};
  },

  removeElement(event) {
    Elements.collection.update({_id: this.props.data.parent}, {$pull: {children: this.props.data._id}});
    Elements.collection.remove(this.props.data._id);
  },

  addSubElement(event) {
    var childId = Elements.collection.insert({parent: this.props.data._id})
    Elements.collection.update(this.props.data._id, {$addToSet: {children: childId}});
  },

  render() {
    const toggleButton = () => {
      const togglerClasses = () => {
        if(this.data.subElements.length === 0){
          return '';
        } else {
          if(this.state.childrenVisible){
            return 'glyphicon glyphicon-chevron-down';
          } else {
            return 'glyphicon glyphicon-chevron-right';
          }
        }
      };
      const toggleChildrenVisible = () => {
        this.setState({childrenVisible: !this.state.childrenVisible});
      };
      return (
        <span className={togglerClasses()} onClick={toggleChildrenVisible} style={{paddingRight: '10px'}}></span>
      );
    }

    const children = () => {
      const subElementsListStyle = {
        marginBottom: '0px',
        paddingLeft: '20px',
      };

      if(this.state.childrenVisible === true) {
        return (
          <div className="list-group sub-elements-list" style={subElementsListStyle}>
            {this.data.subElements.map(function(element) {
              return <Element key={element._id} data={element}/>;
            })}
          </div >
        )
      }
    };

    const buttons = () => {
      const buttonsStyle = {
        display: 'inline',
        float: 'right',
      };

      const removeButtonStyle = {
        border: 'none',
        padding: '0px',
        paddingTop: '1px',
        paddingLeft: '2px',
      };

      if(this.state.buttonsVisible) {
        return(
          <div className="buttons" style={buttonsStyle}>
            <AddElementButton elementId={this.props.data._id}/>
            <Button
              className="glyphicon glyphicon-remove" 
              onClick={this.removeElement}
              style={removeButtonStyle}
            ></Button>
          </div>
        );
      }
    }

    const makeButtonsVisible = () => {
      this.setState({buttonsVisible: true});
    }

    const makeButtonsNotVisible = () => {
      this.setState({buttonsVisible: false});
    }

    return (
      <div className="element" style={{paddingTop: '5px'}}>
        <div 
          onMouseEnter={makeButtonsVisible} 
          onMouseLeave={makeButtonsNotVisible} 
          style={{border: '1px solid #ddd', padding: '10px'}}
        >
          {toggleButton()}
          {Elements.types.nameToHumanName(this.props.data.typeName)}
          {buttons()}
        </div>
        {children()}
      </div>
    )
  }
});
