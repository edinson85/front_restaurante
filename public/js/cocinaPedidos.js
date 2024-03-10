$(document).ready(function(){
	// la funcion getUrlCocina se encuentra en el fichero variables public/js/variables.js
	$('#spinnerModal').modal('show');
	$.get(getUrlCocina()+'api/pedido/preparando', function(response) {
		if($('#pedidos #none').length) {
			$('#pedidos #none').remove();
		}
		let data = response.data;
		for (var clave in data) {
			let row = '<tr id="'+data[clave].id+'">' +
				'<td>'+data[clave].id+'</td>' +
				'<td>'+data[clave].nombre_receta+'</td>' +
				'<td>'+data[clave].created_at+'</td>' +
			'</tr>';
			$("table").append(row);
		}
		$('#spinnerModal').modal('hide');
	}).fail(function(xhr, status, error) {
		$('#spinnerModal').modal('hide');
		alert("No fue posible procesar su petición");
	});
});