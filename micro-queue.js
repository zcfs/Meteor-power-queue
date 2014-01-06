/** A basic lifo or fifo queue
  * This is better than a simple array with pop/shift because shift is O(n)
  * and can become slow with a large array.
  * @method MicroQueue
  * @constructor
  * @param {boolean} [lifo=false] Set true for `lifo`, default is `fifo`
  * This queue was build as the spinal basis for the [`PowerQueue`](#PowerQueue)
  * The interface is very basic and consists of:
  * `add`, `get`, `reset` Making it possible to write a custom micro-queue for
  * the `PowerQueue` eg.: a queue that is persisted into a database etc.
  *
  * Usage:
```js
  var foo = new MicroQueue(); // Basic fifo queue
  foo.add(1);
  foo.add(2);
  foo.add(3);
  for (var i = 0; i < foo.length(); i++) {
    console.log(foo.get());
  }
```
  * The result should be: "1, 2, 3"
  */
MicroQueue = function(lifo) {
  var self = this, first = 0, last = -1, list = [];

  // The private reactive length property
  var _length = new ReactiveProperty(0);

  /** @method MicroQueue.length
    * @reactive
    * @returns {number} Length / number of items in queue
    */
  self.length = _length.get;

  /** @method MicroQueue.add Add item to the queue
    * @param {any} value The item to add to the queue
    * @param {boolean} reversed Internally used to add pre queue
    */
  self.add = function(value, reversed) {
    if (reversed && first > 0) {
      list[--first] = value;
    } else {
      list[++last] = value;
    }
    _length.inc();
  };

  /** @method MicroQueue.get Get next tiem from queue
    * @return {any} The item that was next in line
    */
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

  /** @method MicroQueue.reset Reset the queue
    * This method will empty all data in the queue.
    */
  self.reset = function() {
    first = 0;
    last = -1;
    _length.set(0);
    list = [];
  };
};
