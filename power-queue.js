// FIFO
PowerQueue = function(name) {
  var self = this;
  var invokations = [];
  var paused = true;
  var maxLength = 0;
  var title = name || 'Queue';

  self.progress = function(count, total) {
    console.log(title + ': ' + count + ' of ' + total + ' left');
  };

  self.reset = function() {
    console.log(title + ' RESET');
    paused = true;
    invokations = [];
  };

  self.add = function(f) {
    console.log(title + ' ADD');
    if (typeof f !== 'function') {
      throw new Error('queue requires function');
    }
    invokations.push(f);

    if (paused) {
      self.run();
    }
  };

  self.next = function(text) {
    console.log(title + ' NEXT');
    if (text) {
      self.reset();
      console.log(' ' + text);
    }

    if (!paused) {


      if (invokations.length) {
        var f = invokations.shift();
        paused = (invokations.length === 0);
        if (paused) {
          console.log(title + ' ENDED');
        }
        // Update the progress
        self.progress(invokations.length, maxLength);
        setTimeout(function() {
          // Run function
          f(self.next);
        }, 0);
      }

    }
  };

  self.pause = function() {
    self.paused = true;
  };

  self.run = function() {
    console.log(title + ' RUN');
    paused = false;
    maxLength = invokations.length;
    // Update the progress
    self.progress(invokations.length, maxLength);
    self.next();
  };
};