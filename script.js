var username = 'ammaaraziz360'
var baseURL = 'https://api.github.com/users/'
var staticUrl = baseURL.concat(username)
var cnt = 0

var jsonobj 

function changeUsername(){
  username = document.getElementById("username").value;
  staticUrl = baseURL.concat(username)
  console.log(staticUrl)

  //get request for staticUrl
  $.getJSON(staticUrl, function(data) {
    console.log("It works!")
    console.log(data);
    jsonobj = data

    document.getElementById("fail").classList.remove("far", "fa-frown")
    if(cnt == 0){
      document.getElementById("start").remove()
    }
    //initiate html changes
    changeName(jsonobj.name, username)
    changePFP(jsonobj.avatar_url)
    changeDate(jsonobj.created_at, jsonobj.updated_at)
    changeFollow(jsonobj.followers, jsonobj.following)
    cnt += 1 
  })
  //if user is not found
  .fail(function(){
    console.log("It failed")
    document.getElementById("Name").innerHTML = "Error: User not found"
    document.getElementById("pfp").src = ""

    document.getElementById("pfp").classList.remove("responsive")

    document.getElementById("fail").className = "far fa-frown"
    document.getElementById("created").innerHTML = ""
    document.getElementById("updated").innerHTML = ""
    document.getElementById("age").innerHTML = ""
    document.getElementById("frs").innerHTML = ""
    document.getElementById("fwg").innerHTML = ""
  })
  

}

function changeName(name, un){
  //changes the name
  if(name == null){
    document.getElementById("Name").innerHTML = "No name found"
  }
  else{
    document.getElementById("Name").innerHTML = name;
  }
  document.getElementById("un").innerHTML = `@${un}`
}

function changePFP(pfp){
  document.getElementById("pfp").classList.add("responsive")
  //changes the profile pic
  document.getElementById("pfp").src = pfp
}

function changeDate(created, updated){
  //yyyy-mm-dd
  //parses the date into a array
  var created_dates = [created.substring(0,4), created.substring(5,7),  created.substring(8,10)]
  var updated_dates = [updated.substring(0,4), updated.substring(5,7), updated.substring(8,10)]

  created_dates[2] = parseInt(created_dates[2])

  //creates a date object for the created_dates and current date variable
  var date = created_dates[0] +"-"+ created_dates[1] +"-"+ created_dates[2]
  var created_date_obj = new Date(date)
  var current_date = new Date()

  //does math to find age of account
  var age = current_date.getTime() - created_date_obj.getTime()
  var age = Math.round((age / (1000 * 3600 * 24))/365)

  //changes the html
  document.getElementById("age_setup").innerHTML = "Account Age"

  if(age == 1){
    document.getElementById("age").innerHTML = `${age} years`
  }
  else{
    document.getElementById("age").innerHTML = `${age} years`
  }

  document.getElementById("created").innerHTML = `Account created on ${created_dates[0]}`
  document.getElementById("updated").innerHTML = `Last updated on ${updated_dates[0]}`
}

function changeFollow(following, followers){
  //update followers and following 
  document.getElementById("follow_setup").innerHTML = "Following"
  document.getElementById("follower_setup").innerHTML = "Followers"


  document.getElementById("frs").innerHTML = followers
  document.getElementById("fwg").innerHTML = following
}
