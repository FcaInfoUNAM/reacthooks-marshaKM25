import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";  // <-- Agrega esta línea

function ProductDescription() {
  const { id } = useParams();  // ahora ya tienes useParams disponible
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log("Producto recibido:", data);
        setProduct(data);
      })
      .catch(error => console.error("Error al obtener el producto:", error));
  }, [id]);

  if (!product) {
    return <p className="p-4">Cargando producto...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded shadow dark:bg-gray-800 dark:text-white">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-contain mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="mb-2 text-gray-700 dark:text-gray-300">{product.description}</p>
      <p className="text-lg font-semibold text-indigo-600">${product.price}</p>
      <p className="mt-2 italic text-sm">Categoría: {product.category}</p>
      <p className="mt-2 text-sm">
        Valoración: ⭐ {product.rating.rate} ({product.rating.count} opiniones)
      </p>
    </div>
  );
}

export default ProductDescription;
