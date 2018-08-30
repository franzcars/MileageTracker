exports.get = function handleSearch(Vin) {
    AWS.config.update({
        region: "us-east-2"
    });
    var docClient = new AWS.DynamoDB.DocumentClient();

    var table = "Mileage";
    var vin = Vin
    var car = "GTR";
    var color = "Silver";
    // console.log(vin);
    var params = {
        TableName: table,
        FilterExpression: 'Vin = :thisvin',
        ExpressionAttributeValues: {
            ":thisvin": vin
        }
    };

    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            var stuff = JSON.stringify(data);
            console.log(data.Items.length);
            for (var x = 0; x < data.Items.length; x++) {
                console.log(JSON.stringify(data.Items[x]));
            }
            return data.Items[data.Items.length - 1].Vin;
        }
    });

}