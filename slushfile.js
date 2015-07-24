/*
 * slush-javabasic
 * https://github.com/akashvbabu/slush-javabasic
 *
 * Copyright (c) 2015, Akash
 * Licensed under the MIT license.
 */

 'use strict';

 var gulp = require('gulp'),
     install = require('gulp-install'),
     conflict = require('gulp-conflict'),
     template = require('gulp-template'),
     rename = require('gulp-rename'),
     _ = require('underscore.string'),
     inquirer = require('inquirer');

 var defaults = (function() {
     var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
         workingDirName = process.cwd().split('/').pop().split('\\').pop(),
         osUserName = homeDir && homeDir.split('/').pop() || 'root',
         configFile = homeDir + '/.gitconfig',
         user = {};
     if (require('fs').existsSync(configFile)) {
         user = require('iniparser').parseSync(configFile).user;
     }
     return {
         appName: workingDirName,
         userName: user.name || osUserName,
         authorEmail: user.email || '',
         appClassName:'testClass',
         appMethodName:'mystery',
         methodReturntype:'void',
         secondClass : 'no',
         calcObjectNeeded :'no'
     };
 })();

 gulp.task('default', function(done) {
     var prompts = [{
         name: 'appName',
         message: 'What is the name of your project?',
         default: defaults.appName
     },{
        name: 'appClassName',
        message: 'What is the name of the java class?',
        default: defaults.appClassName
     },{
        name: 'appMethodName',
        message: 'What is the name of the method in the java class?',
        default: defaults.appMethodName
     },{
        name: 'methodReturntype',
        message: 'What is the return type of the method in the java class?',
        default: defaults.methodReturntype
     },{
        name: 'secondClass',
        message: 'Do you need a Calculator Class(with basic math functions)',
        default: defaults.secondClass
     },{
        name: 'calcObjectNeeded',
        message: 'Do you need a Calculator Object created for you?',
        default: defaults.calcObjectNeeded
     }];
     //Ask
     inquirer.prompt(prompts,
         function(answers) {
             answers.appNameSlug = _.slugify(answers.appName);
             gulp.src(__dirname + '/templates/**')
                 .pipe(template(answers))
                 .pipe(rename(function(file) {
                     if (file.basename[0] === '_') {
                         file.basename = '.' + file.basename.slice(1);
                     }
                 }))
                 .pipe(conflict('./'))
                 .pipe(gulp.dest('./'))
                 .pipe(install())
                 .on('end', function() {
                     done();
                 });
         });
 });
