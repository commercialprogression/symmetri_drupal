
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
      target: ['libraries/compro-globalStyling/*.js']
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'libraries/compro-globalStyling/scss/',
          src: ['*.scss'],
          dest: 'libraries/compro-globalStyling/css/',
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
        'libraries/compro-globalStyling/scss/*.scss',
        'libraries/compro-globalStyling/scss/*/*.scss'
      ]
    },

    watch: {
      css: {
        files: [
          'libraries/compro-globalStyling/scss/*.scss',
          'libraries/compro-globalStyling/scss/*/*.scss'
        ],
        tasks: ['sass']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
