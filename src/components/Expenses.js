import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Expense = () => {
  // Estado para almacenar el nombre del viaje, monto del gasto y la lista de gastos
  const [trip, setTrip] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);

  // Función para crear un nuevo gasto
  const createExpense = async () => {
    try {
      await axios.post('http://localhost:3000/expense', {       // Enviar una solicitud POST al servidor para crear un nuevo gasto
        trip,
        amount: parseFloat(amount),
      });
      fetchExpenses();  // Volver a obtener la lista de gastos después de crear uno nuevo
      setTrip('');      // Limpiar el campo de entrada después de crear el gasto
      setAmount('');    // Limpiar el campo de entrada después de crear el gasto
    } catch (error) {
      console.error('Error creando el gasto:', error);
    }
  };

  // Función para obtener la lista de gastos para un viaje específico
  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:3000/expenses', {       // Enviar una solicitud GET al servidor para obtener todos los gastos del viaje especificado
        params: { trip },
      });
      setExpenses(response.data.expenses);   // Actualizar el estado con la lista de gastos obtenida
    } catch (error) {
      console.error('Error obteniendo los gastos:', error);
    }
  };

  // useEffect se ejecuta cuando el valor de 'trip' cambia, para obtener los gastos del viaje actual
  useEffect(() => {
    if (trip) {
      fetchExpenses();
    }
  }, );

  return (
    <div className="box"> 
      <h2>Gastos</h2>
      {/* Formulario para especificar el viaje y crear un nuevo gasto */}
      <input
        type="text"
        value={trip}
        onChange={(e) => setTrip(e.target.value)}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Monto"
      />
      <button onClick={createExpense}>Crear Gasto</button>
      {/* Lista de gastos */}
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.amount} - {expense.trip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expense;
