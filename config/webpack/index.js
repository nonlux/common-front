require('babel-register');
require('../env');
module.exports=require('./config')(process.env);
