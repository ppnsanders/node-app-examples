'use strict';

module.exports = function IndexModel(page) {
    if(page === 'single-pageapp') {
        return {
            component: 'single-pageapp',
            title: 'SPA - Checkout'
        };
    } else {
        return {
            name: 'index'
        };
    }
};