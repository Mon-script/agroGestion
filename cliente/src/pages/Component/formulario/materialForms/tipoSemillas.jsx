import React, { useState } from 'react';
import { Form, Input, Button, message,Skeleton } from 'antd';
import MaterialCard from '../../tarjetas/materialCard';


const TipoSemillaForm = ({data,actualizarMateriales}) => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);

  const handleAddTipoSemilla = async (values) => {
    try {
      const response = await fetch('http://localhost:3000/post/tiposemilla/save', {
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
    <div className="min-h-screen flex flex-col items-center pt-4">
      <div className="bg-gray-100 p-4 shadow-md w-full flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-green-700">Agregar su Semilla Aquí!</h2>
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
        <Form form={form} layout="vertical" onFinish={handleAddTipoSemilla}>
          <Form.Item label="Nombre de la Semilla" name="nombre_semilla" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Detalle de la Semilla" name="detalle_semilla" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Ingresa el detalle de tipo de semillas" />
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
                        <MaterialCard key={item.id} data={item} actualizarSiembra={actualizarMateriales} Form={TipoSemillaForm}/>
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

export default TipoSemillaForm;
