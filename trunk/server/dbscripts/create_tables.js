/**
 * Created by gopi on 8/22/14.
 */
var app = require('../server');
var Q = require('q');
var dataSource = app.dataSources.t2spare;
var Listing = app.models.Listing;
var Listing_Comments = app.models.Listing_Comments;
var Listing_IP = app.models.Listing_IP;
var User = app.models.User;
var AccessToken = app.models.AccessToken;


function createAccessTokenTable(){
    var deferred = Q.defer();
    dataSource.automigrate('AccessToken', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table AccessToken");
            deferred.resolve("CREATED table AccessToken");
        }
    });
    return deferred.promise;
};

function createUserTable(){
    var deferred = Q.defer();
    dataSource.automigrate('User', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table User");
            deferred.resolve("CREATED table User");
        }
    });
    return deferred.promise;
};


function createListingTable(){
    var deferred = Q.defer();
    dataSource.automigrate('Listing', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table Listing");
            deferred.resolve("CREATED table Listing");
        }
    });
    return deferred.promise;
};

function createListingCommentsTable(){
    var deferred = Q.defer();
    dataSource.automigrate('Listing_Comments', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table Listing_Comments");
            deferred.resolve("CREATED table Listing_Comments");
        }
    });
    return deferred.promise;
}

function createListingIPTable(){
    var deferred = Q.defer();
    dataSource.automigrate('Listing_IP', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table Listing_IP");
            deferred.resolve("CREATED table Listing_IP");
        }
    });
    return deferred.promise;
}


console.log("*********Get ready! Creating TABLES***********");
createAccessTokenTable()
    .then(function(data){
        return createUserTable();
    })
    .then(function(data){
        return createListingTable();
    })
    .then(function(data){
        return createListingCommentsTable();
    })
    .then(function(data){
        return createListingIPTable();
    })
    .done(function(){
        console.log("**********All tables successfully created*************");
        dataSource.disconnect();
    }, function(err){
        console.log("Error occured while creating tables .... : "+err);
    });





/*dataSource.automigrate('User', function (err) {
    console.log("Created User table");
    console.log("Creating a user ....");
    User.create({email: 'foo@bar.com', password: 'bar'}, function(err, user) {
        if(err) {
            console.log("Error creating a user: " + err);
        }
        else {
            console.log("User: "+user);
            console.log("Fetching accessToken ....")
            User.login({email: 'foo@bar.com', password: 'bar'}, function(err, accessToken) {
                if(err){
                    console.log("Error fetching accessToken: "+accessToken);
                }
                else {
                    console.log("Access Token: "+accessToken);
                }
            });
        }

    });
});*/
