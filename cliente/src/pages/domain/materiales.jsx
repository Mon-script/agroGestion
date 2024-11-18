import React from 'react';
import { Tabs } from 'antd';
import EmpaqueForm from '../Component/formulario/materialForms/empaquetado';
import EstadoForm from '../Component/formulario/materialForms/estado';
import FertilizanteForm from '../Component/formulario/materialForms/tipoFertilizantes';
import MarcaFertilizanteForm from '../Component/formulario/materialForms/marcaFertilizantes';
import TipoSemillaForm from '../Component/formulario/materialForms/tipoSemillas';
import MarcaSemillaForm from '../Component/formulario/materialForms/marcaSemillas';

const onChange = (key) => {
  console.log(`Tab key selected: ${key}`);
};

const items = [
  {
    key: '1',
    label: 'Empaque Form',
    children: <EmpaqueForm />,
  },
  {
    key: '2',
    label: 'Estado Form',
    children: <EstadoForm />,
  },
  {
    key: '3',
    label: 'Tipo Fertilizante Form',
    children: <FertilizanteForm />,
  },
  {
    key: '4',
    label: 'Marca Fertilizante Form',
    children: <MarcaFertilizanteForm />,
  },
  {
    key: '5',
    label: 'Tipo Semilla Form',
    children: <TipoSemillaForm />,
  },
  {
    key: '6',
    label: 'Marca Semilla Form',
    children: <MarcaSemillaForm />,
  },
];

const MaterialesPanel = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
export default MaterialesPanel;
