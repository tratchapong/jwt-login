const {sequelize} = require('./models')

sequelize.sync({force: true}).then(()=>{
  console.log('Sync OK')
  process.exit(0)
}).catch((err)=>{
  console.log('ERROR : \n' + err)
  process.exit(1)
})
