import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const TipoSemillaForm = () => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);

  const handleAddTipoSemilla = async (values) => {
    try {
      const response = await fetch('/api/tipo-semilla', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_semilla: values.nombre_semilla,
          detalle_semilla: values.detalle_semilla,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        message.success('Tipo de semilla creado con éxito');
        form.resetFields();
        setShowForm(false);
      } else {
        const errorData = await response.json();
        message.error(`Error: ${errorData.message || 'No se pudo crear el tipo de semilla'}`);
      }
    } catch (error) {
      message.error('Error al crear el tipo de semilla');
    }
  };

  return (
    <div>
      <h2>Agregar Tipo de Semilla</h2>
      <Button onClick={() => setShowForm(true)} hidden={showForm}>Agregar</Button>
      {showForm && (
        <Form form={form} layout="vertical" onFinish={handleAddTipoSemilla}>
          <Form.Item label="Nombre de la Semilla" name="nombre_semilla" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Detalle de la Semilla" name="detalle_semilla" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">Agregar</Button>
          <Button onClick={() => setShowForm(false)}>Salir</Button>
        </Form>
      )}
    </div>
  );
};

export default TipoSemillaForm;
