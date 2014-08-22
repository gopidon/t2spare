/**
 * Created by gopi on 8/22/14.
 */
var app = require('../server');
var dataSource = app.dataSources.t2spare;
var Listing = app.models.Listing;
var Listing_Comments = app.models.Listing_Comments;

dataSource.automigrate('Listing', function (err) {
    console.log("Created Listing table");
});

dataSource.automigrate('Listing_Comments', function (err) {
    console.log("Created Listing_Comments table");
});