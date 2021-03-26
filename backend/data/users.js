import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Pasindu Premachandra',
		email: 'pasindu@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Thisal Vindula',
		email: 'thisal@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
]

export default users
