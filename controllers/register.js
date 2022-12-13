 
 const handleRegister = (db, bcrypt) => (req, res) => {
    const { name, email, password }= req.body;
    if(!name || !email || !password) {
    	return res.status(400).json('Invalid Form Submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
    	trx.insert({
	      email: email,
    	  hash: hash
    	})
    	.into('login')
    	.returning('email')
    	.then( loginEmail => {
        return trx('users')
	      .returning('*')
		    .insert({
			   	email: loginEmail[0].email,
			   	name: name,
			   	joined: new Date()
		    }).then(user => {
		        res.json(user[0]);
		      })
    	})
    	.then(trx.commit)
    	.catch(trx.rollback)
    })
	  .catch(err => res.status(400).json('unable to register user'))
}

module.exports = {
	handleRegister: handleRegister
};