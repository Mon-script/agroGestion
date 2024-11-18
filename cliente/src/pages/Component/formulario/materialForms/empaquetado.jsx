import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const EmpaqueForm = () => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);

  const handleAddEmpaque = async (values) => {
    try {
      const response = await fetch('/api/empaque', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_empaque: values.nombre_empaque,
          detalle_empaque: values.detalle_empaque,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        message.success('Empaque creado con éxito');
        form.resetFields();
        setShowForm(false);
      } else {
        const errorData = await response.json();
        message.error(`Error: ${errorData.message || 'No se pudo crear el empaque'}`);
      }
    } catch (error) {
      message.error('Error al crear el empaque');
    }
  };

  return (
    <div>
      <h2>Agregar Empaque</h2>
      <Button onClick={() => setShowForm(true)} hidden={showForm}>Agregar</Button>
      {showForm && (
        <Form form={form} layout="vertical" onFinish={handleAddEmpaque}>
          <Form.Item label="Nombre del Empaque" name="nombre_empaque" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Detalle del Empaque" name="detalle_empaque" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">Agregar</Button>
          <Button onClick={() => setShowForm(false)}>Salir</Button>
        </Form>
      )}
    </div>
  );
};

export default EmpaqueForm;
