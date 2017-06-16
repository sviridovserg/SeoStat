import  React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {Alert} from 'react-bootstrap'

import {removeError} from '../../actions'

const ErrorMessage = (props) => {
    const alert = (
        <Alert bsStyle="danger" onDismiss={props.onCloseError}>
            <strong>Error!</strong> {props.error}.
        </Alert>
    );
    return (props.error ? alert : null);
};

ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired
};

const mapStateToProps = ({errors}) => {
    return {
        error: errors.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseError: (e) => dispatch(removeError()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
