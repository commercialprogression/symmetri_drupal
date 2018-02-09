
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      options: {
        configFile: '.eslintrc.json',
        format: 'compact',
        outputFile: '.lint/eslint.latest.log',
        quiet: true
      },
      target: ['js/*.js']
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'scss/',
          src: ['*.scss'],
          dest: 'css/',
          ext: '.css'
        }]
      }
    },

    stylelint: {
      options: {
        configFile: '.stylelintrc.yml',
        formatter: 'string',
        ignoreDisables: false,
        failOnError: false,
        outputFile: '.lint/stylelint.latest.log',
        reportNeedlessDisables: false,
        syntax: ''
      },
      src: [
        'scss/*.scss',
        'scss/*/*.scss'
      ]
    },

    watch: {
      css: {
        files: [
          'js/*.js',
          'scss/*.scss',
          'scss/*/*.scss'
        ],
        tasks: ['sass', 'stylelint', 'eslint']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-stylelint');
};
