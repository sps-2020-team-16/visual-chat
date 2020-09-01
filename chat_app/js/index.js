$(function() {

   $(".input input").focus(function() {

      $(this).parent(".input").each(function() {
         $("label", this).css({
            "line-height": "18px",
            "font-size": "18px",
            "font-weight": "100",
            "top": "0px"
         })
         $(".spin", this).css({
            "width": "100%"
         })
      });
   }).blur(function() {
      $(".spin").css({
         "width": "0px"
      })
      if ($(this).val() == "") {
         $(this).parent(".input").each(function() {
            $("label", this).css({
               "line-height": "60px",
               "font-size": "24px",
               "font-weight": "300",
               "top": "10px"
            })
         });

      }
   });

   $(".button").click(function(e) {
      var pX = e.pageX,
         pY = e.pageY,
         oX = parseInt($(this).offset().left),
         oY = parseInt($(this).offset().top);

      $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
      $('.x-' + oX + '.y-' + oY + '').animate({
         "width": "500px",
         "height": "500px",
         "top": "-250px",
         "left": "-250px",

      }, 600);
      $("button", this).addClass('active');
   })

   $(".alt-2").click(function() {
      if (!$(this).hasClass('material-button')) {
         $(".shape").css({
            "width": "100%",
            "height": "100%",
            "transform": "rotate(0deg)"
         })

         setTimeout(function() {
            $(".overbox").css({
               "overflow": "initial"
            })
         }, 600)

         $(this).animate({
            "width": "140px",
            "height": "140px"
         }, 500, function() {
            $(".box").removeClass("back");

            $(this).removeClass('active')
         });

         $(".overbox .title").fadeOut(300);
         $(".overbox .input").fadeOut(300);
         $(".overbox .button").fadeOut(300);

         $(".alt-2").addClass('material-buton');
      }

   })

   $(".material-button").click(function() {

      if ($(this).hasClass('material-button')) {
         setTimeout(function() {
            $(".overbox").css({
               "overflow": "hidden"
            })
            $(".box").addClass("back");
         }, 200)
         $(this).addClass('active').animate({
            "width": "700px",
            "height": "700px"
         });

         setTimeout(function() {
            $(".shape").css({
               "width": "50%",
               "height": "50%",
               "transform": "rotate(45deg)"
            })

            $(".overbox .title").fadeIn(300);
            $(".overbox .input").fadeIn(300);
            $(".overbox .button").fadeIn(300);
         }, 700)

         $(this).removeClass('material-button');

      }

      if ($(".alt-2").hasClass('material-buton')) {
         $(".alt-2").removeClass('material-buton');
         $(".alt-2").addClass('material-button');
      }

   });

});

function signIn() {
   // TODO: a real sign in procedure
   // Currently just alert the selected avatar name and jump to chat room

    argName = String( window.document.getElementById('name').value )
    argPass = String( window.document.getElementById('pass').value )
    argAvatar = String( window.document.getElementById('avatar-select').value )

    if( argName.length <= 0 || argPass.length <= 0 ){
        alert('empty username or password')
        window.location.href = "/index.html"
        return 
    }

    fetch(
        '/api/login', 
        { 
            method: 'POST', 
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ 
                "username": argName, 
                "password": argPass,
                "avatar": argAvatar
            }) 
        }
        ).then( res => res.json() ).then( ( rJson ) => {
            setTimeout(
                ()=>{
                    if( rJson['status'] == 0 ){
                        window.location.href = "/chat_room.html";
                    }else{
                        alert( String( rJson[ 'message' ] ) )
                        window.location.href = "/index.html";
                    }
                }, 399
            )
        } )

//    alert(document.getElementById('avatar-select').value);
//    window.location.href = "./chat_room.html";
}

function signUp() {
   // TODO: a real sign up procedure
   // Currently just jump to chat room

    argRegname      = String( window.document.getElementById('regname').value )
    argRegpass      = String( window.document.getElementById('regpass').value )
    argReregpass    = String( window.document.getElementById('reregpass').value )

    if( argRegname.length <= 0 || argRegpass.length <= 0 || argReregpass <= 0 ){
        alert('empty username or password')
        window.location.href = "/index.html"
        return 
    }
    if( argRegpass != argReregpass ){
        alert('2 passwords are different')
        return 
    }

    fetch(
        '/api/register', 
        { 
            method: 'POST', 
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ 
                "username": argRegname, 
                "password": argRegpass
            }) 
        }
        ).then( res => res.json() ).then( ( rJson ) => {

            if( rJson['status'] == 0 ){
                window.location.href = "/index.html";
            }else{
                alert( String( rJson[ 'message' ] ) )
            }

        } )


//    window.location.href = "./chat_room.html";
}
