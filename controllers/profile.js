
const handleProfile = (db) => (req, res) => {
	const { id } = req.params;
	db.select ('*').from ('users').where({id })
	   .then( user => {
	   	if (user.length) {
            res.status(200).json(user[0])
	   	} else {
           res.status(400).json('Not Found')
	   	}
      })
		.catch(err => res.status(400).json(err))
}

module.exports={
	handleProfile: handleProfile
};