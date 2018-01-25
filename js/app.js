
$(document).ready(function(){
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered

      let send = document.getElementById('send-form');

      send.onclick = sendMessage;

      function sendMessage(event) {

        let xhttp = new XMLHttpRequest();
        let form = document.getElementById('regForm');

        let msg = 'name=' + form[0].value + '&contact=' + form[1].value + '&date=' + form[2].value;

        xhttp.open("POST", "send.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(msg);
        xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                  console.log('signup successful');
                  Materialize.toast('Заявка отправлена!', 4000);
             }
          };
      }
  });
