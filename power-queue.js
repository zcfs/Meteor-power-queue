PowerQueue = function(name) {
  var self = this;
  var invokations = new q();
  self.paused = true;
  var maxLength = 0;
  var title = name || 'Queue';

  // Generally, override this
  self.progress = function(count, total) {
    console.log(title + ': ' + count + ' of ' + total + ' left');
  };

  self.reset = function() {
    console.log(title + ' RESET');
    self.paused = true;
    maxLength = 0;
    invokations.reset();
  };

  self.add = function(f) {
    console.log(title + ' ADD');
    if (typeof f !== 'function') {
      throw new Error('queue requires function');
    }
    invokations.add(f);
    maxLength++;
    self.run();
  };

  self.next = function(text) {
    console.log(title + ' NEXT');
    if (text) {
      self.reset();
      console.log(' ' + text);
    }

    if (!self.paused) {
      var f = invokations.get();
      var remaining = invokations.length;
      if (remaining === 0) {
        self.reset();
        console.log(title + ' ENDED');
      }
      // Update the progress
      self.progress(remaining, maxLength);
      Meteor.setTimeout(function() {
        // Run function
        f(self.next);
      }, 0);
    }
  };

  self.pause = function() {
    self.paused = true;
  };

  self.run = function() {
    if (!self.paused) {
      return; //already running
    }
    console.log(title + ' RUN');
    var remaining = invokations.length;
    if (!remaining) {
      return;
    }
    self.paused = false;
    // Update the progress
    self.progress(remaining, maxLength);
    self.next();
  };
};

function q(lifo) {
  var self = this, first = 0, last = -1, list = [];
  
  self.length = 0;

  self.add = function(value) {
    list[++last] = value;
    self.length++;
  };

  self.get = function() {
    var value;
    if (first > last)
      return; // queue empty
    if (lifo) {
      value = list[first];
      delete list[first]; // help garbage collector
      first++;
    } else {
      value = list[last];
      delete list[last]; // help garbage collector
      last--;
    }
    self.length--;
    return value;
  };

  self.reset = function() {
    first = 0;
    last = -1;
    self.length = 0;
    list = [];
  };
}