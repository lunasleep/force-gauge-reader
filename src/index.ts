import { ReadlineParser, SerialPort } from "serialport";

export enum ForceDirection {
    Compression = "Compression",
    Tension = "Tension"
}

export enum Units {
    PoundForce = "lbF",
    KilogramForce = "kgF",
    GramForce = "gF",
    Newton = "N"
}

export interface SensorReading {
    direction: ForceDirection,
    value: number,
    unit: Units
}

const COMMAND = "?\r";
const PARSER = new ReadlineParser();

export async function open(filepath: string, baudrate: number): Promise<SerialPort> {
    return new Promise(function (resolve, reject) {
        const port = new SerialPort({ path: filepath, baudRate: baudrate, autoOpen: false });
        port.open( function (err) {
            if (err) {
                reject(err);
            }
            port.pipe(PARSER);
            resolve(port);
        });
    })
}

export async function read_gauge(port: SerialPort): Promise<SensorReading> {
    return new Promise(function (resolve, reject) {
        port.write(COMMAND, 'ascii', function (err) {
            if (err) {
                reject(err);
            }
            PARSER.on('data', (data) => {
                resolve(process_reading(data));
            });
        })
    })
}

function process_reading(data: string): SensorReading {
    const spl = data.trim().split(" ");
    let direction;
    let value;
    if (spl[0][0] == "-") {
        direction = ForceDirection.Tension;
        value = parseFloat(spl[0].slice(1));
    } else {
        direction = ForceDirection.Compression;
        value = parseFloat(spl[0]);
    }
    return {
        direction: direction,
        value: value,
        unit: spl[1] as Units
    }
}
