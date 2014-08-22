/**
 * Created by gopi on 8/22/14.
 */
var app = require('../server');
var dataSource = app.dataSources.t2spare;
var Listing = app.models.Listing;

dataSource.automigrate('Listing', function (err) {
    console.log("Created Listing table");
});