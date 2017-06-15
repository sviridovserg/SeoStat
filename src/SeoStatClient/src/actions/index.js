import fetch from 'isomorphic-fetch'

export const CHANGE_URL = 'CHANGE_URL';
export const CHANGE_KEYWORDS = 'CHANGE_KEYWORDS';
export const UPDATE_SEO_POSITIONS = 'UPDATE_SEO_POSITIONS';

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

export const updateSeoPositions = (dispatcher, url, keywords) => {
    var params = {
        url: url,
        keywords: keywords
    };

    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    fetch('http://localhost:50516/api/seo?'+query).then(r => r.json()).then(data => {
        dispatcher({
            type: UPDATE_SEO_POSITIONS,
            positions: data
        });
    });

};
