const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDb =  () => {
  mongoose.connect(db, { useNewUrlParser: true }).then(() =>console.log('MongoDB connete')).catch((err) =>console.log(err));
  // try {
  //   console.log('MonogoDb is going to ..');
  //   console.log(db);
  //   mongoose.connect(db, { useNewUrlParser: true }).then(() =>console.log('MongoDB connete')).catch((err) =>console.log(err));
  //   // .then(()=> console.log('MongoDB Connected'))

  // //.catch((err)=> console.log(err));
  //   // console.log('Mongodb connected');
  // } catch (err) {
  //   console.error(err.message);
  //   process.exit(1);
  // }
};

module.exports = connectDb;
