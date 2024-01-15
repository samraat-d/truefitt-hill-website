(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');
    
    let usernames = []; let passwords = []; var i; var username_split = []; var password_split = [];
    var passwords_raw = sessionStorage.getItem('Passwords');
    var usernames_raw = sessionStorage.getItem('Usernames');
    usernames = usernames_raw.split(",");
    passwords = passwords_raw.split(",");
    var length = usernames.length;
    for(i = 0; i< length; i++){
        username_split = usernames[i].split("\"");
        usernames = usernames.concat(username_split);
        password_split = passwords[i].split("\"");
        passwords = passwords.concat(password_split);
    }
    function removeItemAll(arr) {
        var i = 0;
        while (i < arr.length) {
            if (arr[i] === '' || arr[i] === '[' || arr[i] === ']') {
            arr.splice(i, 1);
            } else {
            ++i;
            }
        }
        return arr;
    }
    removeItemAll(usernames);
    removeItemAll(passwords);

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });
    var attempt = 3;
    function validate(input) {
        var truecheck = 0;
        var username = document.getElementById("email").value;
		var password = document.getElementById("password").value;
        
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else if ( username == "Truefitt123@mail.com" && password == "Hill123"){
            alert ("Login successfully");
            document.getElementById("login").click;
            window.location.replace("http://localhost:8000/google-files/home-manager-page/home-manager.html");
            return false;
        }		
        else{
                for(var x = 2; x<usernames.length; x++){
                    if ( username == usernames[x] && password == passwords[x]){
                        alert ("Login successfully");
                        document.getElementById("login").click;
                        window.location.replace("http://localhost:8000/google-files/home-account-page/home-account.html");
                        truecheck = 0;
                        return false;
                    }
                    else{
                        truecheck = 1;
                    }
                }
                if(truecheck == 1){
                    attempt --;// Decrementing by one.
                        alert("Invalid email or password! You have "+attempt+" attempts left!");
                        document.getElementById("login").click;
                        // Disabling fields after 3 attempts.
                        if(attempt == 0){
                            document.getElementById("email").disabled = true;
                            document.getElementById("password").disabled = true;
                            document.getElementById("login").disabled = true;
                            return false;
                        }
                        if($(input).val().trim() == ''){
                            return false;
                        }
                        return false;
                }
                
        }
        
        
        
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);