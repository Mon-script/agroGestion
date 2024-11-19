import { Avatar, Badge, Popover, Table } from 'keep-react';
import { Crown, DotsThreeOutline, Trash } from 'phosphor-react';
import { useEffect, useState, useContext } from 'react';
import { format } from 'date-fns';
import { UserContext } from '../../userContext';
import { Button, message, Popconfirm } from 'antd';
import { FechayHora } from '../Component/DatePicker';
import { ExcelExporter } from '../Component/botones/exportExelBoton';
import logo from '../../assets/avatar.jpeg'

export const Cosechas = () => {
  const [dataArray, setData] = useState([]);
  const [update, setUpdate] = useState(false)
  const { user } = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:3000/cosechas/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        setData(result);
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
      console.log(user);
      setUpdate(false)
  }, [update]);



  return (
    <Table showCheckbox={false}>
      <Table.Caption>
        <div className="my-5 flex items-center justify-between px-6">
          <div className="flex items-center gap-5">
            <p className="text-body-1 font-semibold text-metal-600">COSECHAS</p>
          </div>
          <div className="flex items-center gap-5">
            {/* Aquí va el botón */}
            <ExcelExporter data={dataArray} fileName="table_data" />
            {/* Aquí termina el espacio del botón */}
            <FechayHora />
          </div>
        </div>
      </Table.Caption>
      <Table.Body className="divide-gray-25 divide-y">
        {dataArray.map((item, index) => (
          <Table.Row className="bg-white" key={index}>
            <Table.Cell>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar shape="circle" img={logo} size="md" />
                    <div>
                      <p className="-mb-0.5 text-body-4 font-medium text-metal-600">Cosecha de: <br />{item.nombre_producto}</p>
                      <p className="-mb-0.5 text-body-4 font-medium text-metal-600">Id: {item.id_cosecha}</p>
                      <span className="text-body-6 font-normal text-metal-500">Id de Siembra: {item.id_siembra}</span> <br />
                    </div>
                  </div>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>
              <p className="text-body-5 font-medium text-metal-500"><p className="-mb-0.5 text-body-4 font-medium text-metal-600">Fecha de Cosecha: </p> <br />{format(new Date(item.fecha_cosecha), 'dd/MM/yyyy')}</p>
              
            </Table.Cell>
            <Table.Cell>
              <p className="text-body-5 font-medium text-metal-500">Empaque: {item.nombre_empaque}</p>
            </Table.Cell>
            <Table.Cell>
              <div className="inline-block">
                <Badge colorType="light" color="success" icon={<Crown size={18} weight="light" />} iconPosition="left">
                  Rendimiento:
                  <p>{item.rendimiento_cosecha} %</p>
                </Badge>
              </div>
            </Table.Cell>
            <Table.Cell>
              <p className="text-body-5 font-medium text-metal-500">Cantidad Cosechada</p>
              <p className="text-body-6 font-normal text-metal-500">{item.cantidad_cosecha} U</p>
            </Table.Cell>
            
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};