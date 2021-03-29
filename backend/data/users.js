import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('111111', 10),
    isAdmin: true,
  },
  {
    name: 'thisal',
    email: 'thisal@gmail.com',
    password: bcrypt.hashSync('111111', 10),
  },
  {
    name: 'pasindu',
    email: 'pasindu@gmail.com',
    password: bcrypt.hashSync('111111', 10),
  },
]
export default users
