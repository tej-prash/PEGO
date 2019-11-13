function validateOrder(){

    var product_id=document.getElementById("prod_id").innerHTML;
    console.log(product_id);
    params={product_id:product_id};
    $(document).ready(function(){
        $.ajax({
            type: "POST",
            url: "/validateOrder",
            data: params,
            cache: false,
            statusCode:{
                200:function(){
                    console.log("Order validation sucessfull");
                    window.location.href="/confirmOrder?product_id="+product_id;
                },
                204:function(){
                    event.preventDefault();
                    document.getElementById("submit_id").href="#";
                    document.getElementById("error_prompt").style.display="block";
                }
            }
        })
    });
}