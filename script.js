const SteamId = [
[pc = '1', id = '76561198278404154'],
[pc = '2', id = '76561198277027854'],
[pc = '3', id = '76561198276987292'],
[pc = '4', id = '76561198278123690'],
[pc = '5', id = '76561198278005950'],
[pc = '6', id = '76561198278113739'],
[pc = '7', id = '76561198282739730'],
//[pc = '8', id = '76561198187364982'],
[pc = '9', id = '76561198281879257'],
[pc = '10', id = '76561198276954280']
]

function sortByName() {
	$('tbody > tr').sort(function(a, b) {
	return $('td.game_name', a).text().localeCompare($('td.game_name', b).text());
	}).appendTo($('tbody'))
}

function removeDuplicate() {
	var seen = {};
	$('tbody > tr').each(function() {
    var txt = $(this).attr('id');
    if (seen[txt])
        $(this).remove();
    else
        seen[txt] = true;
	});
}

function isDispo(current,pc){
	var pcnb = current.attr('pcnb')
	if(pcnb.includes(pc)){
		return 'dispoPCyes'
	}
	else{
		return 'dispoPCno'
	}
}

function setPC() {
	$('td.pc').each(function(index){

		for (let i = 1; i < 11; i++){
			$(this).append('<img class="pc_img '+isDispo($(this),i)+'" nb='+i+' src="img/computer-icon.png"></img>')
		}
	

	})

}

function getGameImg(game) {
	return "\"https://steamcdn-a.akamaihd.net/steam/apps/"+game.appid+"/header.jpg\""
}

function gamesToTable(gamesList,pc) {
	for (i = 0; i < gamesList.length; i++) {
		var game = gamesList[i]
		var gameImg = getGameImg(game)

		if (Math.round(game.playtime_forever/60) == 0) {
			var timePlayed = game.playtime_forever+" Minutes"
		}
		else {
			var timePlayed = Math.round(game.playtime_forever/60)+" Heures"
		}

		if ($("tr#"+game.appid).length) {
			$("tr#"+game.appid+" td.pc").attr('pcnb', ($("tr#"+game.appid+" td.pc").attr('pcnb'))+","+pc)
		}
		else {
			try {
				var row = "<tr class=\"game_cell\" id=\""+game.appid+"\"><td><img class=\"game_img\" src="+gameImg+"></td><td class=\"game_name\"><a href=\"https://store.steampowered.com/app/"+game.appid+"\" target=\"_blank\" rel=\"noopener noreferrer\">"+game.name+"</a></td><td>"+timePlayed+"</td><td class=\"pc\" pcnb="+pc+"></td></tr>"
			}
			catch{
				var row = "<tr><td>???</td><td></td></tr>"
			}
		}

		$("tbody").append(row)
	}
}

SteamId.forEach(data => {

var url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=C399FAF793D60A94D37BB9DF12877528&steamid="+data[1]+"&include_appinfo=1&include_played_free_games=1&format=json"
var request = new XMLHttpRequest()
request.responseType = 'json'
request.open("GET", url, true)
request.send()

request.onload = function() {
    var JSONResponse = request.response.response.games
    gamesToTable(JSONResponse, data[0])
}
});
setTimeout(() => {  sortByName(); }, 3000);
setTimeout(() => {  removeDuplicate(); }, 3500);
setTimeout(() => {  setPC(); }, 4500);








