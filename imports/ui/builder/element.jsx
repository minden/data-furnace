import React, {PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import { ElementsCollection} from '../../api/elements.js';
import { createContainer } from 'meteor/react-meteor-data';
import AddElementButton from './add-element-button.jsx';

export default Element = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      subElements: ElementsCollection.find({parentId: this.props.data._id}).fetch(),
    }
  },

  getInitialState: function() {
    return {childrenVisible: true, buttonsVisible: false};
  },

  removeElement(event) {
    ElementsCollection.update({_id: this.props.data.parent}, {$pull: {children: this.props.data._id}});
    ElementsCollection.remove(this.props.data._id);
  },

  addSubElement(event) {
    var childId = ElementsCollection.insert({parent: this.props.data._id})
    ElementsCollection.update(this.props.data._id, {$addToSet: {children: childId}});
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

    const elementStyle = {
      paddingTop: '5px',
    };
     
    const elementItselfStyle = {
      border: '1px solid #ddd',
      padding: '10px',
    };

    const makeButtonsVisible = () => {
      this.setState({buttonsVisible: true});
    }

    const makeButtonsNotVisible = () => {
      this.setState({buttonsVisible: false});
    }

    return (
      <div className="element" style={elementStyle}>
        <div onMouseEnter={makeButtonsVisible} onMouseLeave={makeButtonsNotVisible} style={elementItselfStyle}>
          {toggleButton()}
          {this.props.data.typeName}
          {buttons()}
        </div>
        {children()}
      </div>
    )
  }
});
