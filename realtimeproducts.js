const socket = io();

socket.on("connect", () => {
  console.log("Conexión exitosa al servidor de socket.io");
});

socket.on("messageServer", (data) => {
  console.log(data);
});

// Escucho el evento 'newProduct' para manejar el agregado de un nuevo product
socket.on("newProduct", (product) => {
  // Aquí debes actualizar la vista con el nuevo producto
  console.log(product.data);
  asyncUpdateViewWithNewProduct(product.data);
});

function asyncUpdateViewWithNewProduct(product) {
  try {
    console.log("Producto recibido:", product);

    const productsContainer = document.getElementById("contenedorProducto");

    // Crea un nuevo elemento div para representar el nuevo producto
    const productCard = document.createElement("div");
    productCard.classList.add("card");
    //     <picture>
    //     <img src="/img/${product.thumbnail}" class="card-img-top" alt=${product.title}/>
    // </picture> ESTO NO ESTA ANDANDO
    // agrego la estructura de mi tarjeta de producto utilizando los datos del nuevo producto
    productCard.innerHTML = `

        <div class="card-body">
            <h3 class="card-title">${product.title}</h3>
            <p>COD: ${product.code}</p>
            <p class='precioYCant'>
                Precio: $${product.price} Cantidad: ${product.stock}
            </p>
        </div>
        <button to="/item/${product.id}" class="btn btn2">
            Ver detalle
        </button>
    `;

    // Agrega el nuevo elemento al contenedor de productos
    productsContainer.appendChild(productCard);
  } catch (error) {
    console.error("Error al actualizar la vista:", error);
  }
}
