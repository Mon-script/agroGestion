create database agrogestion;
use agrogestion;

create table USUARIO(
id int primary key auto_increment not null,
usuario varchar (20) not null,
nombre varchar(50) not null,
apellido varchar (50) not null,
contrasena text not null,
rol varchar (10) not null,
fecha_inicio date not null,
activo boolean not null

);

DROP TABLE USUARIO;
ALTER TABLE USUARIO
CHANGE COLUMN usuario nombre VARCHAR(50) NOT NULL,
ADD COLUMN apellido VARCHAR(50) NOT NULL;

ALTER TABLE USUARIO
DROP COLUMN activo;
ALTER TABLE USUARIO
ADD COLUMN fecha_inicio date NOT NULL;
update USUARIO set activo = 1 where id=13;

describe USUARIO;

ALTER TABLE USUARIO ADD COLUMN usuario varchar(20) not null;

ALTER TABLE USUARIO ADD COLUMN activo BOOLEAN DEFAULT TRUE;
select * from USUARIO;


INSERT INTO USUARIO (usuario, nombre, apellido, contrasena, rol, fecha_inicio, activo) VALUES
    ('yanna', 'yanina','rios', '$2b$10$Zkpz1ijaeSeBDKlmNFS4Pe8wBEd7nff..RKitSsMG8USp7oJ72496','admin' , '2024-10-17', 1),
    ('user2', '1234','empleado'),
    ('user3', '1234','empleado'),
    ('user4', '1234','empleado');

DELETE FROM USUARIO where id = 3;

INSERT INTO USUARIO (nombre, contrasena, rol, apellido, activo, usuario, fecha_inicio) VALUES
    ('octavio', '$2b$10$Zkpz1ijaeSeBDKlmNFS4Pe8wBEd7nff..RKitSsMG8USp7oJ72496','admin', 'balberdi',1 , 'octis', '2024-10-17');
CREATE TABLE PRODUCTO (
id_codigo_barra bigint primary key  not null,
nombre varchar(50) not null,
avatar LONGBLOB not null,
-- marca varchar (50) not null,
calidad VARCHAR(20) NOT NULL,
activo boolean not null
);
describe PRODUCTO;
ALTER TABLE PRODUCTO
CHANGE COLUMN calidad marca VARCHAR(50) NOT NULL;
alter table PRODUCTO
drop activo;
ALTER TABLE PRODUCTO ADD COLUMN activo boolean not null;
ALTER TABLE PRODUCTO ADD COLUMN activo BOOLEAN DEFAULT TRUE;
select * from PRODUCTO;
UPDATE PRODUCTO
SET activo = 1
WHERE condicion;
DELETE FROM PRODUCTO;

CREATE TABLE ENTRADA(
    id int primary key auto_increment not null,
    id_codigo_barrafk bigint not null,
    estante int not null,
    fecha date not null,
    hora time not null,
    FOREIGN KEY (id_codigo_barrafk) REFERENCES PRODUCTO(id_codigo_barra)
);
INSERT INTO ENTRADA (id_codigo_barrafk, estante, fecha, hora) VALUES
    (1234567891234, 1, '2024-07-24', '08:00:00'),
    (2365298562134, 2, '2024-07-24', '08:15:00'),
    (4565456789767, 3, '2024-07-24', '08:30:00'),
    (1234567891234, 1, '2024-07-24', '08:45:00'),
    (2365298562134, 2, '2024-07-24', '09:00:00'),
    (4565456789767, 3, '2024-07-24', '09:15:00'),
    (1234567891234, 1, '2024-07-24', '09:30:00'),
    (2365298562134, 2, '2024-07-24', '09:45:00'),
    (4565456789767, 3, '2024-07-24', '10:00:00'),
    (1234567891234, 1, '2024-07-24', '10:15:00'),
    (2365298562134, 2, '2024-07-24', '10:30:00'),
    (4565456789767, 3, '2024-07-24', '10:45:00'),
    (1234567891234, 1, '2024-07-24', '11:00:00'),
    (2365298562134, 2, '2024-07-24', '11:15:00'),
    (4565456789767, 3, '2024-07-24', '11:30:00'),
    (1234567891234, 1, '2024-07-24', '11:45:00'),
    (2365298562134, 2, '2024-07-24', '12:00:00'),
    (4565456789767, 3, '2024-07-24', '12:15:00'),
    (1234567891234, 1, '2024-07-24', '12:30:00'),
    (2365298562134, 2, '2024-07-24', '12:45:00'),
    (4565456789767, 3, '2024-07-24', '13:00:00');
    
    select * from entrada;

