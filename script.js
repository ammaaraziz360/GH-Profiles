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
    cnt += 1 
    //initiate html changes
    changeName(jsonobj.name, username)
    changePFP(jsonobj.avatar_url)
    changeDate(jsonobj.created_at, jsonobj.updated_at)
    changeFollow(jsonobj.followers, jsonobj.following)
    changeSidebar(jsonobj.company, jsonobj.blog, jsonobj.email, jsonobj.hireable)
    initFollow(jsonobj.followers_url)
  })
  //if user is not found
  .fail(function(){
    var items_to_remove = ["created","updated","age","frs","fwg", "un","company", "blog", "location", "email", "hireable"]
    console.log("It failed")
    document.getElementById("Name").innerHTML = "Error: User not found"
    document.getElementById("pfp").classList.remove("responsive")
    document.getElementById("pfp").src = ""
    for(i = 0; i < items_to_remove.length; i++){
      document.getElementById(items_to_remove[i]).innerHTML = ""
    }
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

function changeSidebar(company, blog, location, email, hireable){
  
  var items = [company, blog, location, email, hireable]
  var labels = ["company", "blog", "location", "email", "hireable"]

  var items_v2 = []
  var labels_v2 = []

  for(i = 0; i < labels.length; i++){
    var itemsbool = items[i] == null
    if(itemsbool == false){
      items_v2.push(items[i])
      labels_v2.push(labels[i])
    }
  }
  if(items_v2.length > 1){
    for(i = 0; i < items_v2.length; i++){
      document.getElementById(labels_v2[i]).innerHTML = items_v2[i]
    }
  }

}

function initFollow(url){
  document.getElementById("followers").innerHTML = ""
  $.getJSON(url, function(data) {
    console.log("It works!")
    console.log(data);

    for(i = 0; i < data.length; i++){
      document.getElementById("followers").innerHTML += `<div class="col-lg-2 col-md-4 col-xs-3">
                                                            <div class="card text-white bg-dark" style="width: 15rem;">
                                                              <img class="card-img-top" src=${data[i].avatar_url} alt="Card image cap">
                                                              <div class="card-body">
                                                                <h5 class="card-title">${data[i].login}</h5>
                                                                <a href=${data[i].html_url} class="btn btn-light" target="_blank">Go to user</a>
                                                              </div>
                                                            </div>
                                                          <div>`
    }
  })
}