// Politicas de privacidad 
function policies() {
  window.open("policies.html", "POLITICAS DE PRIVACIDAD",
  "toolbar=no, location=no, directories=no, status=no, menubar=no, \
  scrollbars=no, resizable=no, copyhistory=no, width=400, height=200");
}

// Validaciones de formularios de consulta y suscripcion
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("formContact") != null) {
    document.getElementById("formContact").addEventListener('submit', validateForm);    
  }

  if (document.getElementById("formSuscript") != null) {
    document.getElementById("formSuscript").addEventListener('submit', validateSuscrip);
  }
});

const expresions = {
	e_name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	e_mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

// Validacion de Formulario de Consulta
async function validateForm(event) {

  event.preventDefault();
  
  var name = this.name.value;
  if(!expresions.e_name.test(name)) {
    swal({title: "", text: "Por favor ingrese un nombre con caracteres válidos", icon:"error", dangerMode: true})
    return;
  }  

  var email = this.email.value;
  if(!expresions.e_mail.test(email)) {
      swal({title: "", text: "Por favor ingrese un e-mail con formato válido", icon:"error", dangerMode: true})
    return;
  }

  var msg = this.message.value;
  if (msg.length == 0) {
    swal({title: "", text: "Por favor ingrese su mensaje", icon:"error", dangerMode: true})
    return;
  }

  var policies = this.policies.checked;
  if (policies == false) {
    swal({title: "", text: "Debe aceptar las políticas de privacidad", icon:"error", dangerMode: true})
    return;
  }

  const form = new FormData(this)
  var response = await fetch(this.action, {
    method: this.method, 
    body: form, 
    headers: {'Accept': 'application/json'}}
    )

  if(response.ok){
    this.reset()
    swal({title: "¡Gracias por escribirnos!", text: "Te responderemos a la brevedad", icon:"success"})
  } else {
    this.reset()
    swal({title: "No se pudo enviar el correo", text: "", icon:"error"})
  }
} 

// Validacion de Formulario de Suscripcion
function validateSuscrip(event) {
  event.preventDefault();

  var name = this.name.value;
  if(!expresions.e_name.test(name)) {
    swal({title: "", text: "Por favor ingrese un nombre con caracteres válidos", icon:"error", dangerMode: true})
    return;
  }  

  var email = this.email.value;
  if(!expresions.e_mail.test(email)) {
      swal({title: "", text: "Por favor ingrese un e-mail con formato válido", icon:"error", dangerMode: true})
    return;
  }

  var policies = this.policies.checked;
  if (policies == false) {
    swal({title: "", text: "Debe aceptar las políticas de privacidad", icon:"error", dangerMode: true})
    return;
  }

  this.reset()
  swal({title: "¡Gracias por suscribirte!", text: "", icon:"success"})
}

// Tarjeta de viaje: la función crea el HTML recorriendo el array data_travel almacenado en data.js
function travelCard() {
  var card=`
    <div class="main-lista">
    `
    for(let i=0; i< data_travel.length ; i++)
    {
      card += `
        <div class="travel-card">
          <a href="traveldtl.html?viewDetail=${data_travel[i].id}">
            <img class="img-travel" src="${data_travel[i].travelImage}" alt="foto">
            <p>${data_travel[i].travelName}</p>
          </a>
        </div>
        `
    }       
    card+=`
    </div>
  `
  return(card)
}
  
// Obtener parametros de url: recupera el valor del parámetro VIEWDETAIL de la url para crear el HTML de detalle de viajes
var url = window.location.href; //Recupera el valor de la url actual
url = url.toUpperCase(); //Convierte url a mayusculas

function selectDetail(variable) //Función para obtener el valor de la variable VIEWDETAIL
{
  var variable_upper = variable.toUpperCase(); //Convierte la variable a mayusculas
  var variable_pos = url.indexOf(variable_upper); //Busca la posición donde comienza la variable en la url

  if (variable_pos != -1) //Si encuenta la posicion de la variable pasada en la url ingresa al if
  {return url.substring(variable_pos + variable_upper.length + 1, url.length);} //Devuelve el valor que servirá como indice del array de viajes
  else {return "NO_ENCONTRADO";}
}
  
// Detalle de viaje: la función crea el HTML recorriendo el array data_travel almacenado en data.js y en base al parametro VIEWTRAVEL pasado en la url
function travelDetail(i) {
var detail=`
  <div class="contact-data">
    <img src="${data_travel[i].travelDtlImg}" width="100%" height="100%" alt="foto">
  </div>
  <div class="travel-detail">
    <h4>Visitando: ${data_travel[i].travelDetail}</h4>
    <p class="text-detail">El viaje incluye:</p>
    <ul>
      <li><p>* Acompañamiento, asistencia y coordinación durante todo el viaje.</p></li>
      <li><p>* Alojamiento en hoteles 4 estrellas, en habitación standard Doble/Twin para ${data_travel[i].travelNights} noches con desayuno.</p></li>
      <li><p>* Excursiones, traslados y entradas a templos y monumentos indicados.</p></li>
      <li><p>* Ticket aéreo/tren para los tramos internos.</p></li>
    </ul>
    <p class="text-detail">No incluye:</p>
    <ul>
      <li><p>* Ticket aéreo internacional.</p></li>
      <li><p>* Seguro de asistencia al viajero (obligatorio para realizar el viaje).</p></li>
      <li><p>* Gastos personales y/o gastos de índole administrativa que pudieran surgir al momento de realizar el pago de los servicios.</p></li>
      <li><p>* Comidas no especificadas en el itinerario ni propinas.</p></li>
    </ul>
    <div class="main-container">
      <a href="contact.html"><p class="text-detail" align="left">CONSULTANOS POR ESTE VIAJE</p></a>
      <a href="travels.html"><p class="text-return" align="right">&ltVolver&gt</p></a>
    </div>
  </div>
  `
  return(document.getElementById("main-detail").innerHTML=detail)
}

// Tarjeta de razones para viajar: la función crea el HTML recorriendo el array data_reason almacenado en data.js
function reasonCard() {
  var reason=`
    <div class="title-reason"><p>¡descubrí por que viajar con nosotros!</p></div>
    <div class="main-container">
      <div class="main-lista">
    `
    for(let i=0; i< data_reason.length ; i++)
    {
      reason += `
        <div class="reason-card">
          <a href="">                        
              <aside>
                  <img class="front" src="./img/fondo_card_buda.jpg" alt="reason"/>
                  <section class="back">
                      <h2>${data_reason[i].reasonName}</h2>
                      <hr>
                      <p>${data_reason[i].reasonDetail}</p>
                  </section>
              </aside>
          </a>
        </div>
    `
    }       
    reason+=`
      </div>
    </div>
  `
  return(reason)
}

// Carrousel
function carrousel(){
  var carrousel= `
              <ul>
              `
              for(let i=0; i<6; i++)
              {
              carrousel+= `
                <li><img src="./img/slide_1.jpg" alt=""></li>
              `
              }
              carrousel+= `  
            </ul>
            `
  return(carrousel)
}