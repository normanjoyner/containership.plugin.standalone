var _ = require("lodash");

var tests = {
    vagrant: require([__dirname, "vagrant"].join("/"))
}

var run_tests = function(){
    _.each(tests, function(test, test_name){
        test.start();
    });
}

run_tests();
