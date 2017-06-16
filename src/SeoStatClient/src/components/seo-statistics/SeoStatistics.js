import  React  from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import SeoParams from '../seo-params/SeoParams';
import { updateSeoPositions } from '../../actions';

const SeoStatistics = (props) => {
    return (
        <div className="container">
            <div className="app-row text-center">
                <SeoParams />
            </div>
            <div className="app-row text-center">
                <Button bsStyle="info" className="btn-raised convert-btn" onClick={() => props.onUpdatePositions(props.url, props.keywords)}>Get Seo Positions</Button>
            </div>
            <div className="app-row text-center">
                <h3>{props.result}</h3>
            </div>
        </div>
    );
};

SeoStatistics.propTypes = {
    url: PropTypes.string.isRequired,
    keywords: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    onUpdatePositions: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
    return {
        url: state.params.url,
        keywords: state.params.keywords,
        result: state.result.result
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdatePositions: (url, keywords) => {
            updateSeoPositions(dispatch, url, keywords);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeoStatistics);

