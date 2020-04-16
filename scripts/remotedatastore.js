(function (window){
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore(url){
        if(!url){
            throw new Error('No remote URL supplied.');
        }

        this.serverUrl = url;
    }
    
    RemoteDataStore.prototype.add = function (key, val){
        $.post(this.serverUrl, val, function (serverResponse) {   
            //add to db or firebase database
            db.collection("customer").doc(key).set(val);
            console.log(serverResponse);
        });
    };

    RemoteDataStore.prototype.getAll = function (cb) {
        $.get(this.serverUrl, function (serverResponse){
            console.log(serverResponse);
            //cb(serverResponse);

            db.collection('customer').get().then(snap => snap.foreEach(doc =>{
                console.log(doc.data());
            }))
        });
    };

    RemoteDataStore.prototype.get = function (key, cb) {
        $.get(this.serverUrl + '/' + key, function (serverResponse){
            console.log(serverResponse);
            cb(serverResponse);

            //get iwth firebase
            db.collection("customer").doc(key).get().then(doc =>{
                console.log(doc.data())
            })
        });
    };

    RemoteDataStore.prototype.remove = function (key) {
        $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
    };
    

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window);