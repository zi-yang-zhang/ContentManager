module.exports = function(db){

	return{
		login : function(req,res){
			console.log("loggedin");
			res.json({ loggedin: true});
		}




	}

}