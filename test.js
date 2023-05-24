const CORSBYPASS = "https://corsproxy.io/?"
const API = "https://trefle.io/api/v1/"
const TOKEN = "&token=AdLGSUONVOX6ZHdFy153McUCEsEzHIPRnJmBaL1dPxA"
const ENDPOINTS = ["kingdoms/","subkingdoms/","divisions/","division_classes/","division_orders/","families/","genus/","plants/","species/","distributions/"]
submit = document.getElementById("user")
submit.addEventListener("click" , function()
{
  grabber(document.getElementById("input").value)
})


async function grabber(input) {
const response = await fetch(`${CORSBYPASS}${API}${ENDPOINTS[8]}search?q=${input}${TOKEN}`);
  if(response.status != 200)
  console.log(response)
  const data = await response.json();
  console.log(data);
};


