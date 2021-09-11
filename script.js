var username = 'ammaaraziz360'
var baseURL = 'https://api.github.com/users/'
var staticUrl = baseURL.concat(username)
var cnt = 0

var jsonobj 

function changeUsername(){
  username = document.getElementById("username").value;
  staticUrl = baseURL.concat(username)
  console.log(staticUrl)
  document.getElementById("inner-content").innerHTML = `<div class="row">
  <div class="col-3">
      <img id="pfp" class="responsive rounded-circle">
      <i id="fail" class="" style="font-size: xx-large;"></i>
  </div>
  <div class="d-flex col-9 justify-content-start align-items-center">
      <h1 id="Name" style="font-size:5vw">
      </h1>
  </div>
</div>
<div class="row">
  <div class="col-3">
  </div>
  <div class="col-9">
      <h1 id="un" >
  </h1>
  </div>
</div>
<div id="follower">
  <div class="container">
      <div class="row p-3">
          <div class="col-3">
              <h5 id="follow_setup" style="font-weight: bold;">
              </h5>
              <button class="btn btn-light" type="button" onclick="initFollowing()">
                  <h5 id="frs">
                  </h5>
              </button>
          </div>
          <div class="col-3">
              <h5 id="follower_setup" style="font-weight: bold;">
              </h5>
              <button class="btn btn-light" type="button" onclick="initFollower()">
                  <h5 id="fwg">
                  </h5>
              </button>
          </div>
          <div class="col-3 justify-content-end">
          </div>
          <div class="col-3" id="age_set">
              <h5 id="age_setup" style="font-weight: bold;">

              </h5>
              <h5 id="age">
              </h5>
          </div>
      </div>
  </div>
</div>
</div>
<div class="text-center container" id="outer">
<div class="row border">
  <div class="col-md-4 col-xs-12 p-3" id="bodysec">
      <div class="row">
          <div class="col-2 d-flex justify-content-start">
              <i class="fas fa-briefcase" style="font-size: x-large;"></i>
          </div>
          <div class="col-10 d-flex justify-content-start">
              <h5 id="company">
              </h5>
          </div>
      </div>
      <div>
          <div class="row">
              <div class="col-2 d-flex justify-content-start">
                  <i class="fas fa-link" style="font-size: x-large;"></i>
              </div>
              <div class="col-10 d-flex justify-content-start">
                  <h5 id="blog">
                  </h5>
              </div>
          </div>
      </div>
      <div>
          <h5 id="location">
          </h5>
      </div>
      <div>
          <div class="row">
              <div class="col-2 d-flex justify-content-start" style="font-size: x-large;">
                  <i class="fas fa-envelope"></i>
              </div>
              <div class="col-10 d-flex justify-content-start">
                  <h5 id="email">
                  </h5>
              </div>
          </div>
      </div>
      <div>
          <h5 id="hireable">
          </h5>
      </div>
      <div>
          <div class="row">
              <div class="col-2 d-flex justify-content-start">
                  <i class="fas fa-birthday-cake" style="font-size: x-large;"></i>
              </div>
              <div class="col-10 d-flex justify-content-start">
                  <h5 id="created">
                  </h5>
              </div>
          </div>
      </div>
      <div>
          <div class="row">
              <div class="col-2 d-flex justify-content-start">
                  <i class="fas fa-edit" style="font-size: x-large;"></i>
              </div>
              <div class="col-10 d-flex justify-content-start">
                  <h5 id="updated">
                  </h5>
              </div>
          </div>
      </div>
  </div>
</div>
<div class="m-0" id="followers">
</div>
</div>`;
  document.getElementById("followers").innerHTML = ""
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

//used when changing users when not using search bar
function changeUsernameALT(nextUser){
  
  staticUrl = baseURL.concat(nextUser)
  console.log(staticUrl)
  document.getElementById("followers").innerHTML = ""
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
    changeName(jsonobj.name, nextUser)
    changePFP(jsonobj.avatar_url)
    changeDate(jsonobj.created_at, jsonobj.updated_at)
    changeFollow(jsonobj.followers, jsonobj.following)
    changeSidebar(jsonobj.company, jsonobj.blog, jsonobj.email, jsonobj.hireable)
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

  document.getElementById("created").innerHTML = `${created_dates[1]}/${created_dates[2]}/${created_dates[0]}`
  document.getElementById("updated").innerHTML = `${updated_dates[1]}/${updated_dates[2]}/${updated_dates[0]}`
}

function changeFollow(following, followers){
  //update followers and following 
  document.getElementById("follow_setup").innerHTML = "Following"
  document.getElementById("follower_setup").innerHTML = "Followers"


  document.getElementById("frs").innerHTML = followers
  document.getElementById("fwg").innerHTML = following
}

function changeSidebar(company, blog, location, email, hireable){
  //FIXME clear contents of the divs
  var items = [company, blog, location, email, hireable]
  var labels = ["company", "blog", "location", "email", "hireable"]

  var items_v2 = []
  var labels_v2 = []
  for(i = 0; i < labels.length;i++){
    document.getElementById(labels[i]).innerHTML = ""
  }

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

//create BS cards for followers 
function initFollower(){
  var url = jsonobj.followers_url
  document.getElementById("followers").innerHTML = ""
  $.getJSON(url, function(data) {
    console.log("It works!")
    console.log(data);

    for(i = 0; i < data.length; i++){
      document.getElementById("followers").innerHTML += `<div class='row border rounded m-2 p-2 follow_box'>
                                                            <div class='col-5'>
                                                            <img class='responsive_small rounded-circle'src=${data[i].avatar_url} alt="Card image cap" style="width:100px;height:100px;float:left">
                                                            </div>
                                                            <div class='col-7 d-flex align-items-center'>
                                                              <h3 style="color:white;">${data[i].login}</h3>
                                                            </div>
                                                          </div>`
    }
  })
}

//creates BS cards for following 
function initFollowing(){
  var url = jsonobj.following_url
  url = url.substring(0, url.length - 13)
  document.getElementById("followers").innerHTML = ""
  $.getJSON(url, function(data) {
    console.log("It works!")
    console.log(data);

    for(i = 0; i < data.length; i++){
      document.getElementById("followers").innerHTML += `<div class='row border rounded m-2 p-2 follow_box'>
      <div class='col-5'>
      <img class='responsive_small rounded-circle'src=${data[i].avatar_url} alt="Card image cap" style="width:100px;height:100px;float:left">
      </div>
      <div class='col-7 d-flex align-items-center'>
        <h3 style="color:white;">${data[i].login}</h3>
      </div>
    </div>`
    }
  })
}