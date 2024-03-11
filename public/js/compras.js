$(document).ready(function(){
	cargarCompras();
});

function cargarCompras() {
		// la funcion getUrlCocina se encuentra en el fichero variables public/js/variables.js
		$('#spinnerModal').modal('show');
		$.get(getUrlBodega()+'api/compras', function(response) {
			$('#compras tr').remove();
			let cabecera = $('<thead>');
			let filaCabecera = $('<tr>');
			filaCabecera.append($('<th>').text('Id'));
			filaCabecera.append($('<th>').text('Ingrediente'));
			filaCabecera.append($('<th>').text('Cantidad entregada'));
			filaCabecera.append($('<th>').text('Resultado'));
			filaCabecera.append($('<th>').text('Fecha'));
			$("table").append(filaCabecera);
			$("table").append(cabecera);

			let data = response.data;
			for (var clave in data) {
				let row = '<tr id="'+data[clave].id+'">' +
					'<td>'+data[clave].id+'</td>' +
					'<td>'+data[clave].ingrediente+'</td>' +
					'<td>'+data[clave].cantidad+'</td>' +
					'<td>'+data[clave].resultado+'</td>' +
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