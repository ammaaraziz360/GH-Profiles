var username = 'ammaaraziz360'
var baseURL = 'https://api.github.com/users/'
var staticUrl = baseURL.concat(username)

var jsonobj 

function changeUsername(){
  username = document.getElementById("username").value;
  staticUrl = baseURL.concat(username)
  console.log(staticUrl)
  $.getJSON(staticUrl, function(data) {
    console.log("This is an example of a static JSON file being served by a web server.")
    console.log(data);
    jsonobj = data
    document.getElementById("Name").innerHTML = jsonobj.name
    document.getElementById("pfp").src = jsonobj.avatar_url
    document.getElementById("created").innerHTML = jsonobj.created_at
    document.getElementById("updated").innerHTML = jsonobj.updated_at

  });
}



