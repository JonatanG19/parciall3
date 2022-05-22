//Definición de variables
const url = 'http://127.0.0.1:3050/profesores'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalProfesores = new bootstrap.Modal(document.getElementById('modalProfesores'))
const formProfesores = document.querySelector('form')
const nombre = document.getElementById('nombre')
const correo = document.getElementById('correo')
const telefono = document.getElementById('telefono')
const fechaHora = document.getElementById('fechaHora')
const estado = document.getElementById('estado')
var opcion = ''

btnCrear.addEventListener('click', ()=>{
    nombre.value = ''
    correo.value = ''
    telefono.value = ''
    fechaHora.value = ''
    estado.value = ''
    modalProfesores.show()
    opcion = 'crear'
})

//funcion para mostrar los resultados
const mostrar = (profesores) => {
    profesores.forEach(profesor => {
        resultados += `<tr>
                            <td>${profesor.id_profesor}</td>
                            <td>${profesor.nombre}</td>
                            <td>${profesor.correo}</td>
                            <td>${profesor.telefono}</td>
                            <td>${profesor.fechaHora}</td>
                            <td>${profesor.estado}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados
    
}

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

  
const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id_profesor = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.", 
    function a (){
        fetch(url+id_profesor, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
        //alertify.success('Ok')
    },
    function(){
        alertify.error('Cancel')
    })
})

//Procedimiento Editar
let id_profesorForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    id_profesorForm = fila.children[0].innerHTML
    const nombreForm = fila.children[1].innerHTML
    const correoForm = fila.children[2].innerHTML
    const telefonoForm = fila.children[3].innerHTML
    const fechaHoraForm = fila.children[4].innerHTML
    const estadoForm = fila.children[5].innerHTML
    nombre.value =  nombreForm
    correo.value =  correoForm
    telefono.value =  telefonoForm
    fechaHora.value =  fechaHoraForm
    estado.value =  estadoForm
    opcion = 'editar'
    modalProfesores.show()
     
})

//Procedimiento para Crear y Editar
formProfesores.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                correo:correo.value,
                telefono:telefono.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoProfesor = []
            nuevoProfesor.push(data)
            mostrar(nuevoProfesor)
        })
    }
    if(opcion=='editar'){    
        //console.log('OPCION EDITAR')
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombre:nombre.value,
                correo:correo.value,
                telefono:telefono.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalProfesores.hide()
})

