import '@testing-library/jest-dom';

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};

import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;