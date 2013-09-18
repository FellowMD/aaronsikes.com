module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.initConfig({
    watch: {
      less: {
        // Using less to render styles.
        // Watch for the *.less file sonly
        files: ['less/*.less'],
        tasks: 'lessCopy'
      },
      css: {
        files: ['css/**'],
        tasks: 'copy:css'
      },
      jekyllSources: {
        files: [
          'index.html', '_config.yml', 'package.json',
          'js/**', 'img/**',
          '_includes/**', '_layouts/**',
          '_posts/**', '_drafts/**',
          'blog/**', 'projects/**', 'apps/**', 'ideas/**', 'about/**'
          ],
        tasks: 'shell:jekyll',
        options: {
          interrupt: true
        }
      }
    },
    copy: {
      css : {
        files: [{
          // Copy the less-generated style file to
          // the _site/ folder
          expand: true,
          cwd: 'css/',
          src:  '**',
          dest: '_site/css/'
        }]
      }
    },
  shell: {
      jekyll: {
          command: 'rm -rf _site/*; jekyll build --drafts',
          stdout: true
      }
  },
  less: {
    development: {
      options: {
        paths: ["less"]
      },
      files: {
        "css/main.css": "less/main.less"
      }
    }
  },
  connect: {
    server: {
      options: {
        port: 3000,
        base: './_site'
      }
    }
  }

  });
  // less watch
  grunt.registerTask('lessCopy', ['less:development', 'copy:css']);
  // Default task.
  grunt.registerTask('default', ['shell:jekyll', 'connect', 'watch']);

};