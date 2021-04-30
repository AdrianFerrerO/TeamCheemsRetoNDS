import {Transaction} from './Transactions';


var father = document.getElementById("transactions-list")


document.addEventListener("load", async function(){
    const url = "/";
    //const csrftoken = getCookie('csrftoken');
    request_response = await fetch(
      url, 
      {method:"POST", 
      mode:"same-origin", 
      //headers:{'X-CSRFToken': csrftoken}, 
      body: JSON.stringify({'transactions': "all"})}
    ).then(async function(response){
      if (response.status === 200){
        return await response.text().then(function(data){
            var transactions = data
            for (let i = 0; i < transactions.length; i++){
                new Transaction(transactions[i]["transaction_id"], transactions[i]["merchant"], transactions[i]["category"], transactions[i]["merchant_location"][0], transactions[i]["merchant_location"][1], transactions[i]["amount"], father)
            }
      });
    }
    });
});


document.addEventListener("load", async function(){
    const url = "/";
    //const csrftoken = getCookie('csrftoken');
    request_response = await fetch(
      url, 
      {method:"POST", 
      mode:"same-origin", 
      //headers:{'X-CSRFToken': csrftoken}, 
      body: JSON.stringify({'user_info': "all"})}
    ).then(async function(response){
      if (response.status === 200){
        return await response.text().then(function(data){
            document.getElementById("user_name").innerHTML = data["user_name"]
            document.getElementById("full_name").innerHTML = data["full_name"]
            document.getElementById("gender").innerHTML = data["gender"]
            document.getElementById("age").innerHTML = data["age"]
            document.getElementById("coordinates").innerHTML = `${data["coordinates"][0]}, ${data["coordinates"][1]}`
        });
    }
});
});


function getCookie(name) {
let cookieValue = null;
if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
    }
}
return cookieValue;
}
  

var user_info = {"user_name":"seb123", "full_name":"Sebas", "gender":"M", "age":18, "coordinates":[1, 2]}
var transactions= [{"transaction_id" : 123, "category": "string", "marchant":"string", "merchant_location":[123, 456], "amount":1234}]
