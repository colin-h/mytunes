// SongQueue.js - Defines a backbone model class for the song queue.

//like models - no .get() or.set()
var SongQueue = Songs.extend({

  initialize: function(){


    this.on('add', this.enqueue, this);
    this.on('dequeue', this.dequeue, this);
    this.on('ended', this.playNext, this);

  },

  enqueue : function(song) {
    if (this.length === 1) {
      this.playFirst();
    }
  },

  dequeue: function(song){
    if( this.at(0) === song ){
      this.playNext();
    } else {
      //if last item in queue pause --- not quite working
      if (this.length === 1) {
        this.play(this.at(0))
      }
      this.remove(song);
    }
  },

  playNext: function(){
    this.shift();
    if( this.length >= 1 ){
      this.playFirst();
    } else {
      this.trigger('stop');
    }
  },

  playFirst: function(song) {
    this.at(0).play();
  }


});
