import { SomfyApi } from '../core/somfy-api';
import { NodeProperties, Red } from 'node-red';
import { INodeConfiguration } from '../interfaces/node-config';

export = (RED: Red) => {
    RED.nodes.registerType('tahoma-read', function (this, props) {
        const config: INodeConfiguration = props as unknown as INodeConfiguration; // TODO: Handle this differently
        RED.nodes.createNode(this, (config as unknown as NodeProperties));

        this.device = config.device;
        this.site = config.site;
        this.tahomabox = config.tahomabox;

        this.on('input', (msg) => {
            const somfyApiClient = new SomfyApi(RED, this.context, this.tahomabox);
            somfyApiClient.getDevice(this.device)
                .then((deviceData) => {
                    msg.payload = deviceData;
                    this.send(msg);
                })
                .catch((error) => {
                    msg.payload = null;
                    this.send(msg);
                });
        });
    });
};
