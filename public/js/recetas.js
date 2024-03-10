$(document).ready(function(){
	// la funcion getUrlCocina se encuentra en el fichero variables public/js/variables.js
	$('#spinnerModal').modal('show');
	$.get(getUrlCocina()+'api/receta', function(response) {
		if ($("#container-recetas").hasClass("d-none")) {
			$("#container-recetas").removeClass("d-none");
		}
		$("#no-recetas").addClass("d-none");
		let data = response.data;
		for (var clave in data) {
			agregarRecetas(data[clave].nombre_receta, data[clave].ingredientes);
		}
		$('#spinnerModal').modal('hide');
	}).fail(function(xhr, status, error) {
		$('#spinnerModal').modal('hide');
		alert("No fue posible procesar su petición");
	});

	function agregarRecetas(nombre, ingredientes) {
		let titulo = $('<h2>').text(nombre);
		$('#container-recetas').append(titulo);
		let tabla = $('<table>').addClass('table');
		// Crear la cabecera de la tabla
		let cabecera = $('<thead>');
		let filaCabecera = $('<tr>');
		filaCabecera.append($('<th>').text('Ingrediente'));
		filaCabecera.append($('<th>').text('Cantidad'));
		cabecera.append(filaCabecera);
		tabla.append(cabecera);

		// Crear filas y celdas de la tabla
		let cuerpoTabla = $('<tbody>');
		for (var clave in ingredientes) {
			let row = '<tr id="'+ingredientes[clave].id+'">' +
				'<td>'+ingredientes[clave].nombre+'</td>' +
				'<td>'+ingredientes[clave].cantidad+'</td>' +
			'</tr>';
			cuerpoTabla.append(row);
		}
		tabla.append(cuerpoTabla);
		$('#container-recetas').append(tabla);
	}
});