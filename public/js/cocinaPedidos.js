$(document).ready(function(){
	// la funcion getUrlCocina se encuentra en el fichero variables public/js/variables.js
	cargarPedidosPreparando();
});
function cargarPedidosPreparando() {
	$('#spinnerModal').modal('show');
	$.get(getUrlCocina()+'api/pedido/preparando', function(response) {
		$('#pedidos tr').remove();
		let cabecera = $('<thead>');
		let filaCabecera = $('<tr>');
		filaCabecera.append($('<th>').text('Id Pedido Cocina'));
		filaCabecera.append($('<th>').text('Plato'));
		filaCabecera.append($('<th>').text('Fecha ingreso'));
		$("table").append(filaCabecera);
		$("table").append(cabecera);
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
		alert(xhr.responseJSON.message);
	});
}