

 handleProfileGet = (req,res,db)=>{
	const {id} = req.params;
	db.select('*').from('users').where({
		id:id
	}).then(user =>{
		if(user.length){
			res.json(user[0]);
		}
		else{
			res.status(400).json('not found')
		}
	})
	.catch(err => res.status(400).json('err getting user.'))
	//not return err if that id isn't in db check length instead
}

module.exports ={
	handleProfileGet : handleProfileGet
}