$(document).ready(function() {
    loadLastQuotation();
    $('#btnCalcular').on('click', calculate);
    $('#btnGuardar').on('click', saveLocal);
});

function MensajeTipoSeguro() {
    const selectedId = $('#seguro option:selected').attr('id');
    const infoSeguros = {
        "PBO": "Protección Básica Obligatoria (PBO)\nCubre daños al vehículo rentado y daños a vehículos terceros involucrados en un accidente de tránsito.\nCosto de alquiler diario: $ 5.45 por día.",
        "PED": "Protección Extendida de Daños(PED)\nCubre la Protección Básica Obligatoria (PBO) más daños a propiedades de terceros, incendio e inundaciones.\nCosto de alquiler diario: $ 9.50 por día.",
        "PGM": "Protección Gasto Médicos(PGM)\nCubre la Protección Extendida de Daños(PED) más gastos médicos para los ocupantes del vehículo.\nCosto de alquiler diario: $ 11.25 por día."
    };

    if (infoSeguros[selectedId]) {
        alert(infoSeguros[selectedId]);
    }
}

async function calculate() {
    const startStr = $('#fechaRetiro').val();
    const endStr = $('#fechadevolucion').val();
    
    if (!startStr || !endStr) {
        return alert("Por favor seleccione ambas fechas.");
    }

    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffTime = end - start;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days < 3 || days > 365) {
        alert("La cantidad de días no es correcta. El alquiler debe ser entre 3 y 365 días.");
        $('#dias, #td, #totalPagar').val("");
        return;
    }

    $('#dias').val(days);

    // TD = TDV + TDS
    let td = parseFloat($('#tipoVehiculo').val()) + parseFloat($('#seguro').val());

    // Descuento por cantidad de días
    if (days > 30 && days < 120) {
        td = td * 0.85; // 15% desc
    } else if (days >= 120 && days <= 365) {
        td = td * 0.75; // 25% desc
    }
    $('#td').val(td.toFixed(2));

    // Descuento por Región (API Rest)
    const cca3 = $('#nacionalidad').val();
    let regionalDesc = 0;
    try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${cca3}`);
        const data = await response.json();
        const region = data[0].region;

        if (region === "Americas" || region === "Europe") {
            regionalDesc = 0.10;
        } else if (region === "Africa") {
            regionalDesc = 0.05;
        }
    } catch (e) {
        console.error("Error al obtener la región:", e);
    }

    // TP = TD * CD – ((TD * CD) * Desc)
    const totalSinReg = td * days;
    const tp = totalSinReg - (totalSinReg * regionalDesc);
    $('#totalPagar').val(tp.toFixed(2));
}

function saveLocal() {
    const data = {
        fR: $('#fechaRetiro').val(),
        fD: $('#fechadevolucion').val(),
        nac: $('#nacionalidad').val(),
        tv: $('#tipoVehiculo').val(),
        seg: $('#seguro').val(),
        dias: $('#dias').val(),
        td: $('#td').val(),
        tp: $('#totalPagar').val()
    };
    localStorage.setItem('lastQuote', JSON.stringify(data));
    localStorage.setItem('lastCountry', data.nac);
    alert("Cotización guardada exitosamente.");
}

function loadLastQuotation() {
    try {
        const saved = localStorage.getItem('lastQuote');
        if (saved) {
            const d = JSON.parse(saved);
            $('#fechaRetiro').val(d.fR);
            $('#fechadevolucion').val(d.fD);
            $('#tipoVehiculo').val(d.tv);
            $('#seguro').val(d.seg);
            $('#dias').val(d.dias);
            $('#td').val(d.td);
            $('#totalPagar').val(d.tp);
            // La nacionalidad se carga en countries.js tras poblar el select
        }
    } catch (e) { console.error("Error cargando caché", e); }
}