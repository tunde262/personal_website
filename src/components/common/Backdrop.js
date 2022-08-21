import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Backdrop = ({ click }) => (
    <div className="backdrop" onClick={click} />
);

Backdrop.propTypes = {
    nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    nav: state.nav
})

export default connect(mapStateToProps, null)(Backdrop);

