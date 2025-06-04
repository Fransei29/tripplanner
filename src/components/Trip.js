'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const Trip = () => {
  // Estado para almacenar el nombre del nuevo viaje y la lista de viajes
  const [name, setName] = useState('');
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);  // Estado para manejar el estado de carga
  const [error, setError] = useState(''); // Estado para manejar los errores

  // Función para crear un nuevo viaje
  const createTrip = async () => {
    try {
      setLoading(true);  // Iniciar el estado de carga
      await axios.post('/api/trips', { name }); // Enviar una solicitud POST al servidor para crear un nuevo viaje
      fetchTrips(); // Volver a obtener la lista de viajes después de crear uno nuevo
      setName('');  // Limpiar el campo de entrada
      setError('');  // Limpiar cualquier error anterior
    } catch (error) {
      setError('Error creando el viaje: ' + (error.response?.data?.message || error.message)); // Mostrar el error
      console.error('Error creando el viaje:', error);
    } finally {
      setLoading(false);  // Finalizar el estado de carga
    }
  };

  // Función para obtener la lista de viajes
  const fetchTrips = async () => {
    try {
      setLoading(true);  // Iniciar el estado de carga
      const response = await axios.get('/api/trips');  // Enviar una solicitud GET al servidor para obtener todos los viajes
      setTrips(response.data.trips);  // Actualizar el estado con la lista de viajes obtenida
      setError('');  // Limpiar cualquier error anterior
    } catch (error) {
      setError('Error obteniendo los viajes: ' + (error.response?.data?.message || error.message));  // Mostrar el error
      console.error('Error obteniendo los viajes:', error);
    } finally {
      setLoading(false);  // Finalizar el estado de carga
    }
  };

  // useEffect se ejecuta después de que el componente se monta, para obtener la lista de viajes al inicio
  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className="trip-container">
      <div className="trip-inputs">
        <h2><FontAwesomeIcon className="icons" icon={faPlane} /> Trips</h2>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter trip name"
        />
        <button onClick={createTrip} disabled={loading}>
          {loading ? 'Creating...' : 'Create New Trip'}
        </button>

        {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
      </div>

      <div className="trip-list">
        <h2 className='title-trips'><FontAwesomeIcon className="icons" icon={faMapMarkerAlt} /> Your Trips</h2>
        <ul>
          {trips?.map((trip) => (
            <li key={trip._id}>{trip.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Trip;

