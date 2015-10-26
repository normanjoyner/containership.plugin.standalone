var _ = require("lodash");
var async = require("async");
var ContainershipPlugin = require("containership.plugin");
var providers = require([__dirname, "lib", "providers", "index"].join("/"));

module.exports = new ContainershipPlugin({
    type: "cli",

    initialize: function(){
        var self = this;

        return {
            init: function(options){
                var provider = providers[options.provider];

                provider.validate(function(err){
                    if(err)
                        throw err;

                    if(options.action == "create"){
                        provider.create({
                            leaders: options.leaders,
                            followers: options.followers,
                            plugins: options.plugins
                        }, function(err){
                            if(err)
                                throw err;
                        });
                    }
                    else if(options.action == "destroy"){
                        provider.destroy(function(err){
                            if(err)
                                throw err;
                        });
                    }
                    else{
                        provider.status(function(err, statuses){
                            if(err)
                                throw err;

                            console.log("HOST\t\t\tSTATUS");
                            _.each(statuses, function(status){
                                console.log([status.host, status.status].join("\t\t"));
                            });
                        });
                    }
                });
            },

            options: {
                action: {
                    position: 1,
                    help: "Action to perform on cluster [create, destroy, status]",
                    choices: ["create", "destroy", "status"],
                    required: true
                },
                leaders: {
                    help: "Number of leaders to create",
                    metavar: "LEADERS",
                    default: 1
                },
                followers: {
                    help: "Number of followers to create",
                    metavar: "FOLLOWERS",
                    default: 2
                },
                provider: {
                    help: "Virtualization provider",
                    metavar: "PROVIDER",
                    default: "vagrant",
                    choices: ["vagrant"]
                },
                plugins: {
                    help: "List of ContainerShip plugins to install",
                    metavar: "PLUGINS",
                    default: "navigator,service-discovery"
                }
            }
        }
    },

    reload: function(){}
});
