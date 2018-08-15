
const handleRegister = (req,res,db,bcrypt)=>{
	const {email,name,password} = req.body;
	//synchronous version (no error thread free?)
	//check email, name, password are not empty
	if (!email || !name || !password){
		return res.status(400).json('incorrect for submission')
	}
	const hash = bcrypt.hashSync(password);
	//use trx instead of db to refer to transaction
		db.transaction(trx =>{
			trx.insert({
				hash:hash,
				email:email
			})
			.into('login')
			.returning('email')
			.then(loginEmail =>{
				return trx('users')
					.returning('*')
					.insert({
						email:loginEmail[0],
						name:name,
						joined:new Date()
					})
					.then(user =>{
						res.json(user[0]);
					})
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})
		.catch(err=> res.status(400).json("unable to register"))
	//res.json(database.users[database.users.length-1]);
}


module.exports = {
	handleRegister:handleRegister
}