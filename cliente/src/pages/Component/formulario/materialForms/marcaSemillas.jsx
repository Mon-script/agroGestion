import React, { useState } from 'react';
import { Form, Input, Button, message,Skeleton } from 'antd';
import MaterialCard from '../../tarjetas/materialCard';


const MarcaSemillaForm = ({data,actualizarMateriales}) => {
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);

  // Función para manejar el envío del formulario
  const handleAddMarcaSemilla = async (values) => {
    try {
      const response = await fetch('/api/marca-semilla', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_marca: values.nombre_marca,
          detalle: values.detalle,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        message.success('Marca de semilla creada con éxito');
        form.resetFields();
        setShowForm(false);
      } else {
        const errorData = await response.json();
        message.error(`Error: ${errorData.message || 'No se pudo crear la marca de semilla'}`);
      }
    } catch (error) {
      message.error('Error al crear la marca de semilla');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-4">
      <div className="bg-gray-100 p-4 shadow-md w-full flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-green-700">Agregar Marca de Semilla Aquí!</h2>
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
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAddMarcaSemilla}
              className="space-y-4"
            >
              <Form.Item
                label="Nombre de la Marca"
                name="nombre_marca"
                rules={[{ required: true, message: 'Por favor ingrese el nombre de la marca' }]}
              >
                <Input placeholder="Ingresa el nombre de la marca" />
              </Form.Item>

              <Form.Item
                label="Detalle"
                name="detalle"
                rules={[{ required: true, message: 'Por favor ingrese un detalle' }]}
              >
                <Input.TextArea rows={4} placeholder="Ingresa el detalle de la marca" />
              </Form.Item>

              <div className="flex justify-between mt-4">
                <Button ghost type="primary" htmlType="submit">
                  Agregar
                </Button>
                <Button onClick={() => setShowForm(false)}>
                  Salir
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
      {!showForm && (<div className="w-full mt-6 flex flex-wrap gap-4">
                {data.length > 0 ? (
                    data.map((item) => (
                        <MaterialCard key={item.id} data={item} actualizarSiembra={actualizarMateriales} Form={MarcaSemillaForm}/>
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

export default MarcaSemillaForm;
