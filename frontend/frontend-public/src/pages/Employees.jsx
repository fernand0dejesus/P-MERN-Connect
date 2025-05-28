import React, { useState, useEffect } from 'react';
// Íconos ya no son necesarios, así que los he comentado o removido si no se usan en otro lugar.
// import { FaUsers, FaPlus, FaEdit, FaTrash, FaEnvelope, FaPhone } from 'react-icons/fa';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    birthday: '',
    email: '',
    address: '',
    hireDate: '',
    password: '',
    telephone: '',
    dui: '',
    isssNumber: ''
  });

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/employees");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingEmployee
      ? `http://localhost:4000/api/employees/${editingEmployee._id}`
      : "http://localhost:4000/api/employees";

    const method = editingEmployee ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Datos enviados exitosamente.");
        resetForm();
        fetchEmployees();
      } else {
        const errorData = await response.json();
        console.error("Error al guardar empleado:", response.status, errorData);
        alert(`Error al guardar empleado: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error en la conexión con el servidor.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este empleado? Esta acción no se puede deshacer.')) {
      try {
        const response = await fetch(`http://localhost:4000/api/employees/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchEmployees();
          alert('Empleado eliminado exitosamente.');
        } else {
          const errorData = await response.json();
          console.error("Error al eliminar el empleado:", response.status, errorData);
          alert(`Error al eliminar empleado: ${errorData.message || response.statusText}`);
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Error en la conexión al eliminar empleado.");
      }
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      lastName: employee.lastName,
      birthday: employee.birthday ? employee.birthday.split('T')[0] : '',
      email: employee.email,
      address: employee.address,
      hireDate: employee.hireDate ? employee.hireDate.split('T')[0] : '',
      password: '',
      telephone: employee.telephone,
      dui: employee.dui,
      isssNumber: employee.isssNumber
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      lastName: '',
      birthday: '',
      email: '',
      address: '',
      hireDate: '',
      password: '',
      telephone: '',
      dui: '',
      isssNumber: ''
    });
    setEditingEmployee(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-8 font-inter">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-10">
          {/* Botón "Nuevo Empleado" con color verde */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md flex items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Nuevo Empleado
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
            Gestión de Empleados
          </h1>
        </div>

        {showForm && (
          <div className="bg-gray-50 rounded-xl shadow-inner p-8 mb-10 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingEmployee ? 'Editar Empleado' : 'Registrar Nuevo Empleado'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Apellido</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Teléfono</label>
                <input
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Fecha de Nacimiento</label>
                <input
                  type="date"
                  value={formData.birthday}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Fecha de Contratación</label>
                <input
                  type="date"
                  value={formData.hireDate}
                  onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">DUI</label>
                <input
                  type="text"
                  value={formData.dui}
                  onChange={(e) => setFormData({ ...formData, dui: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">Número ISSS</label>
                <input
                  type="text"
                  value={formData.isssNumber}
                  onChange={(e) => setFormData({ ...formData, isssNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base transition duration-200"
                  required
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Dirección</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base transition duration-200 h-24 resize-y"
                  required
                ></textarea>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Contraseña {editingEmployee && <span className="font-normal text-gray-500 text-xs">(Dejar vacío para mantener la actual)</span>}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base transition duration-200"
                  required={!editingEmployee}
                />
              </div>
              <div className="md:col-span-2 lg:col-span-3 flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-sm transition duration-300 ease-in-out"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  {editingEmployee ? 'Actualizar Empleado' : 'Guardar Empleado'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider">Nombre</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider">Teléfono</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider">DUI</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee, index) => (
                <tr key={employee._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition duration-150 ease-in-out`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {employee.name} {employee.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {employee.telephone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {employee.dui}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out px-3 py-1 rounded-md border border-blue-600 hover:border-blue-800"
                      title="Editar empleado"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out px-3 py-1 rounded-md border border-red-600 hover:border-red-800"
                      title="Eliminar empleado"
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

export default Employees;