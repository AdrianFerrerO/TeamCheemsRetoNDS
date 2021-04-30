var Transaction = function (transaction_id, merchant, category, merchant_lat, merchant_long, father, button=false){
    this.transaction_id = transaction_id;
    this.merchant = merchant;
    this.category = category;
    this.merchant_lat = merchant_lat;
    this.merchant_long = merchant_long;
    this.amt = round(Math.random()*500, 2);
    this.father = father;
    this.button = button
    this.trans_container = this.createTransaction()
    father.appendChild(this.trans_container);
}

Transaction.prototype.createTransaction = function(){
    var list_element = document.createElement("li");
    var list_element_content = document.createElement("div");
    var category = document.createElement("p");
    var merchant = document.createElement("p");
    var merchant_location = document.createElement("p");
    var amount = document.createElement("p");
    list_element.style.backgroundColor = "white"
    category.setAttribute("class", "d-flex w-100 m-0");
    merchant.setAttribute("class", "d-flex w-100 m-0");
    merchant_location.setAttribute("class", "d-flex w-100 m-0");
    amount.setAttribute("class", "d-flex w-100 justify-content-end m-0");
    list_element_content.setAttribute("class", "d-flex w-100 flex-wrap p-3 list-element");
    list_element.setAttribute("class", "row m-4")  
    category.innerHTML = this.category;
    merchant.innerHTML = this.merchant;
    merchant_location.innerHTML = `${this.merchant_lat}, ${this.merchant_long}`;
    amount.innerHTML = `$${this.amt}`;
    list_element_content.appendChild(category);
    list_element_content.appendChild(merchant);
    list_element_content.appendChild(merchant_location);
    list_element_content.appendChild(amount);
    if (this.button === true){
        var div_button = document.createElement("div")
        var button = document.createElement("button")
        button.setAttribute("class", "btn btn-outline-primary")
        button.innerHTML = "Realizar Transacción"

        button.addEventListener("click", function(){
            let father_buy = document.getElementById("which-transaction")
            var div = this.parentNode.parentNode.cloneNode(true)
            div.removeChild(div.childNodes[4])
            if (father_buy.childElementCount > 0){
                father_buy.removeChild(father_buy.childNodes[1])
                father_buy.appendChild(div)
            }else{
                father_buy.appendChild(div)
            }
        })

        div_button.setAttribute("class", "d-flex w-100 justify-content-end m-0")
        div_button.appendChild(button)
        list_element_content.appendChild(div_button)
    }
    list_element.appendChild(list_element_content);  
    list_element.setAttribute("id", this.transaction_id); 
    return list_element;
}


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

/* 

endpoint: http://localhost:5000/api/users/<username>


Retorna:
{
    "data": {
    "username": "first_last",
    "fullname": "Aldo Sandoval",
    "gender": "M",
    "age": 18,
    "coordinates": [20.1154, -99.01154],
    "ip": "127.0.0.1",
    "transactions": [{
        "transaction_id": 123, 
        "category": "string", 
        "marchant":"string", 
        "merchant_location":[12.47546, 45.5466], 
        "amount":1234
    },
    {
        "transaction_id": 124, 
        "category": "string", 
        "marchant":"string", 
        "merchant_location":[12.47546, 45.5466], 
        "amount":1234
    }]
}
}

*/