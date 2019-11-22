function showimg()
{
    var x = document.getElementById("product");
    var path = x.innerHTML;

    var image = document.createElement("img");
    image.class = "card-img-top img-fluid";
    image.src = path;

    var d = document.getElementById("actualimage");
    d.appendChild(image);

    setTimeout(functionmap, 2000);
}

function functionmap(){
    var API_KEY="cabab5e2ac8f4186a3f0a39732954ada";
    // var geocoder = new google.maps.Geocoder();
    //Get user address
    var userId=document.getElementById("userid").innerHTML;
    console.log(userId);
    var userAddress;
    params={user_id:userId};
    $.ajax({
        type: "POST",
        url: "/getuseraddress",
        data: params,
        cache: false,
        dataType:'json',
        // processData: false,
        success:function(response,textStatus, xhr){
            if(xhr.status==200){
                response=response[0];
                userAddress=response.street_name+","+response.locality+","+response.city+","+response.state+","+response.country;
                console.log(userAddress);
                // API for GeoCoding
                var api_url="https://api.opencagedata.com/geocode/v1/json"
                var request_url = api_url
                + '?'
                + 'key=' + API_KEY
                + '&q=' + userAddress
                + '&pretty=1'
                + '&no_annotations=1'
                + '&limit=1';
                var request = new XMLHttpRequest();
                request.open('GET', request_url, true);

                request.onload = function() {

                    if (request.status == 200){ 
                        // Success!
                        var data = JSON.parse(request.responseText);
                        console.log(data.results[0]);
                        var latitude=data.results[0].geometry.lat;
                        var longitude=data.results[0].geometry.lng;
                        initMap(latitude,longitude);

                    } else if (request.status <= 500){ 
                    // We reached our target server, but it returned an error
                                        
                        console.log("unable to geocode! Response code: " + request.status);
                        var data = JSON.parse(request.responseText);
                        console.log(data.status.message);
                    } else {
                        console.log("server error");
                    }
                };

                request.onerror = function() {
                    // There was a connection error of some sort
                    console.log("unable to connect to server");        
                };

                request.send();  // make the request

                // API for map loading 
                //initMap()
            }
            else{
                console.log("error");
            }
        }
    })
    // console.log(userAddress);
}
var map;
function initMap(lt,lg) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: lt, lng: lg},
        zoom: 18
    });
}