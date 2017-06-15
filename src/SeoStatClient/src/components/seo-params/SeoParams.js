import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

import { changeURL, changeKeywords } from '../../actions';

const SeoParams = (props) => {
    return (
        <div className="row">
            <div className="col-xs-6">
                <FormControl type="text" placeholder="Keywords" value={props.keywords} onChange={props.onKeywordsChanged}/>
            </div>
            <div className="col-xs-6">
                <FormControl type="text" placeholder="Url" value={props.url} onChange={props.onUrlChanged}/>
            </div>
        </div>
    );
};

SeoParams.propTypes = {
    url: PropTypes.string.isRequired,
    keywords: PropTypes.string.isRequired,
    onKeywordsChanged: PropTypes.func.isRequired,
    onUrlChanged: PropTypes.func.isRequired
};


const mapStateToProps = ({params}) => {
    return {
        url: params.url,
        keywords: params.keywords
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onKeywordsChanged: (e) => dispatch(changeKeywords(e.target.value)),
        onUrlChanged: (e) => dispatch(changeURL(e.target.value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeoParams);