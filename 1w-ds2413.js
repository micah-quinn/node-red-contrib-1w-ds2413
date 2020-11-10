module.exports = function(RED) {

    function DS2413Node(config) {
       const fs = require('fs');

        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var file = '/sys/bus/w1/devices/'+msg.topic+'/state'
            fs.readFile(file, null, (err, data) => {
              if (err) {
                node.warn("Could not open DS2413 file: " + file)
                return
              }
              msg.payload = data[0]
              msg.gpio_0 = (data[0] & 1) == 1
              msg.gpio_1 = (data[0] & 4) == 4
              node.send(msg)
           });
        });
    }
    RED.nodes.registerType("1w-ds2413",DS2413Node);
}
