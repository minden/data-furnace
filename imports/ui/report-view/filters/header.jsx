import React, { PropTypes } from 'react';
import Reports from '../../../api/reports/reports.js';
import RemoveButton from '../../components/remove-button.jsx';

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
      <RemoveButton
        onClick={() => Reports.filters.remove(props.reportId, props._id)}
        name={props.name}
        type={props.type}
      />
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
