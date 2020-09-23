var username = 'ammaaraziz360'
var baseURL = 'https://api.github.com/users/'
var staticUrl = baseURL.concat(username)

var jsonobj 

function changeUsername(){
  username = document.getElementById("username").value;
  staticUrl = baseURL.concat(username)
  console.log(staticUrl)

  $.getJSON(staticUrl, function(data) {
    console.log("It works!")
    console.log(data);
    jsonobj = data

    document.getElementById("fail").classList.remove("far")
    document.getElementById("fail").classList.remove("fa-frown")

    changeName(jsonobj.name)
    changePFP(jsonobj.avatar_url)
    changeDate(jsonobj.created_at, jsonobj.updated_at)
  })
  .fail(function(){
    console.log("It failed")
    document.getElementById("Name").innerHTML = "Error: User not found"
    document.getElementById("pfp").src = ""
    document.getElementById("fail").className = "far fa-frown"
    document.getElementById("created").innerHTML = ""
    document.getElementById("updated").innerHTML = ""
  })
  

}

function changeName(name){
  document.getElementById("Name").innerHTML = name;
}

function changePFP(pfp){
  document.getElementById("pfp").src = pfp
}

function changeDate(created, updated){
  var created_dates = [created.substring(0,4), created.substring(8,10), created.substring(5,7)]
  var updated_dates = [updated.substring(0,4), updated.substring(8,10), updated.substring(5,7)]

  var created_date_obj = new Date(created_dates[0], created_dates[1], created_dates[2])
  var current_date = new Date()

  var age = current_date.getTime() - created_date_obj.getTime()
  var age = Math.round((age / (1000 * 3600 * 24))/365)

  alert(age)

  if(age == 1){
    document.getElementById("age").innerHTML = `Account is ${age} year old`
  }
  else{
    document.getElementById("age").innerHTML = `Account is ${age} years old`
  }

  document.getElementById("created").innerHTML = `Account created on ${created_dates[0]}`
  document.getElementById("updated").innerHTML = `Last updated on ${updated_dates[0]}`
}

