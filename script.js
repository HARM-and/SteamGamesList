var url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=F881D288B906B338F4BD5F0A2A149DD8&steamid=76561198278404154&include_appinfo=1&include_played_free_games=1&format=json"
var request = new XMLHttpRequest()
request.responseType = 'json'
request.open("GET", url, true)
request.send()

function getGameImg(game) {
	// return "\"http://media.steampowered.com/steamcommunity/public/images/apps/"+game.appid+"/"+game.img_icon_url+".jpg\""
	return "\"https://steamcdn-a.akamaihd.net/steam/apps/"+game.appid+"/header.jpg\""
}

function gamesToTable(gamesList) {
	for (i = 0; i < gamesList.length; i++) {
		var game = gamesList[i]
		var gameImg = getGameImg(game)

		if (Math.round(game.playtime_forever/60) == 0) {
			var timePlayed = game.playtime_forever+" Minutes"
		}
		else {
			var timePlayed = Math.round(game.playtime_forever/60)+" Heures"
		}
		
		console.log(game)
		try {
			var row = "<tr><td><img src="+gameImg+"></td><td>"+timePlayed+"</td></tr>"
		}
		catch{
			var row = "<tr><td>???</td><td></td></tr>"
		}
		$("tbody").append(row)
	}
}

request.onload = function() {
    var JSONResponse = request.response.response.games
    gamesToTable(JSONResponse)

}










