// Client-side reactive version
reactiveProperty = function(defaultValue) {
  var self = this;
  var _value = defaultValue;
  var _deps = new Deps.Dependency();

  self.get = function() {
    _deps.depend();
    return _value;
  };

  self.set = function(value) {
    if (_value !== value) {
      _value = value;
      _deps.changed();
    }
  };

  self.dec = function(by) {
    _value -= by || 1;
    _deps.changed();
  };

  self.inc = function(by) {
    _value += by || 1;
    _deps.changed();
  };

  self.getset = function(value) {
    if (typeof value !== 'undefined') {
      self.set(value);
    } else {
      return self.get();
    }
  };

};