DELETE FROM ENTRADA;

CREATE TABLE SALIDA(
id int primary key auto_increment not null,
id_codigo_barrafk bigint not null,
id_empleadofk int not null,
fecha date not null,
hora time not null,
FOREIGN KEY (id_codigo_barrafk) REFERENCES PRODUCTO(id_codigo_barra),
FOREIGN KEY(id_empleadofk) REFERENCES USUARIO(id)
);
describe SALIDA;
INSERT INTO SALIDA (id_codigo_barrafk, id_empleadofk, fecha, hora) VALUES
    (1234567891234, 2, '2024-07-24', '08:30:00'),
    (2365298562134, 2, '2024-07-24', '09:00:00'),
    (4565456789767, 4, '2024-07-24', '09:30:00'),
    (1234567891234, 4, '2024-07-24', '10:00:00'),
    (2365298562134, 4, '2024-07-24', '10:30:00'),
    (4565456789767, 2, '2024-07-24', '11:00:00');

DELETE FROM SALIDA;
CREATE TABLE EMPAQUE(
id_empaque bigint primary key auto_increment not null,
nombre_empaque varchar(50) not null,
detalle_empaque text not null
);

insert into EMPAQUE (nombre_empaque, detalle_empaque) values ('cajon','cajon de transporte alimenticio');
select * from EMPAQUE;

CREATE TABLE ESTADO(
id_estado bigint primary key auto_increment not null,
nombre_estado varchar(50) not null,
detalle_estado text not null
);

insert into ESTADO (nombre_estado,detalle_estado) values ('plantula','estado inicial y fragil de la cosecha'),
('vegetacion','crecimiento en estructura y volumen de la planta'),
('floracion','crecimiento y formacion de flora y frutos previo a cosechar');

drop table ESTADO;

CREATE TABLE MARCA_SEMILLA(
id_marca_semilla bigint primary key auto_increment not null,
nombre_marca varchar(50) not null,
detalle text not null,
activo boolean not null 
);
insert into MARCA_SEMILLA (nombre_marca,detalle,activo) values
('semillita','hibrida',1),
('arbolseed','criolla',1),
('saltaP','autonoma',1)
;
UPDATE MARCA_SEMILLA
SET nombre_marca = 'royalseed', detalle = 'alta efectividad y calidad'
WHERE id_marca_semilla = 1;
describe MARCA_SEMILLA;



CREATE TABLE TIPO_SEMILLA(
id_tipo_semilla bigint primary key auto_increment not null,
nombre_semilla varchar (50),
detalle_semilla text not null,
activo boolean not null
);
UPDATE TIPO_SEMILLA
SET nombre_semilla = 'Criolla',
    detalle_semilla = 'Semillas criollas adaptadas a nuestro entorno por selección natural o manual, fomentando la agricultura tradicional de autoconsumo.',
    activo = true
WHERE nombre_semilla = 'Palta';

UPDATE TIPO_SEMILLA
SET nombre_semilla = 'Mejorada',
    detalle_semilla = 'Semillas mejoradas mediante polinización controlada, caracterizadas por alta producción, resistencia a plagas y adaptación a regiones específicas.',
    activo = true
WHERE nombre_semilla = 'Frutilla';

UPDATE TIPO_SEMILLA
SET nombre_semilla = 'Baby',
    detalle_semilla = 'Semillas de hortalizas baby mejoradas para que los vegetales no se desarrollen completamente, resultando tiernos, delicados y con alta calidad nutricional.',
    activo = true
WHERE nombre_semilla = 'Naranja';

UPDATE TIPO_SEMILLA
SET nombre_semilla = 'Híbrida',
    detalle_semilla = 'Semillas híbridas obtenidas del cruce de dos variedades puras, con alta adaptación climática, productividad y frutos de alta calidad.',
    activo = true
WHERE nombre_semilla = 'Girasol';



describe TIPO_SEMILLA;
select * from TIPO_SEMILLA;
DELETE FROM TIPO_SEMILLA;
drop table TIPO_SEMILLA;




CREATE TABLE MARCA_FERTILIZANTE(
id_marca_fertilizante bigint primary key auto_increment not null,
nombre_marca varchar(50) not null,
detalle text not null,
activo boolean not null
);


INSERT INTO MARCA_FERTILIZANTE (nombre_marca, detalle, activo) 
VALUES ('FertiGrow', 'Marca especializada en fertilizantes orgánicos para cultivos de alto rendimiento.', true);

