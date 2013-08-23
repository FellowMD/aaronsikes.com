#!/usr/bin/env node

// a simple static webserver
var connect = require('connect');
var path = require('path');
var exec = require('child_process').exec;


var filename = path.basename(process.argv[1]);
process.argv.forEach(function(val, index, array){
  if (1 >= index)
    return;
  if (val.match(/(\-h|\-help)/))
    showHelp();
});

var port = process.argv[2] || 5555;
var userpath = process.argv[3] || '';


//var dir = path.resolve(findup(process.cwd(), 'grunt.js'), '../node_modules/grunt');
var dir = path.resolve(process.cwd(), userpath);


console.log('Starting static web server...\n');
console.log('Web root: ' + dir);
console.log('Port    : ' + port);
console.log('Going to   : http://localhost:' + port);
try {
  var app = connect()
    .use(connect.static(dir))
    .listen(port);

  exec('open -a Google\\ Chrome http://localhost:' + port,
    function(error, stdout, stderr){
      if (error && error.length) {
        console.log('Launching Chrome Canary error:\n' + error);
      }
    });

} catch (e) {
  console.log(e);
}

function showHelp()
{
  console.log('Usage: ' + filename + ' [port] [path]\n');
  process.exit(1);
}