import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const EstadoForm = () => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);

  const handleAddEstado = async (values) => {
    try {
      const response = await fetch('/api/estado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_estado: values.nombre_estado,
          detalle_estado: values.detalle_estado,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        message.success('Estado creado con éxito');
        form.resetFields();
        setShowForm(false);
      } else {
        const errorData = await response.json();
        message.error(`Error: ${errorData.message || 'No se pudo crear el estado'}`);
      }
    } catch (error) {
      message.error('Error al crear el estado');
    }
  };

  return (
    <div>
      <h2>Agregar Estado</h2>
      <Button onClick={() => setShowForm(true)} hidden={showForm}>Agregar</Button>
      {showForm && (
        <Form form={form} layout="vertical" onFinish={handleAddEstado}>
          <Form.Item label="Nombre del Estado" name="nombre_estado" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Detalle del Estado" name="detalle_estado" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">Agregar</Button>
          <Button onClick={() => setShowForm(false)}>Salir</Button>
        </Form>
      )}
    </div>
  );
};

export default EstadoForm;
