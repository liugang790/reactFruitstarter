'use strict';
var ip = require('ip');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-restful-mock');
  grunt.initConfig({
    mock: {
        options:{
          host: ip.address(),
          port:'9000'
        },
        apis: {
            options: {
              debug: true
            },
            cwd: 'mock',
            src: ['*.json']
        }
      },
    "file-creator": {
      "dev": {
        "app/scripts/constants/constant.js": function(fs, fd, done) {
          fs.readFile('template/constant.js', 'utf8', function (err,data) {
            data = data.replace(/ip/g, "http://" + ip.address() + ":9000");
            data = data.replace(/dev/, "true");
            data = data.replace(/root_url/g, "/#/");
            fs.writeSync(fd, data);
            done();
          });
        }
      },
      "production": {
        "app/scripts/constants/constant.js": function(fs, fd, done) {
          fs.readFile('template/constant.js', 'utf8', function (err,data) {
            data = data.replace(/ip/g, "http://client.techmars.net")
            data = data.replace(/dev/, "false");
            data = data.replace(/root_url/g, "/static/index.html#/");
            data = data.replace(/\/\/credentials/g, ",credentials: 'include'");
            fs.writeSync(fd, data);
            done();
          });
        }
      },
      "debug":{
        "app/scripts/constants/constant.js": function(fs, fd, done) {
          var openid = 'o7nM2v-30xGvt4MO9qrLZLaTfJXY:1azT0v:2ZEs9mWFbUy-HcQetNIuxORiGQk';
          fs.readFile('template/constant.js', 'utf8', function (err,data) {
            data = data.replace(/ip/g, "http://client.techmars.net")
            data = data.replace(/dev/, "false");
            data = data.replace(/root_url/g, "/#/");
            data = data.replace(/\/\/auth-code/, "'Authorization':'xiaomingtest',");
            fs.writeSync(fd, data);
            done();
          });
        }
      }
    }
  });

  grunt.registerTask('dev', [
    'file-creator:dev',
    'mock'
  ]);

  grunt.registerTask('production', [
    'file-creator:production'  
  ]);


  grunt.registerTask('debug', [
    'file-creator:debug'  
  ]);
};