import colors from 'colors'
import server from './server'

const port:string | number = process.env.PORT || 4000

server.listen(port,()=>{
  console.log(colors.bgBlue.yellow.bold('servidor funcionando en el puerto, ') + port)
})