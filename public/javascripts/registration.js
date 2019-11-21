function validateUser(event){
    event.preventDefault();
    console.log("validatePassword called");
    var email=document.getElementById("inputEmail").value;
    var pw=document.getElementById("inputPassword").value;
    var fullname=document.getElementById("fullname").value;
    var username=document.getElementById("username").value;
    var phone=document.getElementById("phone").value;
    var gender=document.getElementById("gender").value
    params={email_id:email,password:pw,fullname:fullname,username:username,phone:phone,gender:gender};
    $(document).ready(function(){
        $.ajax({
            type: "POST",
            url: "/register",
            data: params,
            cache: false,
            statusCode:{
                200:function(){
                    window.location.href="/";
                },
                204:function(){
                    document.getElementById("password_prompt").style.display="block";
                },
                205: function(){
                    document.getElementById("register_prompt").style.display="block";
                }
            }
        })
    });
}