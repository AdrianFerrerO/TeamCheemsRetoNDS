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

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));

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
let marchand = "nombre"
let category = "categoria"
let amt = 10.00
let gender = "M"
let lat = 10.00
let long = 10.00
let c_pop = 10.00
let age = 45 //int
let m_lat = 10.00
let m_long = 10.00

let url = `http://localhost:5000/api/predict?merchant=${merchand}&category=${category}&amt=${amt}&gender=${gender}&lat=${lat}&long=${long}&city_pop=${c_pop}&age=${age}&merch_lat=${m_lat}&merchant_long=${m_long}`

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));