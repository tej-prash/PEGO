function submitForm(event){
    // event.preventDefault();
    console.log("submitForm called");
    var product_id=document.getElementById("prod_id").value;
    var total_amount=document.getElementById("total_amount").value;
    console.log(product_id)
    console.log(total_amount)
    params={product_id:product_id,total_amount:total_amount};
    $(document).ready(function(){
        $.ajax({
            type: "POST",
            url: "/orderProduct",
            data: params,
            cache: false,
            statusCode:{
                200:function(){
                    console.log("Order successfull!");
                    window.location.href="http://localhost:3000/web/orderSuccess.html";
                },
                204:function(){
                    console.log("Order not successfull!");
                }
            }
        })
    });
}