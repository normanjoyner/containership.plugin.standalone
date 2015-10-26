var assert = require("assert");
var providers = require([__dirname, "..", "lib", "providers"].join("/"));

var provider = providers.vagrant;

module.exports = {

    start: function(){
        describe("vagrant_create", function(){
            this.timeout(10 * 60 * 1000);

            it("should create ContainerShip cluster", function(fn){
                provider.create({
                    leaders: 1,
                    followers: 1,
                    plugins: "navigator,service-discovery"
                }, fn);
            });

            after(function(fn){
                provider.destroy(fn);
            });
        });
    }

}
