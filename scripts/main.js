var teamContainer = document.getElementById('output');//Output of Teammates
var searchContainer = document.getElementById('search'); //Output of opponent search
var searchButton = document.getElementById('search_button'); //Search button
var generateButton = document.getElementById('generate_button'); //Button to generate teammembers
var input = document.getElementById('input'); //Search opponent input

//Hotslogs API
var url = 'https://api.hotslogs.com/Public/Players/2/';

//Create an array with team mates battle tags
var teammates = ["juwi_2361", "Monki_21189", "danjel_2250", "evaren_2346", "JonahPonken_2304", "bobbrov_2989"];

//On click, make a request to hotslogs api and fetch the information from each of the team members. When the operation is done, parse the data, else display an error in the console.
teammates.forEach(function(teammate){ 
    
    generateButton.addEventListener('click', function() {
        var myRequest = new XMLHttpRequest();

        myRequest.onreadystatechange = function() {
            if (myRequest.readyState === 4) {
                var myData = JSON.parse(myRequest.responseText);
                
                teamHTML(myData);
                
            }else {
                console.log("Error");
            }
        }

        myRequest.open('GET', url + teammate, false); 
        myRequest.send();

    })
});
    
//When searching for an opponent, make a request to hotslogs api and fetch the information from the player.
searchButton.addEventListener('click', function() {
    var searchRequest = new XMLHttpRequest();
    
    //Prevents default, if the value in input is less than 1, do nothing.
    if (input.value.length < 1) {
        return;
    }
    
    //When the operation is done, parse the data, else display an error in the console.
    searchRequest.onreadystatechange = function() {
        if (searchRequest.readyState === 4) {
            var searchData = JSON.parse(searchRequest.responseText);
            
            searchHTML(searchData);

        }else {
            console.log("Error");
        }
    }
    
    searchRequest.open('GET', url + input.value, false); 
    searchRequest.send();
});

//Render the fetched data in html
function searchHTML(newData) {
    //Give the search container class name for styling
    searchContainer.className = "opponent";
    
    //Saves the name data from the search in a variable
    var name = newData.Name;
    //Add the name to the search container
    searchContainer.innerHTML += '<h3>' + name + '</h3>';
    
    //Loop through the player information and add it to the search container
    for (i = 0; i < newData.LeaderboardRankings.length; i++) {
        var player = newData.LeaderboardRankings[i];
        
        searchContainer.innerHTML += 
            '<p>Game Mode: ' + player.GameMode + 
            '<p>Current MMR: ' + player.CurrentMMR +
            '</p>';
    }
};

//Render the fetched data in html
function teamHTML(data) {
    
    //Give the team container a class name for styling
    teamContainer.className = "member";
    //Saves the name data from the search in a variable
    var name = data.Name;
    
    //Add the name to the team container
    teamContainer.innerHTML += '<h3>' + name + '</h3>';
    
    //Loop through the team information and add it to the team container
    for (var i = 0; i < 1; i++) {
        //TeamLeague game mode
        var player = data.LeaderboardRankings[2];       
        
        teamContainer.innerHTML += 
        '<p>Game Mode: ' + player.GameMode + 
        '<p>Current MMR: ' + player.CurrentMMR + 
        '</p>';
    }
};

//Clear the search output when the search input is clicked
input.onclick = function() {
    searchContainer.innerHTML = "";
}