exports.config = {
    framework: "jasmine2",
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 200000,
        realtimeFailure: true,
        showTiming: true,
        includeStackTrace: true,
        isVerbose: true,
        onComplete: null
    },
    specs: [
        "../../../e2e/*.js",
        "../../../www/**/e2e/notifications.spec.js",
        "../../../www/**/e2e/contacts.spec.js",
        "../../../www/**/e2e/messages.spec.js",
        "../../../www/**/e2e/login.spec.js",
        "../../../www/**/e2e/settings.spec.js",
        "../../../www/**/e2e/files.spec.js",
        "../../../www/**/e2e/notes.spec.js",
        "../../../www/**/e2e/calendar.spec.js"
    ],
    baseUrl: 'http://localhost:8100/',
    seleniumAddress: "http://" + process.env.SAUCE_USERNAME + ":" + process.env.SAUCE_ACCESS_KEY + "@ondemand.saucelabs.com:80/wd/hub",
    multiCapabilities: [{
        "name": 'chrome',
        "browserName": "chrome",
        "chromeOptions": {
            args: [
                "--allow-file-access",
                "--allow-file-access-from-files",
                "--enable-local-file-accesses",
                "--unlimited-storage"
            ]
        },
        "platform": "Windows 10",
        "version": "56.0",
        "username": process.env.SAUCE_USERNAME,
        "accessKey": process.env.SAUCE_ACCESS_KEY,
        "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER,
        "build": process.env.TRAVIS_BUILD_NUMBER
    }],
    restartBrowserBetweenTests: true,
    onPrepare: function () {
        var wd = require('wd'),
            protractor = require('protractor'),
            wdBridge = require('wd-bridge')(protractor, wd);
        wdBridge.initFromProtractor(exports.config);
        global.EC = protractor.ExpectedConditions;


        // Define global variables for our tests.
        global.ISANDROID = false;
        global.ISBROWSER = true;
        global.ISIOS = false;
        global.ISTABLET = false;
        global.DEVICEURL = 'http://localhost:8100/';
        global.DEVICEVERSION = undefined;
        global.SITEURL = 'http://school.demo.moodle.net';
        global.SITEVERSION = 3.3;
        global.SITEHASLM = false;
        global.USERS = {
            "STUDENT": {
                "LOGIN": "student",
                "PASSWORD": "moodle"
            },
            "TEACHER": {
                "LOGIN": "teacher",
                "PASSWORD": "moodle"
            },
            "ADMIN": {
                "LOGIN": "admin",
                "PASSWORD": "test"
            }
        };
    },
    getPageTimeout: 15000,
    plugins: [{
        "path": "../../../e2e/plugins/wait_for_transitions.js"
    }]
};