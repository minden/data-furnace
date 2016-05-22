import React, { PropTypes } from 'react';
import { Panel, Button } from 'react-bootstrap';


const MeasureEditor = (props) => {
  return (
    <div>
      <div id="toolbox">
        <Button className="fa fa-balance-scale"> Measure</Button>
      </div>
    </div>
  );
};

MeasureEditor.propTypes = {
  measure: PropTypes.object.isRequired,
};

export default MeasureEditor;
