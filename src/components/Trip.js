import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Trip = () => {
  // Estado para almacenar el nombre del nuevo viaje y la lista de viajes
  const [name, setName] = useState('');
  const [trips, setTrips] = useState([]);

  // Función para crear un nuevo viaje
  const createTrip = async () => {
    try {
      await axios.post('http://localhost:3000/trip', { name }); // Enviar una solicitud POST al servidor para crear un nuevo viaje
      fetchTrips(); // Volver a obtener la lista de viajes después de crear uno nuevo
      setName(''); 
    } catch (error) {
      console.error('Error creando el viaje:', error);
    }
  };

  // Función para obtener la lista de viajes
  const fetchTrips = async () => {
    try {
      const response = await axios.get('http://localhost:3000/trips');  // Enviar una solicitud GET al servidor para obtener todos los viajes
      setTrips(response.data.trips);  // Actualizar el estado con la lista de viajes obtenida
    } catch (error) {
      console.error('Error obteniendo los viajes:', error);
    }
  };

  // useEffect se ejecuta después de que el componente se monta, para obtener la lista de viajes al inicio
  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className="box">
      <h2>Viajes</h2>
      {/* Formulario para crear un nuevo viaje */}
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={createTrip}>Crear Viaje</button>
      {/* Lista de viajes */}
      <ul>
        {trips.map((trip) => (
          <li key={trip._id}>{trip.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Trip;
