import React, { useState } from 'react';
import { Form, Input, Button, message,Skeleton } from 'antd';
import MaterialCard from '../../tarjetas/materialCard';


const FertilizanteForm = ({data,actualizarMateriales}) => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);

  const handleAddFertilizante = async (values) => {
    try {
      const response = await fetch('http://localhost:3000/post/tipoferti/save', {
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
    <div className="min-h-screen flex flex-col items-center pt-4">
       <div className="bg-gray-100 p-4 shadow-md w-full flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-green-700">Agregar Fertilizante Aquí!</h2>
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
          <Form form={form} layout="vertical" onFinish={handleAddFertilizante}>
          <Form.Item label="Nombre del Fertilizante" name="nombre_fertilizante" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Detalle del Fertilizante" name="detalle_fertilizante" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Ingresa el detalle de tipo de fertilizante"/>
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
                        <MaterialCard key={item.id} data={item} actualizarSiembra={actualizarMateriales} Form={FertilizanteForm}/>
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

export default FertilizanteForm;
