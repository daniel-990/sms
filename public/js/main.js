const init = () =>{
    const numeroPropio = document.getElementById("numero-wap");
    const mensaje = document.getElementById("mensaje");
    const destino = document.getElementById("numero");
    //boton enviar
    const btnEnviar = document.getElementById("btn-enviar");

    const enviarMensaje = (event) => {
        event.preventDefault();
        if (destino.value == "" && mensaje.value == ""){
            alert("Todos los datos son obligatorios");
        }else{
            axios.post('/enviarmensaje', {
                mensaje: mensaje.value,
                wap: numeroPropio.value,
                destino: destino.value
              })
              .then(function (response) {
                console.log(`mensaje enviado: ${JSON.stringify(response)}`);
                destino.value = "";
                mensaje.value = "";
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }
    btnEnviar.addEventListener('click', enviarMensaje);
}
init();