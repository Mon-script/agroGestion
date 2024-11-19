import React, { useState } from 'react';
import { Form, Input, Button, message,Skeleton } from 'antd';
import MaterialCard from '../../tarjetas/materialCard';

const EmpaqueForm = ({data,actualizarMateriales}) => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);

  const handleAddEmpaque = async (values) => {
    
    try {
      console.log('Valores del formulario:', values);
      console.log(values.nombre_empaque, values.detalle_empaque,);
      const response = await fetch('http://localhost:3000/post/empaque/save', {
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
        actualizarMateriales(true)
        setShowForm(false);
      } else {
        const errorData = await response.json();
        message.error(`Error: ${errorData.message || 'No se pudo crear el empaque'}`);
      }
    } catch (error) {
      message.error('Error al crear el empaque');
    }
    console.log(nombre_empaque,detalle_empaque)
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-4">
       <div className="bg-gray-100 p-4 shadow-md w-full flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-green-700">Agregar Marca de Fertilizante Aquí!</h2>
        <Button
        ghost
          type="primary"
          onClick={() => {
            setShowForm(true);
            form.resetFields();
          }}
          hidden={showForm}
        >
          Agregar
        </Button>
      </div>
      {showForm && (
        <div className="flex flex-col items-center justify-center w-full mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          <Form form={form} layout="vertical" onFinish={handleAddEmpaque}>
          <Form.Item label="Nombre del Empaque" name="nombre_empaque" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Detalle del Empaque" name="detalle_empaque" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Ingresa el detalle de empaquetado" />
          </Form.Item>
          <div className="flex justify-between mt-4">
          <Button ghost type="primary" htmlType="submit">Agregar</Button>
          <Button onClick={() => setShowForm(false)}>Salir</Button>
          </div>
          
        </Form>
          </div>
        </div>
        
      )}
      {!showForm && (<div className="w-full mt-6 flex flex-wrap gap-4">
                {data.length > 0 ? (
                    data.map((item) => (
                        <MaterialCard key={item.id} data={item} actualizarSiembra={actualizarMateriales} CustomForm={EmpaqueForm} />
                    ))
                ) : (
                  <>
                  <Skeleton active />
                  <Skeleton active/>
                  </>
                )}
            </div>)}
    </div>
  );
};

export default EmpaqueForm;
