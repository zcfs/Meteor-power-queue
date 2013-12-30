/** A basic lifo or fifo queue
  * This is better than a simple array with pop/shift because shift is O(n)
  * and can become slow with a large array.
  * @method microQueue
  * @constructor
  * @param {boolean} [lifo=false] Set true for `lifo`, default is `fifo`
  * This queue was build as the spinal basis for the [`PowerQueue`](#PowerQueue)
  * The interface is very basic and consists of:
  * `add`, `get`, `reset` Making it possible to write a custom micro-queue for
  * the `PowerQueue` eg.: a queue that is persisted into a database etc.
  */
microQueue = function(lifo) {
  var self = this, first = 0, last = -1, list = [];

  // The private reactive length property
  var _length = new reactiveProperty(0);

  /** @method microQueue.length
    * @reactive
    * @type {reactiveProperty}
    */
  self.length = _length.get;

  /** @method microQueue.add Add value to the queue
    * @param {any} value The value to add to the queue
    */
  self.add = function(value) {
    list[++last] = value;
    _length.inc();
  };

  /** @method microQueue.get Get next value from queue
    * @return {any} The value that was next in line
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

  /** @method microQueue.reset Reset the queue
    * This method will empty all data in the queue.
    */
  self.reset = function() {
    first = 0;
    last = -1;
    _length.set(0);
    list = [];
  };
};
