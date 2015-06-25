// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<audio controls autoplay />',

  events: {
    ended: function() {

      this.model.ended();
    }
  },

  initialize: function() {
  },

  setSong: function(song){
    this.model = song;
    //if song is falsy because current song was dequeued
    if (!this.model) {
      this.$el.pause();
    }
    this.render();
  },

  render: function(){
    return this.$el.attr('src', this.model ? this.model.get('url') : '');
  }

});
