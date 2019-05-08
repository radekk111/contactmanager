import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  const { branding } = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          {branding}
        </NavLink>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact={true} to="/" activeClassName="active" className="nav-link">
                <i className="fas fa-home" aria-hidden="true"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact/add" activeClassName="active" className="nav-link">
                <i className="fas fa-plus" aria-hidden="true"></i> Add Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" activeClassName="active" className="nav-link">
                <i className="fas fa-question" aria-hidden="true"></i> About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

Header.defaultProps = {
  branding: 'My app'
}

Header.propTypes = {
  branding: PropTypes.string.isRequired
}

export default Header;