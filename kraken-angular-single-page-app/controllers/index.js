'use strict';

var IndexModel = require('../models/index');


module.exports = function (router) {

    router.get('/', function (req, res) {
        var model = new IndexModel('single-pageapp');
        res.cookie('XSRF-TOKEN', res.locals._csrf); //setting a cookie that is accessible by Angular
        res.render('index', model);
    });
};