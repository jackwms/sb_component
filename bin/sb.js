#!/usr/bin/env node
const { start } = require('../index');
var program = require('commander');

program
    .version('0.0.1')
    .allowUnknownOption()
start();