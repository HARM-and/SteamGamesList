var url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=C399FAF793D60A94D37BB9DF12877528&steamid=76561198276987292&include_appinfo=1&include_played_free_games=1&format=json"
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
		try {
			var row = "<tr class=\"game_cell\" ><td><img class=\"game_img\" src="+gameImg+"></td><td>"+game.name+"</td><td>"+timePlayed+"</td></tr>"
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










