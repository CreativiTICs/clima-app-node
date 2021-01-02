const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demandOption: true
    }
}).argv;

const getInfo = async (direccion)=>{
    try {
        const coords = await lugar.getLugarLngLat(argv.direccion);
        const temp = await clima.getClima(coords.latitud, coords.longitud);
        return `El clima de ${coords.lugar} es de ${temp} °C.`;
    } catch (e) {
        return `No se pudo determinar el clima de ${direccion}`;
    }
}

getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);