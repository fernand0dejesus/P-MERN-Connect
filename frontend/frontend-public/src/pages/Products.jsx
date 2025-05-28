import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: ''
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Error al obtener productos:", response.status);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingProduct
      ? `http://localhost:4000/api/products/${editingProduct._id}`
      : "http://localhost:4000/api/products";
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        resetForm();
        fetchProducts(); // Vuelve a cargar los productos después de guardar/actualizar
      } else {
        console.error("Error al guardar el producto:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchProducts();
        } else {
          console.error("Error al eliminar el producto");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString()
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', stock: '' });
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            Nuevo Producto
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900">Gestión de Productos</h1>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Precio
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition duration-200"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition duration-200"
                  rows="4"
                ></textarea>
              </div>
              <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-base px-6 py-2 rounded-lg shadow-sm transition duration-300 ease-in-out"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white text-base px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  {editingProduct ? 'Actualizar Producto' : 'Guardar Producto'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 tracking-wider">Nombre</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 tracking-wider">Descripción</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 tracking-wider">Precio</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 tracking-wider">Stock</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-green-50'} hover:bg-green-100 transition duration-150 ease-in-out`}>
                  <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-800">{product.name}</td>
                  <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-600">{product.description}</td>
                  <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-800">${product.price.toFixed(2)}</td>
                  <td className="px-5 py-4 border-b border-gray-200 text-sm text-gray-800">{product.stock}</td>
                  <td className="px-5 py-4 border-b border-gray-200 text-sm space-x-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-emerald-600 hover:text-emerald-800 font-medium transition duration-150 ease-in-out"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800 font-medium transition duration-150 ease-in-out"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;