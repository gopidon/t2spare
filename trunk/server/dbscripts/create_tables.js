/**
 * Created by gopi on 8/22/14.
 */
var app = require('../server');
var Q = require('q');
var dataSource = app.dataSources.t2spare;
var Listing = app.models.Listing;
var ListingComment = app.models.ListingComment;
var ListingIntParty = app.models.ListingIntParty;
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

function createListingCommentTable(){
    var deferred = Q.defer();
    dataSource.automigrate('ListingComment', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table ListingComment");
            deferred.resolve("CREATED table ListingComment");
        }
    });
    return deferred.promise;
}

function createListingIntPartyTable(){
    var deferred = Q.defer();
    dataSource.automigrate('ListingIntParty', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table ListingIntParty");
            deferred.resolve("CREATED table ListingIntParty");
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
        return createListingCommentTable();
    })
    .then(function(data){
        return createListingIntPartyTable();
    })
    .done(function(){
        console.log("**********All tables successfully created*************");
        dataSource.disconnect();
    }, function(err){
        console.log("Error occured while creating tables .... : "+err);
        dataSource.disconnect();
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
