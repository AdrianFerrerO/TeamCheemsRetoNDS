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
                new Transaction(transactions[i]["transaction_id"], transactions[i]["merchant"], transactions[i]["category"], transactions[i]["merchant_location"][0], transactions[i]["merchant_location"][1], transactions[i]["amount"], father, true)
            }
      });
    }
    });
});

function round(num, decimalPlaces = 0) {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
}
var categories = ['personal_care', 'health_fitness', 'misc_pos', 'travel',
'kids_pets', 'shopping_pos', 'food_dining', 'home',
'entertainment', 'shopping_net', 'misc_net', 'grocery_pos',
'gas_transport', 'grocery_net']

var merchants = ['fraud_Kirlin and Sons', 'fraud_Sporer-Keebler',        'fraud_Swaniawski, Nitzsche and Welch', 'fraud_Haley Group',        'fraud_Johnston-Casper', 'fraud_Daugherty LLC',        'fraud_Romaguera Ltd', 'fraud_Reichel LLC',        'fraud_Goyette, Howell and Collier', 'fraud_Kilback Group',        'fraud_Feil, Hilpert and Koss', 'fraud_Gottlieb Group',        'fraud_Connelly-Carter', 'fraud_Bechtelar-Rippin',        'fraud_Lubowitz-Walter', 'fraud_Welch, Rath and Koepp',        'fraud_Hickle Group', 'fraud_Lang, Towne and Schuppe',        'fraud_Morissette LLC', 'fraud_Prosacco LLC',        'fraud_Corwin-Romaguera', 'fraud_Tillman LLC',        'fraud_Veum-Koelpin', 'fraud_Watsica, Haag and Considine',        'fraud_Leannon-Ward', 'fraud_Hintz, Bauch and Smith',        'fraud_Labadie LLC', 'fraud_Eichmann, Hayes and Treutel',        'fraud_Leffler-Goldner', 'fraud_Kautzer and Sons',        'fraud_Ernser-Feest', 'fraud_Zemlak, Tillman and Cremin',        'fraud_Nienow PLC', 'fraud_Lynch-Wisozk', 'fraud_Schiller Ltd',        'fraud_Hoppe-Parisian', 'fraud_Brown-Greenholt',        'fraud_Reilly LLC', 'fraud_Moore, Williamson and Emmerich',        'fraud_Rau-Robel', 'fraud_Fadel, Mertz and Rippin',        'fraud_Crona and Sons', 'fraud_Bahringer, Bergnaum and Quitzon',        'fraud_Koss, Hansen and Lueilwitz',        'fraud_Yost, Schamberger and Windler',        'fraud_Armstrong, Walter and Gottlieb', 'fraud_Friesen Ltd',        'fraud_Champlin and Sons', 'fraud_Bins-Tillman',        'fraud_Douglas-White', 'fraud_Hermiston, Pacocha and Smith',        'fraud_Denesik, Powlowski and Pouros', 'fraud_Nader-Maggio',        "fraud_O'Reilly, Mohr and Purdy", "fraud_O'Connell-Ullrich",        'fraud_Bauch-Blanda', 'fraud_Ruecker, Beer and Collier',        'fraud_Berge-Hills', 'fraud_White and Sons', 'fraud_Adams-Barrows',        'fraud_Pouros-Haag', 'fraud_Hahn, Bahringer and McLaughlin',        'fraud_Ziemann-Waters', 'fraud_Wuckert, Wintheiser and Friesen',        'fraud_Bednar PLC', 'fraud_Kihn Inc', 'fraud_Fisher Inc',        'fraud_Schneider, Hayes and Nikolaus',        "fraud_Greenholt, O'Hara and Balistreri", 'fraud_Gottlieb-Hansen',        'fraud_Douglas, Schneider and Turner',        'fraud_Gutmann, McLaughlin and Wiza', 'fraud_Weber and Sons',        'fraud_Bartoletti and Sons', 'fraud_Powlowski-Weimann',        'fraud_Lakin, Ferry and Beatty', 'fraud_Terry, Johns and Bins',        'fraud_Thiel-Thiel']

var transactions = [{"transaction_id" : 87281462984619, "category": "room", "merchant":"string", "merchant_location":[123, 456], "amount":1234}]

for (let i = 0; i < categories.length; i++){
    for (let k = 0; k < merchants.length; i++){
        new Transaction(transactions[i]["transaction_id"], merchants[k], categories[i], transactions[i]["merchant_location"][0], transactions[i]["merchant_location"][1], transactions[i]["amount"], father, true)
    }
}

/* 

endpoint: http://localhost:5000/api/products/<int:numero de productos deseados>


Retorna:
{
    "data": [
        {
            "category": "kids_pets",
            "merchant": "fraud_Breitenberg-Hermiston",
            "merchant_location": "(39.021091999999996, -80.859796)"
        },
        {
            "category": "entertainment",
            "merchant": "fraud_Effertz LLC",
            "merchant_location": "(41.280045, -110.62702)"
        },
        {
            "category": "travel",
            "merchant": "fraud_Thiel Ltd",
            "merchant_location": "(26.524542999999998, -79.677747)"
        }
    ]
}
*/

let len_of_sample = 10

let url = `http://localhost:5000/api/products/${len_of_sample}`


/* 
endpoint modelo: http://localhost:5000/api/predict?
    merchant=str
    &category=str
    &amt=float
    &gender=string
    &lat=float
    &long=float
    &city_pop=float
    &age=int
    &merch_lat=float
    &merchant_long=float

retorna:
{
    "fraud": "True" or "False"
}
*/
let merchant = "nombre"
let category = "categoria"
let amt = 10.00
let gender = "M"
let lat = 10.00
let long = 10.00
let c_pop = 10.00
let age = 45 //int
let m_lat = 10.00
let m_long = 10.00

var url2 = `http://localhost:5000/api/predict?merchant=${merchant}&category=${category}&amt=${amt}&gender=${gender}&lat=${lat}&long=${long}&city_pop=${c_pop}&age=${age}&merch_lat=${m_lat}&merchant_long=${m_long}`



//fetch(url2)
//  .then(response => response.json())
//  .then(data => console.log(data));

