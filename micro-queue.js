// A basic lifo or fifo queue
// This is better than a simple array with pop/shift because shift is O(n)
// and can become slow with a large array.
microQueue = function(lifo) {
  var self = this, first = 0, last = -1, list = [];

  var _length = new reactiveProperty(0);

  self.length = _length.get;

  self.add = function(value) {
    list[++last] = value;
    _length.inc();
  };

  self.get = function() {
    var value;
    if (first > last)
      return; // queue empty
    if (lifo) {
      value = list[last];
      delete list[last]; // help garbage collector
      last--;
    } else {
      value = list[first];
      delete list[first]; // help garbage collector
      first++;
    }
    _length.dec();
    return value;
  };

  self.reset = function() {
    first = 0;
    last = -1;
    _length.set(0);
    list = [];
  };
};
