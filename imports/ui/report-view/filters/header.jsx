import React, { PropTypes } from 'react';
import Reports from '../../../api/reports/reports.js';
import { Glyphicon, Button } from 'react-bootstrap';

const getIcon = (type) => {
  if (type === 'element') {
    return 'fa fa-cube';
  }
  return 'fa fa-balance-scale';
};

const Header = (props) => {
  return (
    <div>
      <i className={getIcon(props.type)}> {props.name}</i>
      <Button
        className="pull-right"
        onClick={() => Reports.filters.remove(props.reportId, props._id)}
        style={{ color: '#DE4646', border: 'none', padding: '0px' }}
      >
        <Glyphicon className="pull-right" glyph="trash" />
      </Button>
    </div>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  reportId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Header;
