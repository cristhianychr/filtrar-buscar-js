// VARIABLES
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

// EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // muestra los autos al cargar

    // Lena las opciones de años
    llenarSelect();
});

// EventListener para los select de búsqueda
marca.addEventListener('change', llenarDatosBusqueda);

year.addEventListener('change', llenarDatosBusqueda);

minimo.addEventListener('change', llenarDatosBusqueda);

maximo.addEventListener('change', llenarDatosBusqueda);

puertas.addEventListener('change', llenarDatosBusqueda);

transmision.addEventListener('change', llenarDatosBusqueda);

color.addEventListener('change', llenarDatosBusqueda);

// FUNCIONES
function mostrarAutos(autos) {
    //Elimina el HTML previo
    limpiarHTML();

    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('P');
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}     
        `;

        // Insertar en el html
        resultado.appendChild(autoHTML);
    });
}

//Limpiar HTML de resultado
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.firstChild.remove();
    }
}

// Genera los años del select
function llenarSelect(){
    for(let i = max; i > min; i--){
        const opcion = document.createElement('OPTION');
        opcion.value = i;
        opcion.textContent = i;

        year.appendChild(opcion);
    }
}

// Llenar datosBusqueda
function llenarDatosBusqueda(e) {
    datosBusqueda[e.target.id] = e.target.value;
    // console.log(datosBusqueda);
    filtrarAuto();
}

// Función que filtra en base a la búsqueda
function filtrarAuto() {
    const resultado = autos
                        .filter( filtrarMarca )
                        .filter( filtrarYear )
                        .filter( filtrarMinimo )
                        .filter( filtrarMaximo )
                        .filter( filtrarPuertas )
                        .filter( filtrarTransmision )
                        .filter( filtrarColor );
    // console.log(resultado);

    if(resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
    
}

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intenta otros términos de búsqueda';
    
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if ( marca ) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if ( year ) {
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if ( minimo ) {
        return auto.precio >= parseInt(minimo);
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if ( maximo ) {
        return auto.precio <= parseInt(maximo);
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if ( puertas ) {
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if ( transmision ) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if ( color ) {
        return auto.color === color;
    }
    return auto;
}