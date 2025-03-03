import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DateFilter from './DateFilter';
import axios from 'axios';

function RecoveryAttemptsChart() {
  const [launchData, setLaunchData] = useState([]);
  const [recoveryData, setRecoveryData] = useState([]);
  const [availableYears, setAvailableYears] = useState([]); // Para almacenar los años con intentos de recuperación
  const [selectedYear, setSelectedYear] = useState(null); // Para almacenar el año seleccionado

  // Obtener los datos de DynamoDB
  const fetchData = async () => {
    try {
      const response = await axios.get('http://ec2-3-147-69-118.us-east-2.compute.amazonaws.com:3001/api/launches'); // Reemplaza con la URL de tu API
      setLaunchData(response.data);

      // Filtrar años con intentos de recuperación
      const yearsWithRecoveryAttempts = Array.from(new Set(response.data
        .filter(item => item.recovery_attempt) // Filtramos los que tienen intento de recuperación
        .map(item => new Date(item.launch_date).getFullYear()) // Extraemos el año de la fecha de lanzamiento
      ));

      // Ordenar los años de manera ascendente
      yearsWithRecoveryAttempts.sort((a, b) => a - b);

      setAvailableYears(yearsWithRecoveryAttempts); // Seteamos los años disponibles

      // Si hay años disponibles, establecer el primero como el año seleccionado por defecto
      if (yearsWithRecoveryAttempts.length > 0) {
        setSelectedYear(yearsWithRecoveryAttempts[0]); // Establecer el primer año como el seleccionado
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedYear !== null) {
      handleDateChange(selectedYear); // Llamar a la función para obtener los datos del primer año seleccionado
    }
  }, [selectedYear]);

  // Manejar el filtro por año
  const handleDateChange = (selectedYear) => {
    const year = parseInt(selectedYear, 10);

    // Inicializar contadores de intentos de recuperación exitosos y totales
    const recoveryCounts = {
      totalAttempts: 0,
      successfulAttempts: 0,
    };

    // Filtrar los lanzamientos por año y contar intentos de recuperación exitosos
    launchData.forEach((item) => {
      if (item.launch_date) {
        const itemYear = new Date(item.launch_date).getFullYear();
        if (itemYear === year) {
          if (item.recovery_attempt) {
            recoveryCounts.totalAttempts++; // Incrementar intentos de recuperación
            if (item.recovered) {
              recoveryCounts.successfulAttempts++; // Incrementar intentos exitosos
            }
          }
        }
      }
    });

    // Preparar los datos para el gráfico de barras
    const recoveryBarData = [
      {
        year: year,
        total: recoveryCounts.totalAttempts,
        successful: recoveryCounts.successfulAttempts,
      }
    ];

    setRecoveryData(recoveryBarData);
  };

  const isEmptyRecoveryData = recoveryData.length === 0;

  return (
    <div>
      <h2>Recovery Attempt and Recovered by year</h2>

      {/* Pasamos los años disponibles y el año seleccionado actual al DateFilter */}
      <DateFilter onDateChange={handleDateChange} availableYears={availableYears} selectedYear={selectedYear} />

      {/* Gráfico de barras para intentos de recuperación exitosos */}
      {!isEmptyRecoveryData ? (
        <BarChart width={720} height={300} data={recoveryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="successful" fill="#1976d2" name="Recovered" />
          <Bar dataKey="total" fill="#ffa500" name="Recovery attempt" />
        </BarChart>
      ) : (
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="18px" fill="#888888">
          No hay datos disponibles para el año seleccionado
        </text>
      )}
    </div>
  );
}

export default RecoveryAttemptsChart;
