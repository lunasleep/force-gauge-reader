import { open, read_gauge } from "./index";

const toString = (data: any) => JSON.stringify(data, null, '  ');

async function test() {
    try {
        const port = await open("/dev/cu.SLAB_USBtoUART", 115200);
        const reading = await read_gauge(port);
        console.log(`reading: ${toString(reading)}`);
        port.close();
    } catch (error) {
        console.log(`error: ${error}`);
    }
}

test()