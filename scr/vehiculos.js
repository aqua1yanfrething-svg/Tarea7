const dataVehiculos = {
    "COM": [
        { img: "Compacto1.png", desc: "KIA PICANTO, Año 2016" },
        { img: "Compacto2.png", desc: "FORD FIESTA ST, Año 2015" },
        { img: "Compacto3.png", desc: "PEUGEOT 308, Año 2018" }
    ],
    "MED": [
        { img: "Mediano1.png", desc: "HONDA CITY CAR, Año 2017" },
        { img: "Mediano2.png", desc: "MERCEDES SLS, Año 2015" },
        { img: "Mediano3.png", desc: "FORD FIESTA ST, Año 2016" }
    ],
    "4WD": [
        { img: "TodoTerreno1.png", desc: "TOYOTA FJ CRUISER, Año 2016" },
        { img: "TodoTerreno2.png", desc: "TOYOTA Prado, Año 2018" },
        { img: "TodoTerreno3.png", desc: "NISSAN JUKE, Año 2017" }
    ],
    "FAM": [
        { img: "Familiar1.png", desc: "TOYOTA SIENNA, Año 2018" },
        { img: "Familiar2.png", desc: "DODGE GRAND CARAVANE, Año 2015" },
        { img: "Familiar3.png", desc: "HYUNDAI ELANTRA, Año 2016" }
    ]
};

function mostrarTodo() {
    // Obtener el ID del option seleccionado (COM, MED, etc)
    const tipo = $('#tipoVehiculo option:selected').attr('id');
    const lista = dataVehiculos[tipo];

    // Cargar las 3 miniaturas
    $('#img1').attr('src', 'images/' + lista[0].img);
    $('#img2').attr('src', 'images/' + lista[1].img);
    $('#img3').attr('src', 'images/' + lista[2].img);

    // Por defecto mostrar la primera imagen del tipo seleccionado
    mostrarImagen(1);
}

function mostrarImagen(index) {
    const tipo = $('#tipoVehiculo option:selected').attr('id');
    const vehiculo = dataVehiculos[tipo][index - 1];

    // Actualizar imagen principal y descripción
    $('#imgVista').attr('src', 'images/' + vehiculo.img);
    $('#infTCar').text(vehiculo.desc);
}