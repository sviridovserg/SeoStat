import fetch from 'isomorphic-fetch'

export const CHANGE_URL = 'CHANGE_URL';
export const CHANGE_KEYWORDS = 'CHANGE_KEYWORDS';
export const UPDATE_SEO_POSITIONS = 'UPDATE_SEO_POSITIONS';
export const BEGIN_UPDATE_SEO_POSITIONS = 'BEGIN_UPDATE_SEO_POSITIONS';
export const SET_ERROR = 'SET_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export const changeURL = (url) => {
    return {
        type: CHANGE_URL,
        url: url
    };
};

export const changeKeywords = (keywords) => {
    return {
        type: CHANGE_KEYWORDS,
        keywords: keywords
    };
};

export const setError = (error) => {
    return  {
        type: SET_ERROR,
        error: error
    };
};

export const removeError = () => {
    return {
        type: REMOVE_ERROR
    };
};

export const beginUpdateSeoPositions = () => {
    return {
        type: BEGIN_UPDATE_SEO_POSITIONS
    };
};


export const updateSeoPositions = (dispatch, url, keywords) => {
    var params = {
        url: url,
        keywords: keywords
    };
    dispatch(beginUpdateSeoPositions());
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    fetch('http://localhost:50516/api/seo?'+query)
        .then(r => r.json())
        .then(data => {
            dispatch({
                type: UPDATE_SEO_POSITIONS,
                positions: data
            });
        })
        .catch(err => {
            dispatch(setError('An error occured during processing of yor request'));
        });

};
