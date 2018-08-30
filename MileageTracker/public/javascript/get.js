function get() {
    console.log("clicked");
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/get?' + 'Vin=' + document.getElementById("CheckVin").value, true);
    //xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState === 4) {
            //console.log(xhttp.response);
            document.getElementById("VinDiv").innerHTML = "The mileage for " + document.getElementById("CheckVin").value +" is: " + xhttp.response;
        }
        
    };
    //console.log(document.getElementById("CheckVin").value);
    xhttp.send('Vin=' + document.getElementById("CheckVin").value);
    var vin = xhttp.response;
    console.log(vin);
}


/*$("#Check").on("click", function () {
    $.


        });
        */



