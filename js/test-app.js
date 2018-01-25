$(function(){
    $('.modal').modal();
    $('.tooltipped').tooltip({delay: 50});
  // $('#frontend').onclick($('#frontend')toggle(),);
   // $('.parallax').parallax();
   let send = document.getElementById('send-btn');

   send.onclick = sendMessage;

   function sendMessage(event) {

     let xhttp = new XMLHttpRequest();
     let form = document.getElementById('regForm');

     let msg = 'contact=' + $('#contact').value + '&msgtxt=' + $('#msgtxt').value;

     xhttp.open("POST", "send.php", true);
     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xhttp.send(msg);
     xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               console.log('signup successful');
               Materialize.toast('Заявка отправлена!', 4000);
          } else {
            console.log(this.status);
          }
       };
   }
});
