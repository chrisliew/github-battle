//contain API request make in our App
import axios from 'axios';

//for getting rate limited, add keys
var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var params = "?client_id=" + id + "&client_secret=" + sec;

//gets profile from github API after resolves returns the user data
function getProfile(username) {
  //axios makes get request through that URL,
  return axios.get('https://api.github.com/users/' + username + params)
  //then call this function, due to async.  
    .then(function (user) {
      return user.data;
    });
}

function getRepos(username) {
  //will get us 100 of the user's repositories
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}


function getStarCounts(repos) {
  return repos.data.reduce(((count,repo)=> count + repo.stargazers_count), 0);
}


function calculateScore (profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCounts(repos);

  return (followers * 3) + totalStars;
}

function handleError (error) {
  console.warn(error);
  return null;
}

//composes other functions
function getUserData (player) {
  //takes in array of promises, after promises have been resolved, will call below. 
  return axios.all([
    //due to async nature, after getProfile and getRepos complete, then do the function below
    getProfile(player),
    getRepos(player)
  ]).then(function (data) {
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}



function sortPlayers (players) {
  return players.sort(function(a,b) {
    return b.score - a.score;
  })
}

module.exports = {
 
  //When battle called, want it to return promise when resolved will have all of the players information (that is what the map is, mapping over players returning new array which gives us what getUserData)
  battle: function (players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },

   //ping API, get back most popular repos for that language.  See https://developer.github.com/v3/search/#search-repositories

  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories')
    
  return axios.get(encodedURI)
    .then(function (response){
      return response.data.items;
    });
  }
}