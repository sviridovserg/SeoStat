import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

import { updateSeoPositions, changeURL, changeKeywords } from '../../actions';
import LoadingIndicator from '../loading-indicator/LoadingIndicator'
import './SeoStatistics.css';

const isEmpty = (value) => {
    return value === '' || value === undefined || value === null;
};
class SeoStatistics extends Component {
    getValidationStateValue(value) {
        return isEmpty(value) ? 'error' : null;
    }
    render() {
        const props = this.props;
        const isValid = !isEmpty(props.keywords) && !isEmpty(props.url);
        const loading = props.isLoading ? (<LoadingIndicator />) : null
        return (
            <div className="container">
                {loading}
                <div className="app-row row text-center">
                    <div className="col-xs-6">
                        <FormGroup className="input-validate" validationState={ this.getValidationStateValue(props.keywords) }>
                            <FormControl type="text" placeholder="Keywords" value={props.keywords} onChange={props.onKeywordsChanged} />
                            <HelpBlock>Keywords should not be empty</HelpBlock>
                        </FormGroup>
                    </div>
                    <div className="col-xs-6">
                        <FormGroup className="input-validate" validationState={ this.getValidationStateValue(props.url) }>
                            <FormControl type="text" placeholder="Url" value={props.url} onChange={props.onUrlChanged} />
                            <HelpBlock>Url should not be empty</HelpBlock>
                        </FormGroup>
                    </div>
                </div>
                <div className="app-row text-center">
                    <Button bsStyle="info" className="btn-raised convert-btn" disabled={!isValid} onClick={() => props.onUpdatePositions(props.url, props.keywords)} >Get Seo Positions</Button>
                </div>
                <div className="app-row text-center">
                    <h3>{props.result}</h3>
                </div>
            </div>
        );
    }
}

SeoStatistics.propTypes = {
    url: PropTypes.string.isRequired,
    keywords: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onUpdatePositions: PropTypes.func.isRequired,
    onKeywordsChanged: PropTypes.func.isRequired,
    onUrlChanged: PropTypes.func.isRequired
};


const mapStateToProps = (state) => {
    return {
        url: state.params.url,
        keywords: state.params.keywords,
        result: state.result.result,
        isLoading: state.result.isFetching,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onKeywordsChanged: (e) => dispatch(changeKeywords(e.target.value)),
        onUrlChanged: (e) => dispatch(changeURL(e.target.value)),
        onUpdatePositions: (url, keywords) => {
            if (isEmpty(url) || isEmpty(keywords)) {
                return;
            }
            updateSeoPositions(dispatch, url, keywords);
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SeoStatistics);

