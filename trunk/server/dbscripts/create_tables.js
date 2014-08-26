/**
 * Created by gopi on 8/22/14.
 */
var app = require('../server');
var Q = require('q');
var dataSource = app.dataSources.t2spare;
var Listing = app.models.Listing;
var ListingComment = app.models.ListingComment;
var ListingIntParty = app.models.ListingIntParty;
var User = app.models.user;
var userIdentity = app.models.userIdentity;
var UserCredential = app.models.userCredential;
var AccessToken = app.models.AccessToken;
var Role = app.models.role;


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

function createACLTable(){
    var deferred = Q.defer();
    dataSource.automigrate('acl', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table acl");
            deferred.resolve("CREATED table acl");
        }
    });
    return deferred.promise;
};

function createRoleMappingTable(){
    var deferred = Q.defer();
    dataSource.automigrate('roleMapping', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table roleMapping");
            deferred.resolve("CREATED table roleMapping");
        }
    });
    return deferred.promise;
};

function createRoleTable(){
    var deferred = Q.defer();
    dataSource.automigrate('role', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            Role.create({name: 'ADMIN', description: 'admin role'}, function (err, role) {
                Role.create({name: 'AUTH', description: 'authorised role'}, function (err, role) {
                    Role.create({name: 'ANON', description: 'anonymous role'}, function (err, role) {
                        console.log("CREATED table role with default entries");
                        deferred.resolve("CREATED table role");
                    });
                });
            });
        }
    });
    return deferred.promise;
};

function createUserTable(){
    var deferred = Q.defer();
    dataSource.automigrate('user', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table user");
            deferred.resolve("CREATED table user");
        }
    });
    return deferred.promise;
};

function createUserIdentityTable(){
    var deferred = Q.defer();
    dataSource.automigrate('userIdentity', function(err){
        if(err){
            console.log("Error:"+err);
            deferred.reject(err);
        }
        else{
            console.log("CREATED table userIdentity");
            deferred.resolve("CREATED table userIdentity");
        }
    });
    return deferred.promise;
};

function createUserCredentialTable(){
    var deferred = Q.defer();
    dataSource.automigrate('userCredential', function(err){
        if(err){
            deferred.reject(err);
        }
        else{
            console.log("CREATED table userCredential");
            deferred.resolve("CREATED table userCredential");
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
createUserTable()
    .then(function(data){
        return createRoleMappingTable();
    })
    .then(function(data){
        return createRoleTable();
    })
    .then(function(data){
        return createACLTable();
    })
    .then(function(data){
        return createUserIdentityTable();
    })
    .then(function(data){
        return createUserCredentialTable();
    })
    .then(function(data){
        return createAccessTokenTable();
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
