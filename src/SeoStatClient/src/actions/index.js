export const CHANGE_URL = 'CHANGE_URL';
export const CHANGE_KEYWORDS = 'CHANGE_KEYWORDS';

export const changeURL = (url) => {
    return {
        type: CHANGE_URL,
        url: url
    };
};

export const changeKeywords = (keywords) => {
    return {
        type: CHANGE_KEYWORDS,
        text: keywords
    };
};
