var AWS = require('aws-sdk');
var path = require("path");
var fs = require('fs');

const uploadDir = function(s3Path, bucketName) {

    let s3 = new AWS.S3();

    s3.deleteObjects()

    function walkSync(currentDirPath, callback) {
        fs.readdirSync(currentDirPath).forEach(function (name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                walkSync(filePath, callback);
            }
        });
    }

    walkSync(s3Path, function(filePath, stat) {
        let bucketPath = filePath.substring(s3Path.length+1);
        let params = {Bucket: bucketName, Key: bucketPath, Body: fs.readFileSync(filePath), ContentType: 'text/html'};
        s3.putObject(params, function(err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log('Successfully uploaded '+ bucketPath +' to ' + bucketName);
            }
        });

    });
};

deleteObject = function (client, deleteParams) {
    client.deleteObject(deleteParams, function (err, data) {
        if (err) {
            console.log("delete err " + deleteParams.Key);
        } else {
            console.log("deleted " + deleteParams.Key);
        }
    });
};

listBuckets = function (client) {
    client.listBuckets({}, function (err, data) {
        var buckets = data.Buckets;
        var owners = data.Owner;
        for (var i = 0; i < buckets.length; i += 1) {
            var bucket = buckets[i];
            console.log(bucket.Name + " created on " + bucket.CreationDate);
        }
        for (var i = 0; i < owners.length; i += 1) {
            console.log(owners[i].ID + " " + owners[i].DisplayName);
        }
    });

};

deleteBucket = function (client, bucket) {
    client.deleteBucket({Bucket: bucket}, function (err, data) {
        if (err) {
            console.log("error deleting bucket " + err);
        } else {
            console.log("delete the bucket " + data);
        }
    });
};

clearBucket = function (client, bucket, resolve) {

    client.listObjects({Bucket: bucket}, function (err, data) {
        if (err) {
            console.log("error listing bucket objects " + err);
            return;
        }
        var items = data.Contents;
        for (var i = 0; i < items.length; i += 1) {
            var deleteParams = {Bucket: bucket, Key: items[i].Key};
            deleteObject(client, deleteParams);
        }
        resolve('fine');
    });

};

const myPromise = new Promise(function(resolve, reject) {
    var client = new AWS.S3();
    clearBucket(client, "hector-testbucket", resolve);
});

myPromise.then(function whenOk(response) {
    uploadDir("public", "hector-testbucket")
});





