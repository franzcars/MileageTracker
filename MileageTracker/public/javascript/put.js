var express = require('express');
var router = express.Router();
var uuid = require("uuid");
var AWS = require("aws-sdk");
var fs = require('fs');
function handleUpdate() {
    AWS.config.update({
        region: "us-east-2"
    });
    var form = document.getElementById("update");
    var docClient = new AWS.DynamoDB.DocumentClient();

    var table = "Mileage";

    var vin = form.elements[0].value;
    var mileage = form.elements[1].value;
    var car = "Evo";
    var color = "White";
    console.log(vin);
    console.log(mileage);
    var params = {
        TableName: table,
        Item: {
            "id": uuid.v1(),
            "Vin": vin,
            "Mileage": mileage,
            "Color": color,
            "Car": car
        }
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            var stuff = JSON.stringify(data);
            console.log(data);
            console.log(stuff.Item);


        }
    });
}
/* GET home page. */
