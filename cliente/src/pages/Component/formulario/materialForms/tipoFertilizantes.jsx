import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const FertilizanteForm = () => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);

  const handleAddFertilizante = async (values) => {
    try {
      const response = await fetch('/api/fertilizante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_fertilizante: values.nombre_fertilizante,
          detalle_fertilizante: values.detalle_fertilizante,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        message.success('Fertilizante creado con éxito');
        form.resetFields();
        setShowForm(false);
      } else {
        const errorData = await response.json();
        message.error(`Error: ${errorData.message || 'No se pudo crear el fertilizante'}`);
      }
    } catch (error) {
      message.error('Error al crear el fertilizante');
    }
  };

  return (
    <div>
      <h2>Agregar Fertilizante</h2>
      <Button onClick={() => setShowForm(true)} hidden={showForm}>Agregar</Button>
      {showForm && (
        <Form form={form} layout="vertical" onFinish={handleAddFertilizante}>
          <Form.Item label="Nombre del Fertilizante" name="nombre_fertilizante" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Detalle del Fertilizante" name="detalle_fertilizante" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">Agregar</Button>
          <Button onClick={() => setShowForm(false)}>Salir</Button>
        </Form>
      )}
    </div>
  );
};

export default FertilizanteForm;