INSERT INTO MARCA_FERTILIZANTE (nombre_marca, detalle, activo) 
VALUES ('AgriBoost', 'Fertilizantes químicos de liberación lenta para mejorar el crecimiento vegetal.', true);

INSERT INTO MARCA_FERTILIZANTE (nombre_marca, detalle, activo) 
VALUES ('NutriField', 'Fertilizantes líquidos para cultivos en invernadero y campo abierto.', true);

INSERT INTO MARCA_FERTILIZANTE (nombre_marca, detalle, activo) 
VALUES ('GreenMax', 'Fertilizantes naturales para incrementar la producción agrícola.', true);

describe MARCA_FERTILIZANTE;



CREATE TABLE FERTILIZANTE(
id_fertilizante bigint primary key auto_increment not null,
nombre_fertilizante varchar(50),
detalle_fertilizante text not null,
activo boolean not null
);
INSERT INTO FERTILIZANTE (nombre_fertilizante, detalle_fertilizante, activo) 
VALUES ('NitroMax', 'Fertilizante rico en nitrógeno para promover el crecimiento de hojas verdes.', true);

INSERT INTO FERTILIZANTE (nombre_fertilizante, detalle_fertilizante, activo) 
VALUES ('FosfoPlus', 'Fertilizante con alto contenido de fósforo, ideal para estimular la floración y el enraizamiento.', true);

INSERT INTO FERTILIZANTE (nombre_fertilizante, detalle_fertilizante, activo) 
VALUES ('PotasiumBoost', 'Fertilizante a base de potasio, adecuado para mejorar la resistencia de las plantas.', true);

INSERT INTO FERTILIZANTE (nombre_fertilizante, detalle_fertilizante, activo) 
VALUES ('GreenGrow', 'Fertilizante balanceado para un crecimiento general y salud de la planta.', true);
select * from FERTILIZANTE;
describe FERTILIZANTE;
drop table FERTILIZANTE;


CREATE TABLE RIEGO(
id_riego int primary key auto_increment not null,
nombre_riego text not null,
detalle_riego text not null
);

insert into RIEGO (nombre_riego, detalle_riego) values ('goteo', 'Es un sistema tradicional que consiste en distribuir agua de manera lenta y constante a la zona de las raíces de las plantas. Es ideal para zonas áridas o cultivos que requieren una mayor concentración de abonos'),
('aspersion','Se utiliza ampliamente por su versatilidad y facilidad de instalación. Consiste en distribuir agua sobre los cultivos en forma de abanico o circular mediante cabezales rociadores'),
('subterráneo','Consiste en distribuir agua directamente bajo tierra a la zona de las raíces de las plantas'),
('surco','Es uno de los sistemas de riego más antiguos y simples. Consiste en distribuir el agua por canales o surcos previamente diseñados y conectados a los cultivos'),
('inundación','También se conoce como riego por gravedad y se utiliza en áreas con abundantes recursos hídricos');




CREATE TABLE SIEMBRA(
id_siembra bigint primary key auto_increment not null,
id_codigo_barrafk bigint not null,
id_tipo_semillafk bigint not null,
id_marca_semillafk bigint not null,
cantidad bigint not null,
id_tipo_fertilizantefk bigint not null,
id_marca_fertilizantefk bigint not null,
id_estado bigint not null,
fecha_estado date not null,
id_riegofk int not null,
fecha_riego date not null,
fecha_siembra date not null,
volumen_siembra bigint not null,
estimacion_cosecha date not null,
activo boolean not null,
FOREIGN KEY (id_codigo_barrafk) REFERENCES PRODUCTO(id_codigo_barra),
FOREIGN KEY (id_tipo_semillafk) REFERENCES TIPO_SEMILLA(id_tipo_semilla),
FOREIGN KEY (id_marca_semillafk) REFERENCES MARCA_SEMILLA(id_marca_semilla),
FOREIGN KEY (id_tipo_fertilizantefk) REFERENCES FERTILIZANTE(id_fertilizante),
FOREIGN KEY (id_marca_fertilizantefk) REFERENCES MARCA_FERTILIZANTE(id_marca_fertilizante),
FOREIGN KEY (id_estado) REFERENCES ESTADO(id_estado),
FOREIGN KEY (id_riegofk) REFERENCES RIEGO(id_riego)
);
SELECT 
    si.id_siembra,
    si.id_codigo_barrafk,
    p.nombre AS nombre_producto,
    si.id_tipo_semillafk,
    ts.nombre_semilla AS nombre_tipo_semilla,
    si.id_marca_semillafk,
    ms.nombre_marca AS nombre_marca_semilla,
    si.cantidad,
    si.id_tipo_fertilizantefk,
    f.nombre_fertilizante AS nombre_fertilizante,
    si.id_marca_fertilizantefk,
    mf.nombre_marca AS nombre_marca_fertilizante,
    si.id_estado,
    e.nombre_estado AS estado,
    si.fecha_estado,
    si.id_riegofk,
    r.nombre_riego AS nombre_riego,
    si.fecha_riego,
    si.fecha_siembra,
    si.volumen_siembra,
    si.estimacion_cosecha,
    si.activo
