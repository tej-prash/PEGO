function Suggest(){
        console.log("suggest called");
		//Maintain a reference to the current object
			var object=this;
			this.timer=null;
			this.search=null;
			this.container=null;
			this.url=null;
			this.xhr=new XMLHttpRequest();
			this.getTerm=function(){
                this.search=document.getElementById("search");
                console.log(this.search);
				this.container=document.getElementById("container");
			//to invoke the send search function only if the user
			//pauses for a second			
				if(this.timer){
					clearTimeout(this.timer);
				}
				this.timer=setTimeout(this.sendTerm,1000);
				
			
			}
			this.sendTerm=function(){
				object.url="/categorysearch/"+object.search.value; //how to give params?????
				//check if the search term is available in cache
				// i.e. Local Storage
				//if(localStorage.getItem(object.url)){
				//	var cacheRes=JSON.parse(localStorage.getItem(object.url))
				//	object.populateFood(cacheRes);
				//	console.log(localStorage.getItem(object.url));
				//	console.log("from browser cache")
				//}
				//else{
				object.xhr.onreadystatechange=object.showResult;
				console.log(object.search.value)
				console.log(this)
				object.xhr.open("GET",object.url,true);
				object.xhr.send();
				//}
			}
			this.showResult=function(){
				if(this.readyState==4 && this.status==200){
					var res=this.response;
					var resO=JSON.parse(res);
					//Store search result in cache
					//localStorage.setItem(object.url,res);
					if(resO.length==0){
					
						object.search.style.backgroundColor="red"
						object.search.style.fontStyle="italics"
					}
					else{
						object.populate(resO);	
					}
				}
			}
			this.populate=function(resO){
				object.container.innerHTML="";
				for(f in resO){
					
					var itemDiv=document.createElement("div");
					itemDiv.innerHTML=resO[f];
					itemDiv.className="item";
					itemDiv.onclick=object.set;
					object.container.appendChild(itemDiv)
					console.log(object.container)
				}
				object.container.style.display="block";
				console.log(object.container)
			
			
			}
			this.set=function(e){
				object.search.value=e.target.innerHTML;
				object.search.style.backgroundColor="white";
				object.container.style.display="none"
				object.container.innerHTML="";
			
			}
		
		
		
}
function start(){		
    obj=new Suggest();	
}
function submit_category(){
    var x = document.getElementById("search");
    window.location.href='/category/displaycatname/'+x.value;
}