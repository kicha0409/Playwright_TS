import reporter from 'cucumber-html-reporter';

reporter.generate({
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber-report.json',
    output: 'reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    brandTitle: '<img src="./hcl.png" width="35px" height="auto" "> Test Completion Report',
    metadata: {
        device: 'Local test machine',
    },
});