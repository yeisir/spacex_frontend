import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TimeChartComponent() {
  const [launchData, setLaunchData] = useState([]);
  
  // Obtener los datos de DynamoDB
  const fetchData = async () => {
    try {
      const response = await axios.get('http://ec2-3-147-69-118.us-east-2.compute.amazonaws.com:3001/api/launches'); // Reemplaza con la URL de tu API
      const data = response.data;
      // Procesamos los datos para agruparlos por año y contar el número de éxitos, fracasos y próximos
      const groupedData = processData(data);
      setLaunchData(groupedData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // Función para procesar los datos y agruparlos por año
  const processData = (data) => {
    const yearData = {};

    // Agrupar los datos por año
    data.forEach((item) => {
      const year = new Date(item.launch_date).getFullYear();
      if (!yearData[year]) {
        yearData[year] = { success: 0, failed: 0, upcoming: 0 };
      }

      if (item.status === 'success') {
        yearData[year].success += 1;
      } else if (item.status === 'failed') {
        yearData[year].failed += 1;
      } else if (item.status === 'upcoming') {
        yearData[year].upcoming += 1;
      }
    });

    // Transformar los datos en un formato adecuado para el gráfico
    return Object.keys(yearData).map((year) => ({
      year: parseInt(year),
      success: yearData[year].success,
      failed: yearData[year].failed,
      upcoming: yearData[year].upcoming,
    }));
  };

  // Cargar los datos cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Performance by Year</h2> {/* Título fuera del gráfico */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={launchData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="success" stroke="#4caf50" strokeWidth={2} />
          <Line type="monotone" dataKey="failed" stroke="#f44336" strokeWidth={2} />
          <Line type="monotone" dataKey="upcoming" stroke="#ffa500" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TimeChartComponent;
