
(function ($) {
    "use strict";
    // https://dashboard.emailjs.com/admin/account
    emailjs.init('R5OFHTETc92d3TNUX');
    
    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="user_name"]');
    var email = $('.validate-input input[name="user_email"]');
    var contact = $('.validate-input input[name="contact_number"]');
    var message = $('.validate-input textarea[name="message"]');
    var check = true;

    $('.validate-form').on('submit',function(){

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }
        else{
            check = true;
        }

        if($(contact).val().trim() == '' || $(contact).val().length != 10){
            showValidate(contact);
            check=false;
        }
        else{
            check = true;
        }

        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }
        else{
            check = true;
        }

        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }
        else{
            check = true;
        }

        console.log(check);
        
        return check;
    });


    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    window.onload = function() {
        document.getElementById('contact-form').addEventListener('submit', function(event) {
            console.log("working");
            event.preventDefault();
            if(check == true){
                emailjs.sendForm('contact_service', 'contact_form', this)
                .then(function() {
                    console.log('SUCCESS!');
                    window.location.href = "http://localhost:8000/google-files/contact-page/contact-result.html";
                }, function(error) {
                    console.log('FAILED...', error);
                });
            }
        });
    }
})(jQuery);