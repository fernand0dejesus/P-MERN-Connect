import React, { useState, useEffect } from 'react';
// Icons are not needed, so they remain removed from import.

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    telephone: '',
    schedule: ''
  });

  const fetchBranches = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/branches");
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingBranch
        ? `http://localhost:4000/api/branches/${editingBranch._id}`
        : "http://localhost:4000/api/branches";

      const method = editingBranch ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      fetchBranches();
      resetForm();
    } catch (error) {
      console.error("Error saving branch:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta sucursal?')) {
      try {
        await fetch(`http://localhost:4000/api/branches/${id}`, {
          method: 'DELETE',
        });
        fetchBranches();
      } catch (error) {
        console.error("Error deleting branch:", error);
      }
    }
  };

  const handleEdit = (branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address,
      telephone: branch.telephone,
      schedule: branch.schedule
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', address: '', telephone: '', schedule: '' });
    setEditingBranch(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        {/* Botón "Nueva Sucursal" con un verde estándar */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
        >
          Nueva Sucursal
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          Sucursales
        </h1>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingBranch ? 'Editar Sucursal' : 'Nueva Sucursal'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
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
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Teléfono
              </label>
              <input
                type="text"
                value={formData.telephone}
                onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition duration-200"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Dirección
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition duration-200"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Horario
              </label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base transition duration-200"
                placeholder="Ej: Lunes a Viernes 8:00 AM - 6:00 PM"
                required
              />
            </div>
            <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-2 rounded-lg shadow-sm transition duration-300 ease-in-out"
              >
                Cancelar
              </button>
              {/* Botón Guardar/Actualizar ahora verde */}
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5"
              >
                {editingBranch ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div key={branch._id} className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 transition duration-200 ease-in-out hover:shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-800">{branch.name}</h3>
              <div className="flex space-x-3">
                {/* Botones de acción de la tarjeta ahora verdes */}
                <button
                  onClick={() => handleEdit(branch)}
                  className="text-green-600 hover:text-green-800 font-medium transition duration-150 ease-in-out px-2 py-1 rounded-md border border-green-600 hover:border-green-800"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(branch._id)}
                  className="text-red-600 hover:text-red-800 font-medium transition duration-150 ease-in-out px-2 py-1 rounded-md border border-red-600 hover:border-red-800"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="space-y-3 text-gray-700 text-sm">
              <p><strong>Dirección:</strong> {branch.address}</p>
              <p><strong>Teléfono:</strong> {branch.telephone}</p>
              <p><strong>Horario:</strong> {branch.schedule}</p>
            </div>
          </div>
        ))}
      </div>

      {branches.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-600 mt-8">
          <p className="text-lg"></p>
        </div>
      )}
    </div>
  );
};

export default Branches;