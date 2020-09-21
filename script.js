var username = 'ammaaraziz360'
var baseURL = 'https://api.github.com/users/'
var staticUrl = baseURL.concat(username)

var jsonobj 

function changeUsername(){
  username = document.getElementById("username").value;
  staticUrl = baseURL.concat(username)
  console.log(staticUrl)

  document.getElementById("Name").innerHTML = "Error: User not found"
  document.getElementById("pfp").src = ""
  document.getElementById("fail").className = "far fa-frown"
  document.getElementById("created").innerHTML = ""
  document.getElementById("updated").innerHTML = ""

  $.getJSON(staticUrl, function(data) {
    console.log("This is an example of a static JSON file being served by a web server.")
    console.log(data);
    jsonobj = data
    console.log(jsonobj.message);
  
    document.getElementById("Name").innerHTML = jsonobj.name

    document.getElementById("fail").classList.remove("far")
    document.getElementById("fail").classList.remove("fa-frown")

    document.getElementById("pfp").src = jsonobj.avatar_url
    document.getElementById("created").innerHTML = jsonobj.created_at
    document.getElementById("updated").innerHTML = jsonobj.updated_at
    
      

  });
}



