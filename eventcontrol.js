// Copyright (c) 2016 Kristoffer Gronlund <kgronlund@suse.com>
// See COPYING for license.

(function($) {
  'use strict';

  function unit_in_timespan(h, min_time, timespan) {
    var s = min_time - (min_time % h);
    var e = min_time + timespan;
    if (h > 15*60*1000) {
      s -= 3600*1000;
    }
    var r = [s];
    while (s < e) {
      s += h;
      if (s >= min_time && s <= e) {
        r.push(s);
      }
    }
    if (r.length > 20) {
      r = r.slice(0, 20);
    }
    return r;
  }

  var MIN_SPAN = 10000;
  var MAX_SPAN = 1000 * 3600 * 24 * 365 * 100;

  var EventControl = function(element, options) {

    this.settings = $.extend({
      onhover: function(item, element, event, inout) {},
      onclick: function(item, element, event) {},
      oncreate: function(item, element) {},
      data: [],
      hammertime: false,
      items_height: 101,
      markers_height: 31,
    }, options);

    this.element = element;
    this.width = element.width();

    this.items_h = this.settings.items_height;
    this.markers_h = this.settings.markers_height;
    this._dragging = null;
    this._drag_x = 0;

    element.addClass('eventcontrol');
    element.append(['<div class="ec-items ec-draggable" style="top:0px;height:', this.items_h, 'px;"></div>',
                    '<div class="ec-markers ec-draggable" style="top:', (this.items_h + 1), 'px;height:', this.markers_h, 'px;">',
                    '<div class="ec-ticks"></div>',
                    '<div class="ec-labels"></div>',
                    '</div>'
                   ].join(''));

    this.items = element.children('.ec-items');
    this.markers = element.children('.ec-markers');
    this.ticks = this.markers.children('.ec-ticks');
    this.labels = this.markers.children('.ec-labels');
    this.min_time = moment("2070-01-01");
    this.max_time = moment("1970-01-01");
    this.timespan = MAX_SPAN;
    this.max_timespan = MAX_SPAN;
    this.center_time = this.min_time.valueOf() + MAX_SPAN * 0.5;

    this.init();

    return this;
  };

  EventControl.prototype.init = function() {
    var self = this;
    var element = this.element;

    function pan_with_delta(dragdelta, min_time, max_time) {
      if (dragdelta > 0.9)
        dragdelta = 0.9;
      else if (dragdelta < -0.9)
        dragdelta = -0.9;

      var time_offset = dragdelta * self.timespan;

      var new_min_time = moment(min_time + time_offset);
      var new_max_time = moment(max_time + time_offset);
      if (!new_min_time.isSame(self.min_time) || new_max_time.isSame(self.max_time)) {
        self.update_timespan(new_min_time, new_max_time);
      }
    }

    if (self.settings.hammertime) {
      self.mc = new Hammer.Manager(self.element.get()[0]);
      self.mc.add(new Hammer.Pan());
      // Tap recognizer with minimal 2 taps
      self.mc.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
      // Single tap recognizer
      self.mc.add( new Hammer.Tap({ event: 'singletap' }) );
      self.mc.get('doubletap').recognizeWith('singletap');
      // we only want to trigger a tap, when we don't have detected a doubletap
      self.mc.get('singletap').requireFailure('doubletap');

      self.mc.on("panstart panleft panright singletap doubletap tap", function(e) {
        if (e.type == "singletap") {
          var tgt = $(e.target);
          if (tgt.hasClass('ec-dot')) {
            self.settings.onclick.call(self, tgt.data('event'), tgt, e);
          }
        } else if (e.type == "panstart") {
          self._pan_min_time = self.min_time.valueOf();
          self._pan_max_time = self.max_time.valueOf();
        } else if (e.type == "panleft" || e.type == "panright") {
          var deltapx = -e.deltaX;
          var dragdelta = deltapx / self.width;

          pan_with_delta(dragdelta, self._pan_min_time, self._pan_max_time);
        } else if (e.type == "doubletap") {
          var base = element.offset();
          var dir = 1;
          var offset = (e.center.x - base.left) / self.width;
          self.zoom(dir, offset);
        } else {
          console.log("Unexpected hammer event", e.type);
        }
      });

    } else {
      element.on('click', function(e) {
        var tgt = $(e.target);
        if (tgt.hasClass('ec-dot')) {
          self.settings.onclick.call(self, tgt.data('event'), tgt, e);
        }
      });

      element.mousedown(function(e) {
        if (e.which == 1) {
          element.children('.ec-draggable').addClass('ec-dragging');
          self._dragging = true;
          self._drag_x = e.pageX;
          self._drag_min_time = self.min_time.valueOf();
          self._drag_max_time = self.max_time.valueOf();
          return false;
        }
      });

      function stop_dragging() {
        element.children('.ec-draggable').removeClass('ec-dragging');
        self._dragging = null;
      }

      $('body').mouseup(function(e) {
        if (e.which == 1) {
          stop_dragging();
        }
      });

      $('body').on("dragend",function(){
        stop_dragging();
      });

      $('body').mousemove(function(e) {
        if (e.which == 1 && self._dragging) {
          var deltapx = -(e.pageX - self._drag_x);
          var dragdelta = deltapx / self.width;

          pan_with_delta(dragdelta, self._drag_min_time, self.drag_max_time);
        }
      });
    }

    $(window).resize(function() {
      if (!self._dirty) {
        self._dirty = true;
        if (self.min_time && self.max_time) {
          var mit = self.min_time.clone();
          var mat = self.max_time.clone();
          window.setTimeout(function() {
            if (mit.isSame(self.min_time) && mat.isSame(self.max_time)) {
              self.update_timespan(mit, mat);
            }
          }, 400);
        }
      }
    });

    element.on('mousewheel', function(event) {
      event.preventDefault();
      var dir = event.deltaY;
      var base = element.offset();
      var offset = (event.pageX - base.left) / self.width;
      self.zoom(dir, offset);
    });

    $.each(self.settings.data, function(i, item) {
      self.items.append('<div class="ec-dot" style="left:0px;top:0px;"></div>');
      var elem = self.items.children('.ec-dot').last();
      elem.data('event', item);
      item._starttime = moment(item.timestamp).valueOf();

      self.settings.oncreate.call(self, item, elem);

      elem.hover(function(event) {
        self.settings.onhover.call(self, item, elem, event, 'in');
      }, function(event) {
        self.settings.onhover.call(self, item, elem, event, 'out');
      });

      var t = moment(item.timestamp);
      if (t < self.min_time) {
        self.min_time = t.clone();
      }
      if (t > self.max_time) {
        self.max_time = t;
      }
    });

    self.min_time.subtract(5, 'seconds');
    self.max_time.add(5, 'seconds');
    self.center_time = self.min_time.valueOf() + (self.max_time.valueOf() - self.min_time.valueOf()) * 0.5;

    self.update_timespan(self.min_time.clone(), self.max_time.clone());
  };

  EventControl.prototype.save_state = function() {
    return {min_time: this.min_time.valueOf(), max_time: this.max_time.valueOf()};
  };

  EventControl.prototype.load_state = function(state) {
    this.update_timespan(state.min_time, state.max_time);
  };

  EventControl.prototype.zoom = function(dir, focus) {
    if (focus === undefined) {
      focus = 0.5;
    }

    var new_min_time = this.min_time.clone();
    var new_max_time = this.max_time.clone();

    if (dir < 0) {
      var delta = this.timespan * 0.5;
      new_min_time.subtract(delta * focus, 'milliseconds');
      new_max_time.add(delta * (1.0 - focus), 'milliseconds');
    } else {
      var delta = this.timespan * 0.25;
      new_min_time.add(delta * focus, 'milliseconds');
      new_max_time.subtract(delta * (1.0 - focus), 'milliseconds');
    }

    return this.update_timespan(new_min_time, new_max_time);
  };

  EventControl.prototype.update_timespan = function(new_min_time, new_max_time) {
    var self = this;
    var element = this.element;

    self._dirty = false;
    self.width = element.width();

    self.ticks.empty();
    self.labels.empty();

    if (!moment.isMoment(new_min_time)) {
      new_min_time = moment(new_min_time);
    }
    if (!moment.isMoment(new_max_time)) {
      new_max_time = moment(new_max_time);
    }

    self.timespan = new_max_time.valueOf() - new_min_time.valueOf();
    if (self.timespan < MIN_SPAN) {
      var ct = self.min_time.valueOf() + (self.max_time.valueOf() - self.min_time.valueOf()) * 0.5;
      new_min_time = moment(ct - MIN_SPAN*0.5);
      new_max_time = moment(ct + MIN_SPAN*0.5);
      self.timespan = new_max_time.valueOf() - new_min_time.valueOf();
    }

    if (self.max_timespan == MAX_SPAN) {
      self.max_timespan = self.timespan * 2;
    }

    if (self.timespan > self.max_timespan) {
      new_min_time = moment(self.center_time - self.max_timespan * 0.5);
      new_max_time = moment(self.center_time + self.max_timespan * 0.5);
      self.timespan = self.max_time.valueOf() - self.min_time.valueOf();
    }
    self.min_time = new_min_time;
    self.max_time = new_max_time;

    var min_time_ms = self.min_time.valueOf();

    var major;
    var minor;
    var major_fmt = 'YYYY-MM-DD';
    var minor_fmt = 'HH:mm';
    var maj_unit = 24*3600*1000;
    var min_unit = null;

    if (self.timespan > 4*365*24*3600*1000) {
      maj_unit = 365*24*3600*1000;
      major_fmt = 'YYYY';
      min_unit = null;
    } else if (self.timespan > 365*24*3600*1000) {
      maj_unit = 120*24*3600*1000;
      major_fmt = 'YYYY-MM';
      min_unit = null;
    } else if (self.timespan > 120*24*3600*1000) {
      maj_unit = 31*24*3600*1000;
      major_fmt = 'YYYY-MM';
      min_unit = null;
    } else if (self.timespan > 31*24*3600*1000) {
      maj_unit = 31*24*3600*1000;
      min_unit = null;
    } else if (self.timespan > 24*24*3600*1000) {
      maj_unit = 14*24*3600*1000;
      min_unit = null;
    } else if (self.timespan > 12*24*3600*1000) {
      maj_unit = 7*24*3600*1000;
      min_unit = null;
    } else if (self.timespan >= 6*24*3600*1000) {
      maj_unit = 24*3600*1000;
      min_unit = null;
    } else {
      var spans = [3*24*3600*1000, 2*24*3600*1000, 24*3600*1000, 12*3600*1000, 6*3600*1000, 3*3600*1000,  3600*1000, 45*60*1000, 30*60*1000, 20*60*1000, 10*60*1000, 5*60*1000, 3*60*1000, 60*1000, 45*1000, 20*1000, 12*1000, 0];
      var units = [  12*3600*1000,    6*3600*1000,  4*3600*1000,  3*3600*1000,   3600*1000,  30*60*1000, 15*60*1000,  5*60*1000,  4*60*1000,  3*60*1000,  2*60*1000,   60*1000,   30*1000, 15*1000, 10*1000,  5*1000,  2*1000, 1000,];

      var i;
      for (i = 0; i < spans.length; i++) {
        if (self.timespan > spans[i]) {
          min_unit = units[i];
          break;
        }
      }
    }

    major = unit_in_timespan(maj_unit, min_time_ms, self.timespan);

    if (min_unit != null) {
      if (min_unit < 60*1000) {
        minor_fmt = 'HH:mm:ss';
      }

      minor = unit_in_timespan(min_unit, min_time_ms, self.timespan);

      $.each(minor, function(i, ts) {
        var xoffs = (self.width / self.timespan) * (ts - min_time_ms);
        self.ticks.append(['<div class="ec-tick" style="left:', xoffs, 'px;top:', 1, 'px;height:', self.items_h + 1 + self.markers_h, 'px;"></div>'].join(''));

        var l = (self.width / self.timespan) * (ts - min_time_ms);
        var t = self.items_h + 1;
        var lbl = moment(ts).format(minor_fmt);
        self.labels.append(['<div class="ec-label" style="left:', l, 'px;top:', t, 'px;">', lbl, '</div>'].join(""));
      });
    } else {
      $.each(major, function(i, ts) {
        var xoffs = (self.width / self.timespan) * (ts - min_time_ms);
        self.ticks.append(['<div class="ec-tick" style="left:', xoffs, 'px;top:', 1, 'px;height:', self.items_h * 0.5, 'px;"></div>'].join(''));
      });
    }

    $.each(major, function(i, ts) {
      var l = ((self.width - 4) / self.timespan) * (ts - min_time_ms) + 2;
      var t = self.items_h + self.markers_h - 14;
      var lbl = moment(ts).format(major_fmt);
      if (l < 0) {
        if (i < major.length-1) {
          var next = ((self.width - 4) / self.timespan) * (major[i + 1] - min_time_ms) + 2;
          if (next > 60) {
            l = 2;
          }
        } else {
          l = 2;
        }
      }

      self.labels.append(['<div class="ec-region-label" style="left:', l, 'px;top:', t, 'px;">', lbl, '</div>'].join(""));
    });

    var item_offset = 2;
    var item_slot_x = -100;
    var item_slot_y = item_offset;
    var item_w = 8;
    var item_d = item_w + item_offset;

    self.items.children('.ec-dot').each(function() {
      var item = $(this).data('event');
      var m = item._starttime;


      var x = Math.floor(item_offset + ((self.width - (item_offset*2)) / self.timespan) * (m - min_time_ms));

      if (x < -item_w) {
        $(this).css('left', -200);
      } else if (x > self.width + item_w) {
        $(this).css('left', self.width + 200);
      } else {
        var xf = x % item_d;
        x = x - xf;
        var y = item_offset;

        var pushed = false;
        var xoffs = item_slot_x;
        if ((x + xf - item_slot_x) <= item_w) {
          pushed = true;
          x = xoffs;
          y = item_slot_y + item_d;
          if (y > self.items_h - item_offset) {
            xoffs += item_d;
            x = xoffs;
            y = item_offset;
          }
        } else {
          item_slot_y = item_offset;
        }

        if (!pushed) {
          x += xf;
        }

        item_slot_x = x;
        item_slot_y = y;

        $(this).css('left', x).css('top', y);
      }
    });
  };

  $.fn.EventControl = function(options) {
    return this.each(function() {
      var element = $(this);
      var self = element.data('eventcontrol');
      if (!self) {
        element.data('eventcontrol', new EventControl(element, options));
      } else if (options === undefined) {
        return self.save_state();
      } else if (options == 'zoom-in') {
        return self.zoom.apply(self, [1] + arguments.slice(1, 2));
      } else if (options == 'zoom-out') {
        return self.zoom.apply(self, [-1] + arguments.slice(1, 2));
      } else {
        self.load_state(options);
      }
    });
  };

}(jQuery));
