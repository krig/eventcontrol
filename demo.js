$(function() {
  'use strict';

  $('.eventcontrol').EventControl({
    onhover: function(item, element, event, inout) {
      if (inout == 'out') {
        $('.eventcontrol-target').html('');
        element.css('color', element.data('clr'));
      } else {
        var x = ['<ul>'];
        $.each(item, function(k, v) {
          x.push('<li><strong>', k, ':</strong> ', v, '</li>');
        });
        x.push('</ul>');
        $('.eventcontrol-target').html(x.join(''));
        element.data('clr', element.css('color'));
        element.css('color', '#9b59b6');
      }
    },
    oncreate: function(item, element) {
      if (item.basename.indexOf('error') > -1) {
        element.css('color', '#e74c3c');
      } else if (item.basename.indexOf('warn') > -1) {
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
"basename": "pe-warn-2",
"filename": "pe-warn-2.bz2",
"path": "webui/pengine/pe-warn-2.bz2",
"node": "webui",
"version": null,
"index": 0,
"info": "warning: stage6:\tScheduling Node node1 for STONITH\nUsing the original execution date of: 2016-03-02 09:57:03Z\n\nCurrent cluster status:\nNode node1 (168633611): UNCLEAN (offline)\nOnline: [ webui ]\n\n development-stonith\t(stonith:null):\tStopped\n Resource Group: g-proxy\n     proxy-vip\t(ocf::heartbeat:IPaddr2):\tStopped\n     proxy\t(systemd:haproxy):\tStopped\n Resource Group: g-serv1\n     vip1\t(ocf::heartbeat:IPaddr2):\tStopped\n     srv1\t(ocf::heartbeat:apache):\tStopped\n Resource Group: g-serv2\n     vip2\t(ocf::heartbeat:IPaddr2):\tStopped\n     srv2\t(ocf::heartbeat:apache):\tStopped\n\nTransition Summary:\n * Start   development-stonith\t(webui)\n\nExecuting cluster transition:\n * Resource action: development-stonith monitor on webui\n * Resource action: proxy-vip       monitor on webui\n * Resource action: proxy           monitor on webui\n * Resource action: vip1            monitor on webui\n * Resource action: srv1            monitor on webui\n * Resource action: vip2            monitor on webui\n * Resource action: srv2            monitor on webui\n * Fencing node1 (reboot)\n * Pseudo action:   stonith_complete\n * Pseudo action:   all_stopped\n * Resource action: development-stonith start on webui\nUsing the original execution date of: 2016-03-02 09:57:03Z\n\nRevised cluster status:\nOnline: [ webui ]\nOFFLINE: [ node1 ]\n\n development-stonith\t(stonith:null):\tStarted webui\n Resource Group: g-proxy\n     proxy-vip\t(ocf::heartbeat:IPaddr2):\tStopped\n     proxy\t(systemd:haproxy):\tStopped\n Resource Group: g-serv1\n     vip1\t(ocf::heartbeat:IPaddr2):\tStopped\n     srv1\t(ocf::heartbeat:apache):\tStopped\n Resource Group: g-serv2\n     vip2\t(ocf::heartbeat:IPaddr2):\tStopped\n     srv2\t(ocf::heartbeat:apache):\tStopped\nTransition webui:pe-warn-2 (10:57:03 - 10:57:04):\n\ttotal 11 actions: 11 Complete\nMar 02 10:57:03 webui pengine[1007]: warning: Scheduling Node node1 for STONITH\nMar 02 10:57:03 webui crmd[1008]: notice: Executing reboot fencing operation (23) on node1 (timeout=60000)\nMar 02 10:57:04 webui stonith-ng[1003]: notice: Operation 'reboot' [1048] (call 2 from crmd.1008) for host 'node1' with device 'development-stonith' returned: 0 (OK)\nMar 02 10:57:04 webui IPaddr2(proxy-vip)[1061]: ERROR: Unable to find nic or netmask.\nMar 02 10:57:04 webui IPaddr2(proxy-vip)[1065]: INFO: [findif] failed\nMar 02 10:57:04 webui crmd[1008]: notice: Initiating action 9: start development-stonith_start_0 on webui (local)\nMar 02 10:57:04 webui lrmd[1004]: notice: executing - rsc:development-stonith action:start call_id:10\nMar 02 10:57:04 webui lrmd[1004]: notice: finished - rsc:development-stonith action:start call_id:10  exit-code:0 exec-time:14ms queue-time:0ms\nMar 02 10:57:04 webui IPaddr2(vip1)[1093]: ERROR: Unable to find nic or netmask.\nMar 02 10:57:04 webui IPaddr2(vip1)[1097]: INFO: [findif] failed\nMar 02 10:57:04 webui apache(srv1)[1115]: ERROR: apache httpd program not found\nMar 02 10:57:04 webui apache(srv1)[1119]: INFO: environment is invalid, resource considered stopped\nMar 02 10:57:04 webui IPaddr2(vip2)[1153]: ERROR: Unable to find nic or netmask.\nMar 02 10:57:04 webui IPaddr2(vip2)[1157]: INFO: [findif] failed\nMar 02 10:57:04 webui apache(srv2)[1175]: ERROR: apache httpd program not found\nMar 02 10:57:04 webui apache(srv2)[1179]: INFO: environment is invalid, resource considered stopped\nMar 02 10:57:04 webui IPaddr2(proxy-vip)[1061]: ERROR: Unable to find nic or netmask.\nMar 02 10:57:04 webui IPaddr2(vip1)[1093]: ERROR: Unable to find nic or netmask.\nMar 02 10:57:04 webui apache(srv1)[1115]: ERROR: apache httpd program not found\nMar 02 10:57:04 webui IPaddr2(vip2)[1153]: ERROR: Unable to find nic or netmask.\nMar 02 10:57:04 webui apache(srv2)[1175]: ERROR: apache httpd program not found",
"info_err": "INFO: 2: running ptest with /vagrant/hawk/tmp/reports/hawk-2016-02-29T23:00:00+00:00-2016-03-31T21:59:59+00:00/webui/pengine/pe-warn-2.bz2\n",
"tags": [
"development-stonith",
"error",
"node1",
"proxy-vip",
"srv1",
"srv2",
"vip1",
"vip2"
]
},
{
"timestamp": "2016-03-02T11:10:39+01:00",
"basename": "pe-warn-3",
"filename": "pe-warn-3.bz2",
"path": "webui/pengine/pe-warn-3.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T12:56:32+01:00",
"basename": "pe-input-21",
"filename": "pe-input-21.bz2",
"path": "webui/pengine/pe-input-21.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:26:37+01:00",
"basename": "pe-input-23",
"filename": "pe-input-23.bz2",
"path": "webui/pengine/pe-input-23.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:26:52+01:00",
"basename": "pe-input-25",
"filename": "pe-input-25.bz2",
"path": "webui/pengine/pe-input-25.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:27:40+01:00",
"basename": "pe-input-27",
"filename": "pe-input-27.bz2",
"path": "webui/pengine/pe-input-27.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:29:16+01:00",
"basename": "pe-input-29",
"filename": "pe-input-29.bz2",
"path": "webui/pengine/pe-input-29.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:29:17+01:00",
"basename": "pe-input-30",
"filename": "pe-input-30.bz2",
"path": "webui/pengine/pe-input-30.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:29:18+01:00",
"basename": "pe-input-31",
"filename": "pe-input-31.bz2",
"path": "webui/pengine/pe-input-31.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:29:26+01:00",
"basename": "pe-input-33",
"filename": "pe-input-33.bz2",
"path": "webui/pengine/pe-input-33.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:29:32+01:00",
"basename": "pe-input-35",
"filename": "pe-input-35.bz2",
"path": "webui/pengine/pe-input-35.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:29:50+01:00",
"basename": "pe-input-37",
"filename": "pe-input-37.bz2",
"path": "webui/pengine/pe-input-37.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:29:56+01:00",
"basename": "pe-input-39",
"filename": "pe-input-39.bz2",
"path": "webui/pengine/pe-input-39.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:30:45+01:00",
"basename": "pe-input-40",
"filename": "pe-input-40.bz2",
"path": "webui/pengine/pe-input-40.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:31:00+01:00",
"basename": "pe-input-42",
"filename": "pe-input-42.bz2",
"path": "webui/pengine/pe-input-42.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:31:02+01:00",
"basename": "pe-input-44",
"filename": "pe-input-44.bz2",
"path": "webui/pengine/pe-input-44.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:31:08+01:00",
"basename": "pe-input-46",
"filename": "pe-input-46.bz2",
"path": "webui/pengine/pe-input-46.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:31:41+01:00",
"basename": "pe-input-47",
"filename": "pe-input-47.bz2",
"path": "webui/pengine/pe-input-47.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:31:46+01:00",
"basename": "pe-input-49",
"filename": "pe-input-49.bz2",
"path": "webui/pengine/pe-input-49.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:31:52+01:00",
"basename": "pe-input-51",
"filename": "pe-input-51.bz2",
"path": "webui/pengine/pe-input-51.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:31:53+01:00",
"basename": "pe-input-52",
"filename": "pe-input-52.bz2",
"path": "webui/pengine/pe-input-52.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:32:07+01:00",
"basename": "pe-input-55",
"filename": "pe-input-55.bz2",
"path": "webui/pengine/pe-input-55.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:32:09+01:00",
"basename": "pe-input-57",
"filename": "pe-input-57.bz2",
"path": "webui/pengine/pe-input-57.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:32:11+01:00",
"basename": "pe-input-59",
"filename": "pe-input-59.bz2",
"path": "webui/pengine/pe-input-59.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:32:17+01:00",
"basename": "pe-input-61",
"filename": "pe-input-61.bz2",
"path": "webui/pengine/pe-input-61.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:58:32+01:00",
"basename": "pe-input-63",
"filename": "pe-input-63.bz2",
"path": "webui/pengine/pe-input-63.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T14:58:41+01:00",
"basename": "pe-input-65",
"filename": "pe-input-65.bz2",
"path": "webui/pengine/pe-input-65.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:00:13+01:00",
"basename": "pe-input-67",
"filename": "pe-input-67.bz2",
"path": "webui/pengine/pe-input-67.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:00:16+01:00",
"basename": "pe-input-69",
"filename": "pe-input-69.bz2",
"path": "webui/pengine/pe-input-69.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:00:27+01:00",
"basename": "pe-input-71",
"filename": "pe-input-71.bz2",
"path": "webui/pengine/pe-input-71.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:00:27+01:00",
"basename": "pe-input-72",
"filename": "pe-input-72.bz2",
"path": "webui/pengine/pe-input-72.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:07:15+01:00",
"basename": "pe-input-73",
"filename": "pe-input-73.bz2",
"path": "webui/pengine/pe-input-73.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:07:15+01:00",
"basename": "pe-input-74",
"filename": "pe-input-74.bz2",
"path": "webui/pengine/pe-input-74.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:07:29+01:00",
"basename": "pe-input-75",
"filename": "pe-input-75.bz2",
"path": "webui/pengine/pe-input-75.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:07:29+01:00",
"basename": "pe-input-76",
"filename": "pe-input-76.bz2",
"path": "webui/pengine/pe-input-76.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:07:34+01:00",
"basename": "pe-input-79",
"filename": "pe-input-79.bz2",
"path": "webui/pengine/pe-input-79.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:07:43+01:00",
"basename": "pe-input-81",
"filename": "pe-input-81.bz2",
"path": "webui/pengine/pe-input-81.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:07:56+01:00",
"basename": "pe-input-83",
"filename": "pe-input-83.bz2",
"path": "webui/pengine/pe-input-83.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:08:01+01:00",
"basename": "pe-input-85",
"filename": "pe-input-85.bz2",
"path": "webui/pengine/pe-input-85.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:08:02+01:00",
"basename": "pe-input-86",
"filename": "pe-input-86.bz2",
"path": "webui/pengine/pe-input-86.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:48:45+01:00",
"basename": "pe-input-88",
"filename": "pe-input-88.bz2",
"path": "webui/pengine/pe-input-88.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-02T15:55:29+01:00",
"basename": "pe-input-89",
"filename": "pe-input-89.bz2",
"path": "webui/pengine/pe-input-89.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-04T10:09:08+01:00",
"basename": "pe-input-90",
"filename": "pe-input-90.bz2",
"path": "webui/pengine/pe-input-90.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-04T10:12:55+01:00",
"basename": "pe-input-91",
"filename": "pe-input-91.bz2",
"path": "webui/pengine/pe-input-91.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-09T14:00:36+01:00",
"basename": "pe-warn-4",
"filename": "pe-warn-4.bz2",
"path": "webui/pengine/pe-warn-4.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-09T16:08:59+01:00",
"basename": "pe-input-94",
"filename": "pe-input-94.bz2",
"path": "webui/pengine/pe-input-94.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-11T14:36:06+01:00",
"basename": "pe-input-95",
"filename": "pe-input-95.bz2",
"path": "webui/pengine/pe-input-95.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-11T14:36:06+01:00",
"basename": "pe-input-96",
"filename": "pe-input-96.bz2",
"path": "webui/pengine/pe-input-96.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-11T14:36:06+01:00",
"basename": "pe-input-97",
"filename": "pe-input-97.bz2",
"path": "webui/pengine/pe-input-97.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-11T14:36:06+01:00",
"basename": "pe-input-98",
"filename": "pe-input-98.bz2",
"path": "webui/pengine/pe-input-98.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-11T14:36:09+01:00",
"basename": "pe-warn-5",
"filename": "pe-warn-5.bz2",
"path": "webui/pengine/pe-warn-5.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-13T23:20:52+01:00",
"basename": "pe-warn-6",
"filename": "pe-warn-6.bz2",
"path": "webui/pengine/pe-warn-6.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-13T23:25:05+01:00",
"basename": "pe-input-100",
"filename": "pe-input-100.bz2",
"path": "webui/pengine/pe-input-100.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-13T23:25:09+01:00",
"basename": "pe-input-101",
"filename": "pe-input-101.bz2",
"path": "webui/pengine/pe-input-101.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-13T23:25:09+01:00",
"basename": "pe-input-102",
"filename": "pe-input-102.bz2",
"path": "webui/pengine/pe-input-102.bz2",
"node": "webui",
"version": null
},
{
"timestamp": "2016-03-13T23:25:11+01:00",
"basename": "pe-warn-7",
"filename": "pe-warn-7.bz2",
"path": "webui/pengine/pe-warn-7.bz2",
"node": "webui",
"version": null
}
]

  });
});
