'use strict';
const path = require('path');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;

console.log(chalk.yellow('Opening connection to PostgreSQL'));

// create the database instance
module.exports = new Sequelize('juke', 'bpr', 'sunshine', {
  dialect: 'postgres',
  port: 5432,
  logging: false // set to console.log to see the raw SQL queries
});