$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
	let tipo = '';
	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
		tipo = 'new';
        var row = '<tr id="new">' +            
            '<td><input type="text" class="form-control" name="nombre" id="nombre"></td>' +
            '<td><input type="text" class="form-control" name="valor" id="valor"></td>' +
            '<td><input  type="checkbox" value="" name="estado" id="estado" checked></td>' +
			'<td>' + actions + '</td>' +
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
	// Add row on add button click
	$(document).on("click", ".add", function() {
		var empty = false;
		var input = $(this).parents("tr").find('input[type="text"]');
		let allInputs  = $(this).parents("tr").find('input');
		let id  = $(this).parents("tr").attr('id');
		let checkbox = $(this).parents("tr").find('input[type="checkbox"]');
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
			agregarEditarProducto(allInputs, id);
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
		let claves = ['nombre','valor', 'estado']
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
		eliminarProducto(id);
    });

	function agregarEditarProducto(allInputs, id) {	
			let datos = '';
			let clave = '';
			let valor = '';	
			let totalCampos = 0;  
			allInputs.each( function(){
				if ($(this).attr('type') == 'text') {
					clave = $(this).attr("id");									
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
				if ( totalCampos == 3) {
					let route = '/ventasMvc/products/registrar';
					if (id != 'new') {
						route = '/ventasMvc/products/editar';
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
		  
	}	
	function addData(data, clave,valor) {
		if (data == '') {
			data = clave+'='+valor;
		} else {
			data = data+'&'+clave+'='+valor;
		}
		return data;
	}
	function eliminarProducto(id) {							
		var j = jQuery.noConflict();
		$.ajax({
			url: '/ventasMvc/products/eliminar',
			type: 'POST',
			data: 'id='+id,
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