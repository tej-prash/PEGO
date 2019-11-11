function validatePassword(event){
    event.preventDefault();
    console.log("validatePassword called");
    var email=document.getElementById("inputEmail").value;
    var pw=document.getElementById("inputPassword").value;
    params={email_id:email,password:pw};
    $(document).ready(function(){
        $.ajax({
            type: "POST",
            url: "/login",
            data: params,
            cache: false,
            statusCode:{
                200:function(){
                    window.location.href="/";
                },
                204:function(){
                    document.getElementById("password_prompt").style.display="block";
                }
            }
        })
    });
}