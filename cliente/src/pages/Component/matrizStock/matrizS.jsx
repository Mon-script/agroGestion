import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Estante from './Estante';

const Matriz = ({ estantes, productos }) => {
  return (
    <Tabs>
      <TabList>
        {estantes.map((_, index) => (
          <Tab key={index}>Estante {index + 1}</Tab>
        ))}
      </TabList>
      {estantes.map((filas, index) => (
        <TabPanel key={index}>
          <Estante  filas={filas} productos={productos} />
        </TabPanel>
      ))}
    </Tabs>
  );
};


export default Matriz;

/*const Matriz = ({ estantes, productos }) => {
  return (
    <Tabs>
      <TabList>
        {estantes.map((_, index) => (
          <Tab key={index}>Estante {index + 1}</Tab>
        ))}
      </TabList>
      {estantes.map((filas, index) => (
        <TabPanel key={index}>
          <Estante filas={filas} productos={productos} estanteIndex={index} />
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default Matriz;*/