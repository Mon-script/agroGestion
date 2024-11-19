import React, { useContext } from 'react';
import { MaterialContext } from '../../materialContext';
import { Tabs } from 'antd';
import EmpaqueForm from '../Component/formulario/materialForms/empaquetado';
import EstadoForm from '../Component/formulario/materialForms/estado';
import FertilizanteForm from '../Component/formulario/materialForms/tipoFertilizantes';
import MarcaFertilizanteForm from '../Component/formulario/materialForms/marcaFertilizantes';
import TipoSemillaForm from '../Component/formulario/materialForms/tipoSemillas';
import MarcaSemillaForm from '../Component/formulario/materialForms/marcaSemillas';
import RiegoForm from '../Component/formulario/materialForms/riengo';

const mapEntityData = (data, type) => {
  switch (type) {
    case 'ESTADO':
      return data.map(item => ({
        id: item.id_estado,
        nombre: item.nombre_estado,
        detalle: item.detalle_estado,
        activo: item.activo || true, 
      }));
    case 'MARCA_SEMILLA':
      return data.map(item => ({
        id: item.id_marca_semilla,
        nombre: item.nombre_marca,
        detalle: item.detalle,
        activo: item.activo,
      }));
    case 'TIPO_SEMILLA':
      return data.map(item => ({
        id: item.id_tipo_semilla,
        nombre: item.nombre_semilla,
        detalle: item.detalle_semilla,
        activo: item.activo,
      }));
    case 'MARCA_FERTILIZANTE':
      return data.map(item => ({
        id: item.id_marca_fertilizante,
        nombre: item.nombre_marca,
        detalle: item.detalle,
        activo: item.activo,
      }));
    case 'FERTILIZANTE':
      return data.map(item => ({
        id: item.id_fertilizante,
        nombre: item.nombre_fertilizante,
        detalle: item.detalle_fertilizante,
        activo: item.activo,
      }));
    case 'RIEGO':
      return data.map(item => ({
        id: item.id_riego,
        nombre: item.nombre_riego,
        detalle: item.detalle_riego,
        activo: item.activo || true, 
      }));
    case 'EMPAQUE':
      return data.map(item => ({
        id: item.id_empaque,
        nombre: item.nombre_empaque,
        detalle: item.detalle_empaque,
        activo: item.activo || true, 
      }));
    default:
      return [];
  }
};

const onChange = (key) => {
  console.log(`Tab key selected: ${key}`);
};

const MaterialesPanel = () => {
  const {
    semillas,
    marcasSemillas,
    fertilizantes,
    marcasFertilizantes,
    estados,
    riegos,
    empaques,
    setActualizarMateriales,
  } = useContext(MaterialContext);

  // Mapeo de datos para todas las entidades
  const mappedEstados = mapEntityData(estados, 'ESTADO');
  const mappedMarcasSemillas = mapEntityData(marcasSemillas, 'MARCA_SEMILLA');
  const mappedTipoSemillas = mapEntityData(semillas, 'TIPO_SEMILLA');
  const mappedMarcasFertilizantes = mapEntityData(marcasFertilizantes, 'MARCA_FERTILIZANTE');
  const mappedFertilizantes = mapEntityData(fertilizantes, 'FERTILIZANTE');
  const mappedRiegos = mapEntityData(riegos, 'RIEGO');
  const mappedEmpaques = mapEntityData(empaques, 'EMPAQUE');

  const items = [
    {
      key: '1',
      label: 'Empaque',
      children: (
        <EmpaqueForm
          data={mappedEmpaques}
          actualizarMateriales={setActualizarMateriales}
        />
      ),
    },
    {
      key: '2',
      label: 'Estado',
      children: (
        <EstadoForm
          data={mappedEstados}
          actualizarMateriales={setActualizarMateriales}
        />
      ),
    },
    {
      key: '3',
      label: 'Tipo de Fertilizante',
      children: (
        <FertilizanteForm
          data={mappedFertilizantes}
          actualizarMateriales={setActualizarMateriales}
        />
      ),
    },
    {
      key: '4',
      label: 'Marca de Fertilizante',
      children: (
        <MarcaFertilizanteForm
          data={mappedMarcasFertilizantes}
          actualizarMateriales={setActualizarMateriales}
        />
      ),
    },
    {
      key: '5',
      label: 'Tipo de Semilla',
      children: (
        <TipoSemillaForm
          data={mappedTipoSemillas}
          actualizarMateriales={setActualizarMateriales}
        />
      ),
    },
    {
      key: '6',
      label: 'Marca de Semilla',
      children: (
        <MarcaSemillaForm
          data={mappedMarcasSemillas}
          actualizarMateriales={setActualizarMateriales}
        />
      ),
    },
    {
      key: '7',
      label: 'Riego',
      children: (
        <RiegoForm
          data={mappedRiegos}
          actualizarMateriales={setActualizarMateriales}
        />
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default MaterialesPanel;

