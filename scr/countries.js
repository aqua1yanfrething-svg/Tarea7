$(document).ready(function() {
    loadCountries();
});

function loadCountries() {
    const url = "https://restcountries.com/v3.1/all";
    $.getJSON(url, function(data) {
        const select = $('#nacionalidad');
        select.empty();
        
        // Ordenar países por nombre común
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        
        $.each(data, function(i, country) {
            // Se prioriza el nombre en español si está disponible en la API
            const nombreEspanol = (country.translations && country.translations.spa) 
                                  ? country.translations.spa.common 
                                  : country.name.common;
            select.append($('<option>', {
                value: country.cca3,
                text: nombreEspanol
            }));
        });

        // Lógica de preselección
        const savedCca3 = localStorage.getItem('lastCountry');
        if (savedCca3) {
            select.val(savedCca3);
        } else {
            select.val('CRI'); // Costa Rica por defecto
        }
    }).fail(function() {
        console.error("Error al cargar la lista de países.");
    });
}