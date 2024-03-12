$(document).ready(function(){
	// la variable urlGerente se encuentra en el fichero variables public/js/variables.js
	cargarDatosPedidos();
	$('[data-toggle="tooltip"]').tooltip();
    $(".add-new").click(function(){
		$('#spinnerModal').modal('show');
		var xhr = new XMLHttpRequest();
		xhr.open('POST', getUrlGerente()+'api/pedido', true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function () {
			if (xhr.status >= 200 && xhr.status < 300) {
				if($('#pedidos #none').length) {
					$('#pedidos #none').remove();
				}
				let response = JSON.parse(xhr.response);
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
				$('table tr:eq(1)').before(row);
				$('#spinnerModal').modal('hide');
			} else {
				$('#spinnerModal').modal('hide');
				alert(xhr.responseJSON.message);
			}
		};
		xhr.onerror = function () {
			$('#spinnerModal').modal('hide');
			alert('Error de red al intentar hacer la solicitud.');
		};
		xhr.send();
    });
});
function cargarDatosPedidos() {
	$('#spinnerModal').modal('show');
	var xhr = new XMLHttpRequest();
	xhr.open('GET',getUrlGerente()+'api/pedido', true);
	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 300) {
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
			let response = JSON.parse(xhr.response);
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
		} else {
			$('#spinnerModal').modal('hide');
			alert(xhr.responseJSON.message);
		}
	};
	xhr.onerror = function () {
		$('#spinnerModal').modal('hide');
		alert('Error de red al intentar hacer la solicitud.');
	};
	xhr.send();
}