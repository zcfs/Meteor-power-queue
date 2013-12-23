// A basic lifo or fifo queue
// This is better than a simple array with pop/shift because shift is O(n)
// and can become slow with a large array.
microQueue = function(lifo) {
  var self = this, list = [];

  _length = new reactiveProperty(0);

  self.length = _length.get;

  self.add = function(value) {
    list.push(value);
    _length.set(list.length);
  };

  self.get = function() {
    var value;
    value = (lifo)?list.pop() : list.shift();
    _length.set(list.length);
    return value;
  };

  self.reset = function() {
    list = [];
    _length.set(0);
  };
}