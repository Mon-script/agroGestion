import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { EditOutlined, EllipsisOutlined, SendOutlined } from '@ant-design/icons';
import { CosechaModalForm } from '../formulario/cosechaFormModal';


const Smodal = ({siembra}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button danger type="primary" onClick={showModal}>
      <SendOutlined/>Cosechar
      </Button>
      <Modal title="Cosechar" centered open={isModalOpen} onCancel={handleCancel}
      footer={[
        <Button>Cosechar</Button>,
        <Button danger type='primary' onClick={handleCancel}>Cancelar</Button>
      ]
      } >
        <h2>Para cosechar debe rellenar los datos faltantes de cosecha</h2>
        <CosechaModalForm siembra={siembra}/>
      </Modal>
    </>
  );
};
export default Smodal;