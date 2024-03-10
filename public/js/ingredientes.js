$(document).ready(function(){
	// la funcion getUrlCocina se encuentra en el fichero variables public/js/variables.js
	$('#spinnerModal').modal('show');
	$.get(getUrlBodega()+'api/ingredientes', function(response) {
		if($('#ingredientes #none').length) {
			$('#ingredientes #none').remove();
		}
		let data = response.data;
		for (var clave in data) {
			let row = '<tr id="'+data[clave].id+'">' +
				'<td>'+data[clave].nombre+'</td>' +
				'<td>'+data[clave].cantidad+'</td>' +
			'</tr>';
			$("table").append(row);
		}
		$('#spinnerModal').modal('hide');
	}).fail(function(xhr, status, error) {
		$('#spinnerModal').modal('hide');
		alert("No fue posible procesar su petición");
	});
});