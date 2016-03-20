$(function() {
  'use strict';

  $('.eventcontrol').EventControl({
    hammertime: true,
    onhover: function(item, element, event, inout) {
      if (inout == 'out') {
        $('.eventcontrol-target').html('');
        element.css('color', element.data('clr'));
      } else {
        var x = ['<h2>', moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss'), '</h2>'];
        $('.eventcontrol-target').html(x.join(''));
        $('.eventcontrol-target').css('color', element.css('color'));
        element.data('clr', element.css('color'));
        element.css('color', '#9b59b6');
      }
    },
    oncreate: function(item, element) {
      if (item.type == 'error') {
        element.css('color', '#e74c3c');
      } else if (item.type == 'warning') {
        element.css('color', '#e67e22');
      } else {
        element.css('color', '#1abc9c');
      }
    },
    onclick: function(item, element, event) {
      alert(item.timestamp);
    },
    data: [
{
"timestamp": "2016-03-02T10:57:03+01:00",
"type": "warning",
},
{
"timestamp": "2016-03-02T11:10:39+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T12:56:32+01:00",
"type": "",
},
{
"timestamp": "2016-03-02T14:26:37+01:00",
"type": "",
},
{
"timestamp": "2016-03-02T14:26:52+01:00",
"type": "error",
},
{
"timestamp": "2016-03-02T14:27:40+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:29:16+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:29:17+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:29:18+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:29:26+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:29:32+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:29:50+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:29:56+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:30:45+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:31:00+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:31:02+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:31:08+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:31:41+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:31:46+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:31:52+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:31:53+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:32:07+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:32:09+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:32:11+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:32:17+01:00",
  "type": "error",
},
{
"timestamp": "2016-03-02T14:58:32+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T14:58:41+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:00:13+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:00:16+01:00",
  "type": "warning",
},
{
"timestamp": "2016-03-02T15:00:27+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:00:27+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:07:15+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:07:15+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:07:29+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:07:29+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:07:34+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:07:43+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:07:56+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:08:01+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:08:02+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:48:45+01:00",
  "type": "",
},
{
"timestamp": "2016-03-02T15:55:29+01:00",
  "type": "",
},
{
"timestamp": "2016-03-04T10:09:08+01:00",
  "type": "",
},
{
"timestamp": "2016-03-04T10:12:55+01:00",
  "type": "",
},
{
"timestamp": "2016-03-09T14:00:36+01:00",
  "type": "",
},
{
"timestamp": "2016-03-09T16:08:59+01:00",
  "type": "",
},
{
"timestamp": "2016-03-11T14:36:06+01:00",
  "type": "",
},
{
"timestamp": "2016-03-11T14:36:06+01:00",
  "type": "",
},
{
"timestamp": "2016-03-11T14:36:06+01:00",
  "type": "error",
},
{
"timestamp": "2016-03-11T14:36:06+01:00",
  "type": "error",
},
{
"timestamp": "2016-03-11T14:36:09+01:00",
  "type": "",
},
{
"timestamp": "2016-03-13T23:20:52+01:00",
  "type": "",
},
{
"timestamp": "2016-03-13T23:25:05+01:00",
  "type": "",
},
{
"timestamp": "2016-03-13T23:25:09+01:00",
  "type": "",
},
{
"timestamp": "2017-03-13T23:25:09+01:00",
  "type": "",
},
{
"timestamp": "2019-03-13T23:25:11+01:00",
  "type": "",
}
]

  });
});
