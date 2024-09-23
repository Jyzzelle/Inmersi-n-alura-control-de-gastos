//Creación de variables para los gastos y los valores.
let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionGastos = [];

let modoEditar = false; //bandera para saber si estamos editando
let indiceEditar = null; //Esta es la variable para indicar el elemento a modificar

//Esta función se invoca al momento de que el usuario hace click en el 
//boton
function añadirGastos() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGastos = document.getElementById('descripcion').value;

     // Verificar si todos los campos han sido llenados
     if (nombreGasto === "" || valorGasto === "" || descripcionGastos === "") {
        alert("Por favor, llena todos los campos para continuar.");
        return; // Detener la ejecución de la función
    }

    // Cuando estamos editando la información
    if (modoEditar) {
        listaNombresGastos[indiceEditar] = nombreGasto;
        listaValoresGastos[indiceEditar] = valorGasto;
        listaDescripcionGastos[indiceEditar] = descripcionGastos;

        document.getElementById('botonFormulario').textContent = "Agregar Gasto";

        modoEditar = false;
        indiceEditar = null;
    } else {
    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripcionGastos.push(descripcionGastos);
    }

     // verificar si es mayor a $150 dólares
     if (valorGasto > 150) {
        alert('¡El gasto ingresado es mayor a $150! ¿Estás seguro de registrarlo?');
    }

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;
    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGastos = listaDescripcionGastos[posicion];

        htmlLista += `<li>${elemento} - MXN ${valorGasto.toFixed(2)} - ${descripcionGastos}
                    <button onclick="BorrarGasto(${posicion});">Eliminar</button>
                    <button onclick="editarGasto(${posicion});">Editar</button>
                    </li>`;
        //Calculamos el total de gastos 
        totalGastos += Number(valorGasto);
        
    });
    
    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiarCampos();
}

// Función para limpiar los inputs luego de agregar o editar
function limpiarCampos() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcion').value = '';
}

function BorrarGasto(posicion) {
    listaNombresGastos.splice(posicion,1);
    listaValoresGastos.splice(posicion,1);
    listaDescripcionGastos.splice(posicion,1);
    actualizarListaGastos();
}

function editarGasto(posicion) {
    const nuevoNombreGasto = document.getElementById('nombreGasto');
    const nuevoValorGasto = document.getElementById('valorGasto');
    const nuevaDescripcionGasto = document.getElementById('descripcion');

    nuevoNombreGasto.value = listaNombresGastos[posicion];
    nuevoValorGasto.value = listaValoresGastos[posicion];
    nuevaDescripcionGasto.value = listaDescripcionGastos[posicion];

    let botonAgregar = document.getElementById('botonFormulario');
    botonAgregar.textContent = "Actualizar Datos";

    modoEditar = true;
    indiceEditar = posicion;
}