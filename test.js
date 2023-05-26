/*
data is handled
get the Event handlers settled
tab event handler set the endpoint
input bar handles queries
checkboxes handles filters
sort nav handles sorting

filter and order later
distributions later

get the requests formatting settled
Get the proper divs layed out



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

title size
button sizing
hide unusable feater
fix image load sizing
paging button loactions


*/

const CORSBYPASS = "https://corsproxy.io/?"
const API = "https://trefle.io/api/v1/"
const BASE = "https://trefle.io"
const TOKEN = "token=AdLGSUONVOX6ZHdFy153McUCEsEzHIPRnJmBaL1dPxA"
const ENDPOINTS = ["kingdoms","subkingdoms","divisions","division_classes","division_orders","families","genus","plants","species","distributions"]
var sittingAt = ENDPOINTS[8]
document.getElementById("title").appendChild(document.getElementById("search"))
submit = document.getElementById("user")
submit.addEventListener("click" , function()
{
  document.getElementById("main").removeChild(document.getElementById("main").firstChild.nextSibling.nextSibling.nextSibling)
  if(document.getElementById("input").value == "")
  {
    grabber(`${CORSBYPASS}${API}${sittingAt}?${TOKEN}`)
  }
  else if(sittingAt == "distributions")
  {
    start(document.getElementById("input").value)
    
  }
  else
  {
  grabber(`${CORSBYPASS}${API}${sittingAt}/search?q=${document.getElementById("input").value}&${TOKEN}`)
  }
})
document.getElementById("search").appendChild(submit)
document.getElementById("search").appendChild(document.getElementById("input"))

for(i = 0; i < ENDPOINTS.length; i++)
{
 containerize(ENDPOINTS[i])
}
console.log(document.getElementsByClassName("container"))

function containerize(endpoint)
{
  current = document.createElement("button")
current.id = endpoint
current.innerText = endpoint
current.className = "tablink"
current.style.margin = "1%"
current.addEventListener("click", function(e)
{
  sittingAt = e.target.id
})
document.getElementById("title").appendChild(current)
}

function paginator(data){

undo(pages)
  for(key in data.links)
{
  if(key !== "self")
  {
  btn = document.createElement("button")
  btn.innerText = key
  btn.value = data.links[key]
  btn.style.BackgroundColor = "paleGreen"
  btn.addEventListener("click", function(e)
  {
    grabber(`${CORSBYPASS}${BASE}${e.target.value}&${TOKEN}`)
  })
  console.log(key, data.links[key])
  btn.style.marginLeft = "10%"
  btn.style.marginRight = "10%"
  document.getElementById("pages").appendChild(btn)
  }
}

}

async function grabber(input) {

const response = await fetch(`${input}`);
  const data = await response.json();
  //clear(document.getElementById("view"))
  paginator(data)
  fieldifier(data)
  displayer(data)
  

};

///api/v1/distributions?page=1
async function dns(input, DIST)
{
  console.log(input)
  console.log(DIST)
  for(i = 0; i < DIST.data.length; i++)
  { 
  if((DIST.data[i].name.toUpperCase() === input.toUpperCase()))
  { 
    

    console.log(DIST.data[i].tdwg_code,input.toUpperCase,DIST.data[i].name.toUpperCase)
    return DIST.data[i].tdwg_code
  }
}
  if(DIST.links.next != undefined)
  {
    console.log(DIST.links.next)
    var input = await start(input, DIST.links.next)
    console.log(input.json.data.links.next)
     return await input.json.data.links.next
  }
  else{
    grabber(`${CORSBYPASS}${API}${sittingAt}?${TOKEN}`)
  }
  }

async function start(input, bypass)
{
  console.log(input, bypass)
  if(bypass != undefined)
  {
    var response = await fetch(`${CORSBYPASS}${BASE}${bypass}&${TOKEN}`)
  }
  else
  {
    var response = await fetch(`${CORSBYPASS}${API}distributions?${TOKEN}`);
  }
  if(response.status != 200)
  console.log(response)
  var data = await response.json();
  console.log(data);
  var test = await dns(input, data)
  console.log(`${CORSBYPASS}${API}${sittingAt}/${test}/species?${TOKEN}`)
  grabber(`${CORSBYPASS}${API}${sittingAt}/${test}/species?${TOKEN}`)
}

function fieldifier(data)
{ 
  if(document.getElementById("navigation")== null)
  {
    reset = document.createElement("nav")
    reset.hidden = "True"
    reset.id = "navigation"
    document.getElementById("main").appendChild(reset)
  }
  undo(document.getElementById("navigation"))
  console.log("hello")
  var count = {}
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
      document.getElementById("navigation").appendChild(btn)
    }
    
  }
}1
}
console.log(count)
}


function undo(parent)
{
  console.log(parent)
if(parent != null)
{
while(parent.lastChild)
{
  parent.removeChild(parent.lastChild)
}
}
}
function displayer(data)
{ 
  undo(document.getElementById("view"))
  console.log("hello")
  for(i = 0; i < data.data.length; i++)
  { card = document.createElement("div")
    card.style.width = "45%"
    card.style.borderStyle = "groove"
    card.style.borderWidth = "5px"
    card.style.borderColor = "ForestGreen"
    
    pic = document.createElement("div")
    pic.style.width = "45%"
    pic.style.borderStyle = "groove"
    pic.style.borderWidth = "5px"
    pic.style.borderColor = "ForestGreen"
  for(key in data.data[i])
{ 
  if((key !== "synonyms")&&(key !== "id")&&(key !== "links"))
  {
    if(key=="image_url")
    {
      image = document.createElement("img")
      image.src = data.data[i][key]
      image.id = [key]
      image.style.height = "450px"
      image.style.width = "auto"
      pic.appendChild(image)
      
    }
    else
    {
      text = document.createElement("p")
      text.innerText = data.data[i][key]
      text.id = [key]
      text.style.fontFamily = "cursive"
      card.appendChild(text)
    }
    
    
  }
  document.getElementById("view").appendChild(card)
  document.getElementById("view").appendChild(pic)


}
}

console.log(document.getElementById("view"))
}