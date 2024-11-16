import { useEffect, useState, useContext } from 'react';
import { format } from 'date-fns';
import { Table, Avatar, Badge, Popover, Button } from 'keep-react';
import { ExcelExporter } from "../botones/exportExelBoton";
import { FechayHora } from "../DatePicker";
import { Crown, DotsThreeOutline, Trash } from 'phosphor-react';
import { UserContext } from '../../../userContext';
import logo from '../../../assets/avatar.jpeg'

export const TablaSalida = () => {
  const [dataArray, setData] = useState([]);
  const { user } = useContext(UserContext);

  // Función para convertir fecha y hora en objeto Date
  const createDateTime = (fecha, hora) => {
    const datePart = fecha.split('T')[0]; // Solo obtenemos la parte de la fecha
    const timePart = hora; // La hora permanece igual
    const dateTimeString = `${datePart}T${timePart}`; // Formato: 'YYYY-MM-DDTHH:mm:ss'
    const date = new Date(dateTimeString);
    console.log(`Fecha: ${datePart}, Hora: ${timePart}, Date Object: ${date}`); // Verifica el objeto Date
    return date;
  };

  // Función para ordenar los datos por fecha y hora utilizando el método de inserción
  const insertionSort = (data) => {
    const sortedArray = [];
    data.forEach(item => {
      const dateTime = createDateTime(item.fecha, item.hora);
      console.log(`Item: ${item.producto_nombre}, DateTime: ${dateTime}`); // Verifica el objeto Date

      // Insertar en el lugar correcto
      let j = sortedArray.length - 1;
      while (j >= 0 && createDateTime(sortedArray[j].fecha, sortedArray[j].hora) < dateTime) {
        j--;
      }
      sortedArray.splice(j + 1, 0, item);
    });
    return sortedArray;
  };

  useEffect(() => {
    fetch('http://localhost:3000/salida', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Datos recibidos:', result); // Verifica los datos
        const sortedData = insertionSort(result);
        setData(sortedData);
        console.log('Datos ordenados:', sortedData); // Verifica los datos ordenados
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Table showCheckbox={false}>
      <Table.Caption>
        <div className="my-5 flex items-center justify-between px-6">
          <div className="flex items-center gap-5">
            <p className="text-body-1 font-semibold text-metal-600">Salidas</p>
          </div>
          <div className="flex items-center gap-5">
            <ExcelExporter data={dataArray} fileName="table_data" />
            <FechayHora />
          </div>
        </div>
      </Table.Caption>
      <Table.Body className="divide-gray-25 divide-y">
        {dataArray.map((item, index) => (
          <Table.Row className="bg-white" key={index}>
            <Table.Cell>
              <div className="flex items-center gap-3">
                <Avatar shape="circle" img={logo} size="md" />
                <div>
                  <p className="text-body-4 font-medium text-metal-600">{item.producto_nombre}</p>
                  <p className="text-body-4 font-medium text-metal-600">{item.id_codigo_barra}</p>
                  <span className="text-body-6 font-normal text-metal-500">{item.calidad}</span>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>
              <p className="text-body-5 font-medium text-metal-500">{format(new Date(item.fecha), 'dd/MM/yyyy')}</p>
              <p className="text-body-6 font-normal text-metal-500">{format(new Date(`1970-01-01T${item.hora}Z`), 'HH:mm')} hs</p>
            </Table.Cell>
            <Table.Cell>
              <p className="text-body-5 font-medium text-metal-500">Empleado: {item.empleado_nombre}</p>
            </Table.Cell>
            <Table.Cell>
              <Badge colorType="light" color="success" icon={<Crown size={18} weight="light" />} iconPosition="left">
                Delivered
              </Badge>
            </Table.Cell>
            <Table.Cell>
              <p className="text-body-5 font-medium text-metal-500">Calidad</p>
              <p className="text-body-6 font-normal text-metal-500">{item.calidad}</p>
            </Table.Cell>
            <Table.Cell>
              <Popover showDismissIcon={false} showArrow={false} className="w-52 border border-metal-100 p-2">
                <Popover.Container className="!mt-0 !block">
                  <ul>
                    <li className="rounded px-2 py-1 hover:bg-metal-100">
                      <button className="flex w-full items-center justify-between text-body-4 font-normal text-metal-600">
                        <span>Delete</span>
                        <span><Trash /></span>
                      </button>
                    </li>
                  </ul>
                </Popover.Container>
                <Popover.Action>
                  {user && user.role === 'admin' ? (
                    <Button type="outlineGray" size="xs" circle={true}>
                      <DotsThreeOutline size={14} color="#5E718D" weight="bold" />
                    </Button>
                  ) : (
                    ''
                  )}
                </Popover.Action>
              </Popover>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};










