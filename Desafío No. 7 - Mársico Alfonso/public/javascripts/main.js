let socket = io.connect();

const input = document.getElementById("chat-input");
const email = document.getElementById("email-input");
const articulo = document.getElementById("articulo-input");
const precio = document.getElementById("precio-input");
const miniatura = document.getElementById("miniatura-input");

//--> recibo del server
socket.on("mensajes", function (msjs) {
  document.getElementById("msjs").innerHTML = msjs
    .map(
      (msj) =>
        `<span style="color:blue"><b>${msj.email}</b></span> <span style="color:brown">[ ${msj.fyh}]</span>: <span style="font-family:italic; color:green">${msj.mensaje}</span>`
    )
    .join("<br>");
});

socket.on("productos", (arts) => {

  /* fetch('http://localhost:8080/tablita.ejs')
    .then(function(response) {
        // When the page is loaded convert it to text
        return response.text()
    })
    .then(function(ejs) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(ejs, "text/html");
        document.getElementById("arts").innerHTML = doc.body.innerHTML
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    }); */

  document.getElementById("arts").innerHTML =  arts
    .map(
      (art) =>
        ` <tr><td>${art.title}</td><td>$${art.price}</td><td><img class="medicine"
          src="https://cdn1.iconfinder.com/data/icons/medical-2-19/512/medical-healthcare-hospital-12-512.png">
          </td></tr> `
    )
    .join("<br>");
});
//<--

//--> envuio al server
document.getElementById("chat-btn").addEventListener("click", () => {
  const fyh = new Date().toLocaleString();
  email.value
    ? socket.emit("mensaje", { msj: input.value, email: email.value, fyh: fyh })
    : alert("Debe ingresar su email");
});

document.getElementById("form-btn").addEventListener("click", () => {
  socket.emit("producto", {
    title: articulo.value,
    price: precio.value,
    thumbnail: miniatura.value,
  });
});
//<--