FROM 
    SIEMBRA si
INNER JOIN PRODUCTO p ON si.id_codigo_barrafk = p.id_codigo_barra
INNER JOIN TIPO_SEMILLA ts ON si.id_tipo_semillafk = ts.id_tipo_semilla
INNER JOIN MARCA_SEMILLA ms ON si.id_marca_semillafk = ms.id_marca_semilla
INNER JOIN FERTILIZANTE f ON si.id_tipo_fertilizantefk = f.id_fertilizante
INNER JOIN MARCA_FERTILIZANTE mf ON si.id_marca_fertilizantefk = mf.id_marca_fertilizante
INNER JOIN ESTADO e ON si.id_estado = e.id_estado
INNER JOIN RIEGO r ON si.id_riegofk = r.id_riego;
describe SIEMBRA;
drop table SIEMBRA;
select * from SIEMBRA;

INSERT INTO SIEMBRA (
    id_codigo_barrafk, id_tipo_semillafk, id_marca_semillafk, 
    cantidad, id_tipo_fertilizantefk, id_marca_fertilizantefk, 
    id_estado, fecha_estado, id_riegofk, fecha_riego, 
    fecha_siembra, volumen_siembra, estimacion_cosecha, activo
) VALUES 
(1234567891234, 2, 1, 100, 1, 1, 1, '2024-01-10', 1, '2024-01-11', '2024-01-01', 50, '2024-04-01', true),
(2365298562134, 3, 2, 150, 2, 2, 2, '2024-02-15', 2, '2024-02-16', '2024-02-01', 75, '2024-05-01', true),
(4565456789767, 2, 3, 200, 3, 3, 3, '2024-03-20', 3, '2024-03-21', '2024-03-01', 100, '2024-06-01', true),
(2365298562134, 3, 3, 120, 1, 2, 1, '2024-01-05', 2, '2024-01-06', '2024-01-01', 60, '2024-04-01', true)
;
DELETE FROM SIEMBRA;
UPDATE SIEMBRA
SET 
    activo = true
WHERE id_siembra = 18;


CREATE TABLE COSECHA(
id_cosecha bigint primary key auto_increment not null,
id_siembra bigint not null,
id_codigo_barrafk bigint not null,
rendimiento_cosecha int not null,
cantidad_cosecha int not null,
id_empaquefk bigint not null,
fecha_cosecha date,
FOREIGN KEY (id_empaquefk) REFERENCES EMPAQUE(id_empaque),
FOREIGN KEY (id_siembra) REFERENCES SIEMBRA(id_siembra),
FOREIGN KEY (id_codigo_barrafk) REFERENCES PRODUCTO(id_codigo_barra)
);
INSERT INTO COSECHA (
    id_siembra, id_codigo_barrafk, rendimiento_cosecha, cantidad_cosecha, id_empaquefk, fecha_cosecha
) VALUES
(9, 1234567891234, 80, 80, 1, '2024-04-01'),
(10, 2365298562134, 70, 105, 1, '2024-05-15'),
(11, 4565456789767, 90, 180, 1, '2024-06-20'),
(12, 2365298562134, 60, 72, 1, '2024-04-10'),
(13, 1234567891234, 50, 50, 1, '2024-04-15'),
(14, 2365298562134, 85, 128, 1, '2024-05-20');

drop table COSECHA;
delete from COSECHA;EFERENCES PRODUCTO(id_codigo_barra),
FOREIGN KEY(id_empleadofk) REFERENCES USUARIO(id)
);
INSERT INTO SALIDA (id_codigo_barrafk, id_empleadofk, fecha, hora) VALUES
    (1234567891234, 2, '2024-07-24', '08:30:00'),
    (2365298562134, 3, '2024-07-24', '09:00:00'),
    (4565456789767, 4, '2024-07-24', '09:30:00'),
    (1234567891234, 2, '2024-07-24', '10:00:00'),
    (2365298562134, 3, '2024-07-24', '10:30:00'),
    (4565456789767, 4, '2024-07-24', '11:00:00');