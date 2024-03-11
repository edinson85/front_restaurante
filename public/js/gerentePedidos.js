$(document).ready(function(){
	// la variable urlGerente se encuentra en el fichero variables public/js/variables.js
	cargarDatosPedidos();
	$('[data-toggle="tooltip"]').tooltip();
    $(".add-new").click(function(){
		$('#spinnerModal').modal('show');
		$.ajax({
			url: getUrlGerente()+'api/pedido',
			type: 'POST',
			success: function(response) {
				if($('#pedidos #none').length) {
					$('#pedidos #none').remove();
				}
				let data = response.data;
				let idPedidoCocina = 'Pendiente';
				let plato = 'Pendiente';
				let recibido = 'Pendiente';
				let estado = 'Pendiente';
				if (data.id_pedido_cocina !== null) {
					idPedidoCocina = data.id_pedido_cocina;
				}
				if (data.plato !== null) {
					plato = data.plato;
				}
				if (data.estado !== null) {
					estado = data.estado;
				}
				if (data.recibido !== "") {
					recibido = data.recibido;
				}
				let row = '<tr id="'+data.id+'">' +
					'<td>'+data.id+'</td>' +
					'<td>'+idPedidoCocina+'</td>' +
					'<td>'+plato+'</td>' +
					'<td>'+estado+'</td>' +
					'<td>'+recibido+'</td>' +
					'<td>'+data.created_at+'</td>' +
				'</tr>';
				$("table").append(row);
				$('#spinnerModal').modal('hide');
			},
			error: function(xhr, status, error) {
				$('#spinnerModal').modal('hide');
				alert("No fue posible procesar su petición");
			}
		});
    });
});
function cargarDatosPedidos() {
	$('#spinnerModal').modal('show');
	$.get(getUrlGerente()+'api/pedido', function(response) {
		$('#pedidos tr').remove();
		let cabecera = $('<thead>');
		let filaCabecera = $('<tr>');
		filaCabecera.append($('<th>').text('Id'));
		filaCabecera.append($('<th>').text('Id Pedido Cocina'));
		filaCabecera.append($('<th>').text('Plato'));
		filaCabecera.append($('<th>').text('Estado'));
		filaCabecera.append($('<th>').text('Recibido'));
		filaCabecera.append($('<th>').text('Fecha solicitud'));
		$("table").append(filaCabecera);
		$("table").append(cabecera);
		let data = response.data;
		for (var clave in data) {
			let idPedidoCocina = 'Pendiente';
			let plato = 'Pendiente';
			let recibido = 'Pendiente';
			let estado = 'Pendiente';
			if (data[clave].id_pedido_cocina !== null) {
				idPedidoCocina = data[clave].id_pedido_cocina;
			}
			if (data[clave].plato !== null) {
				plato = data[clave].plato;
			}
			if (data[clave].estado !== null) {
				estado = data[clave].estado;
			}
			if (data[clave].recibido !== "") {
				recibido = data[clave].recibido;
			}
			let row = '<tr id="'+data[clave].id+'">' +
				'<td>'+data[clave].id+'</td>' +
				'<td>'+idPedidoCocina+'</td>' +
				'<td>'+plato+'</td>' +
				'<td>'+estado+'</td>' +
				'<td>'+recibido+'</td>' +
				'<td>'+data[clave].created_at+'</td>' +
			'</tr>';
			$("table").append(row);
		}
		$('#spinnerModal').modal('hide');
	}).fail(function(xhr, status, error) {
		$('#spinnerModal').modal('hide');
		alert("No fue posible procesar su petición");
	});
}