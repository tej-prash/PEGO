function start(){
	scrollAmt=100;
	count=0;
	window.onscroll=getChunk;
	getChunk(0);
}
function imageExists(image_url){
    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}
function getChunk(check_scroll=1){
	let scroll=0;
	if(check_scroll){
		scroll=document.body.scrollTop||document.documentElement.scrollTop;
	}
	if((check_scroll && scroll>scrollAmt)||(check_scroll==0)){
		if(check_scroll){
			scrollAmt=scroll;
		}
		category=document.getElementById("cat_name").innerHTML.split(" ")[2];
		console.log("category name",category);
		params={category:category,count:count};
		$.ajax({
				type: "POST",
				url: "/category/"+category,
				data: params,
				cache: false,
				dataType:'json',
				statusCode:{
					200:function(){
						//window.location.href="/displaycatname/";
					}
				},
				success: function(response,textStatus, xhr){
					console.log(response);
					if(xhr.status=200){

						var el=document.getElementById("product");
						for(var i=0; i < response.length; i++) {
							var one=document.createElement("div");
							one.className="col-lg-4 col-md-6 mb-4";
							var two=document.createElement("div");
							two.className="card h-100";
							

							var img=document.createElement("img");
							var pic_url="http://localhost:3000/images/"+response[i].picture_url.slice(1)+"/1.jpg";
							if(imageExists(pic_url)==true){
								img.src=pic_url;
							}
							else{
								pic_url="http://localhost:3000/images/"+response[i].picture_url.slice(1)+"/1.jpeg";
								if(imageExists(pic_url)==true){
									img.src=pic_url;
								}
								else{
									pic_url="http://localhost:3000/images/"+response[i].picture_url.slice(1)+"/1.png";
									if(imageExists(pic_url)==true){
										img.src=pic_url;
									}
									else{
										img.alt="Not found";
									}
								}
							}
							img.height=200;
							img.width=200;
							img.className="card-img-top";

							two.appendChild(img);
							var three= document.createElement("div");
							three.className="card-body";

							var h4_ele = document.createElement("h4"); 
							h4_ele.id=response[i].product_id;
							h4_ele.className="card-title";
							// var t = document.createTextNode(response[i].product_id);
							// h4_id.appendChild(t);

							var a = document.createElement("a");
							a.href="/viewProduct?product_id="+response[i].product_id;
							var text = document.createTextNode(response[i].name);
							a.appendChild(text); 
							h4_ele.appendChild(a);

							// var n= document.createTextNode(response[i].name);
							var h5_ele = document.createElement("h5"); 
							var cost= document.createTextNode(response[i].cost);
							h5_ele.appendChild(cost);

							var p_ele=document.createElement("p");
							p_ele.className="card-text"
							var des= document.createTextNode(response[i].description);
							p_ele.appendChild(des);

							three.appendChild(h4_ele);
							three.appendChild(h5_ele);
							three.appendChild(p_ele);

							var four=document.createElement("div");
							four.className="card-footer";

							var small_ele=document.createElement("small");
							small_ele.className="text-muted";
							small_ele.innerHTML="&#9733; &#9733; &#9733; &#9733; &#9734;";
							// text=document.createTextNode("&#9733; &#9733; &#9733; &#9733; &#9734;")
							// small_ele.appendChild(text);
							four.appendChild(small_ele);

							two.appendChild(three);
							two.appendChild(four);
							one.appendChild(two);

							//id.appendChild(n);
							//id.appendChild(cost);
							//id.appendChild(des);
							
							//var div = document.createElement("div");
							//div.appendChild(img);
							//div.appendChild(id);
							//div.appendChild(a);
							el.appendChild(one);

						}
			}
		}
	})
	count=count+5;
	}
}

