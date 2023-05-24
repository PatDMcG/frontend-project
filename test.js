/*
Kingdom
  -> Subkingdom
    -> Division
      -> Division class
        -> Division order
          -> Family
            -> Genus
              -> Plant
                -> Species

Kingdom -> Plantae – (Plants)
Subkingdom -> Tracheobionta – (Vascular plants)
Division -> Coniferophyta – (Conifers)
Class -> Pinopsida
Order -> Pinales
Family -> Pinaceae – (Pine family)
Genus -> Abies
Plant -> Abies balsamea common
Species -> Abies balsamea all varieties

refer links "links": {
        "first": "/api/v1/species?page=1",
        "last": "/api/v1/species?page=20865",
        "next": "/api/v1/species?page=3",
        "prev": "/api/v1/species?page=1",
        "self": "/api/v1/species?page=2"
next page functionality add listners
back page functionality

filter list
sort list chainable null value exclusion button
q= search

plant display


*/

const CORSBYPASS = "https://corsproxy.io/?"
const API = "https://trefle.io/api/v1/"
const TOKEN = "token=AdLGSUONVOX6ZHdFy153McUCEsEzHIPRnJmBaL1dPxA"
const ENDPOINTS = ["kingdoms","subkingdoms","divisions","division_classes","division_orders","families","genus","plants","species","distributions"]
submit = document.getElementById("user")
submit.addEventListener("click" , function()
{
  grabber(document.getElementById("input").value)
})

for(i = 0; i < ENDPOINTS.length; i++)
{
 containerize(ENDPOINTS[i])
}
console.log(document.getElementsByClassName("container"))

function containerize(endpoint)
{
  current = document.createElement("div")
current.id = endpoint
current.className = "container"
document.getElementById("view").appendChild(current)
}

function paginator(data){
  for(key in data.links)
{
  if(key !== "self")
  {
  btn = document.createElement("button")
  btn.innerText = key
  btn.value = data.links[key]
  console.log(key, data.links[key])
  document.getElementById("view").appendChild(btn)
  }
}

}

async function grabber(input) {
  input ="?"
const response = await fetch(`${CORSBYPASS}${API}${ENDPOINTS[8]}${input}${TOKEN}`);
  if(response.status != 200)
  console.log(response)
  const data = await response.json();
  console.log(data);
  paginator(data)
  fieldifier(data)

};


function fieldifier(data)
{ var count = {}
  for(i = 0; i < data.data.length; i++)
  {
  for(key in data.data[i])
{ 
  if((key !== "synonyms")&&(key !== "id")&&(key !== "links"))
  {
    if(count[key] != null)
    {
      count[key]++

    }
    else
    {
      count[key] = 1
      btn = document.createElement("button")
      btn.innerText = key
      btn.id = key
      document.getElementById("view").appendChild(btn)
    }
    
  }
}
}
console.log(count)
}

