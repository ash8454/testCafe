'use strict';

const createTestCafe = require("gherkin-testcafe");
let testcafe = null;

createTestCafe("localhost", 1337, 1338)
    .then(tc => {
        testcafe = tc;
        const runner = testcafe.createRunner();

        return runner
            .src(['src/step_definitions/*.js', 'src/features/*.feature'])
            .browsers(["chrome"])
            .run({
                skipJsErrors: true,
                quarantineMode: true,
                selectorTimeout: 25000,
                assertionTimeout: 20000,
                pageLoadTimeout: 40000,
                speed: 0.8,
                stopOnFirstFail: false
            })
            .catch(function (error) {
                console.error(error);
            })
            .then(function (report) {
                testcafe.close();
            })
    });