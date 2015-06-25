// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', new SongModel());
    //creates new songQueue collection
    this.set('songQueue', new SongQueue());

    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the funciton (this.set('currentSong', song)) would
    end up refering to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */

    // listens for enqueue event on library model
    params.library.on('enqueue', function(song){
      this.get("songQueue").add(song)
      if (!this.get("currentSong").has("artist")){
        this.set('currentSong', song);
      }
    }, this);

    params.library.on('play', function(song){
      this.set('currentSong', song);
    }, this);

    params.library.on('dequeue', function(song){
      //if this.get("currentSong") === song
      this.get('songQueue').remove(song);
    }, this)

    params.library.on('ended', function(){
      var songQueue = this.get('songQueue');
      songQueue.remove(songQueue.at(0))
      this.set('currentSong', songQueue.at(0));
    }, this)
  }

});
