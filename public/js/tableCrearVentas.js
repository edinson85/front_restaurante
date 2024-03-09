$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();	
	let productos = [];
	let valores = [];
	let total = 0;
	let tipo = '';
	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		//$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
		tipo = 'new';
		let idProduct = $('#productos').val();
		if (idProduct != 0) {
			$('#productos').find('option[value="' + idProduct + '"]').hide(); 			
			productos.push(idProduct);
			result = procesarValorSeleccionado($('#productos').find('option:selected').text());			
			total = total + parseInt(result[1]);			
			valores[idProduct] = parseInt(result[1]);
			var row = '<tr id='+idProduct+'>' +
				'<td name="nombre">'+result[0]+'</td>' +
				'<td name="valor"> $ '+result[1]+'</td>' +				
				'<td><a class="delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a></td>' +
			'</tr>';
			$("table").append(row);		
			$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
			$('[data-toggle="tooltip"]').tooltip();
			$('#total').html('<b>$ '+total+'</b>');
			$('#productos').val(0);
		} else {
			alert("Debe seleccionar una opción valida para productos");
		}
    });

	$(".create").click(function(){
		let idCliente = $('#clientes').val();
		if (idCliente != 0) {
			let datos = {
				productos: productos,
				idCliente: idCliente,
				total: total
			};	
			var j = jQuery.noConflict();
			$.ajax({
				url: '/ventasMvc/ventas/registrar',
				type: 'POST',
				data: datos,
				success: function(response) {
					// Manejar la respuesta exitosa aquí
					console.log('Petición POST enviada correctamente');
					console.log(response);				
					window.history.back();

				},
				error: function(xhr, status, error) {
				// Manejar errores aquí
				console.error('Error en la petición POST');
				console.error(error);
				}
			});			
		} else {
			alert("Debe seleccionar un cliente valido");
		}		
	});
	// Add row on add button click
	$(document).on("click", ".add", function() {
		var empty = false;
		var input = $(this).parents("tr").find('input[type="text"]');
		let allInputs  = $(this).parents("tr").find('input');
		let id  = $(this).parents("tr").attr('id');		
        input.each(function(){
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){
			agregarEditarCliente(allInputs, id);
			input.each( function(){				
				$(this).parent("td").html($(this).val());				
			});				
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");									
		}		
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){
		tipo = 'edit';		
		let claves = ['cedula','nombres','apellidos', 'estado']
		let contador = 0;
        $(this).parents("tr").find("td:not(:last-child)").each(function(){			
			$(this).find("")			
			$(this).each(function() {
				let campo = $(this).find('input[type="checkbox"]');
				if (campo.length > 0) {				  
					let campoSelected = '';
					if (campo.prop('checked')) {
						campoSelected = 'checked';
					}
				  $(this).html('<input  type="checkbox" value="" name="estado" id="estado" '+campoSelected+'>');
				} else {				  
				  $(this).html('<input type="text" id="'+claves[contador]+'" name ="'+claves[contador]+'" class="form-control" value="' + $(this).text() + '">');
				  contador++;
				}
			  });
		});		
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
    });
	// Delete row on delete button click
	$(document).on("click", ".delete", function(){
        $(this).parents("tr").remove();		
		$(".add-new").removeAttr("disabled");
		let id  = $(this).parents("tr").attr('id');
		$('#productos').find('option[value="' + id + '"]').show(); 			
		eliminarProducto(id);
		let valor = valores [id];
		total = total - valor;
		$('#total').html('<b>$ '+total+'</b>');		
    });

	function agregarEditarCliente(allInputs, id) {	
		/*
			let datos = '';
			let clave = '';
			let valor = '';	
			let totalCampos = 0;  
			allInputs.each( function(){
				if ($(this).attr('type') == 'text') {
					clave = $(this).attr("id");				
					//$(this).parent("td").html($(this).val());
					valor = ($(this).val());									
					datos = addData(datos, clave, valor);
					totalCampos ++;
				}
				if ($(this).attr('type') == 'checkbox') {
					clave = $(this).attr("id");				
					valor = false;				
					if ($(this).prop('checked')) {
						valor = true;				
					}						
					datos = addData(datos, clave, valor);
					totalCampos ++;
				}
				if ( totalCampos == 4) {
					let route = '/customers/registrar';
					if (id != 'new') {
						route = '/customers/editar';
					}
					datos = addData(datos, 'id', id);
					var j = jQuery.noConflict();
					$.ajax({
						url: route,
						type: 'POST',
						data: datos,
						success: function(response) {
						  // Manejar la respuesta exitosa aquí
						  console.log('Petición POST enviada correctamente');
						  console.log(response);
						  location.reload(); 
						},
						error: function(xhr, status, error) {
						  // Manejar errores aquí
						  console.error('Error en la petición POST');
						  console.error(error);
						}
					  });
				}
			});			
		  */
	}	
	function addData(data, clave,valor) {
		if (data == '') {
			data = clave+'='+valor;
		} else {
			data = data+'&'+clave+'='+valor;
		}
		return data;
	}

	function procesarValorSeleccionado(valor){
		let partes = valor.split('-');
		partes[0] = partes[0].trim();
		partes[1] = partes[1].trim();
		partes[1] = partes[1].replace('$','');
		return partes;
	}

	function eliminarProducto(valor){
		let index = productos.indexOf(valor); 
		if (index !== -1) { 
			productos.splice(index, 1); 
		}		
	}
});