create database Reprise;
use Reprise;

create table USUARIO(
id int primary key auto_increment not null,
usuario varchar(50) not null,
contrasena text not null,
rol varchar (10) not null
);

INSERT INTO USUARIO (usuario, contrasena,rol) VALUES
    ('user1', '1234','admin'),
    ('user2', '1234','empleado'),
    ('user3', '1234','empleado'),
    ('user4', '1234','empleado');

ALTER TABLE USUARIO ADD COLUMN activo BOOLEAN DEFAULT TRUE;

CREATE TABLE PRODUCTO (
id_codigo_barra bigint primary key  not null,
nombre varchar(50) not null,
avatar LONGBLOB not null,
calidad VARCHAR(20) NOT NULL
);

ALTER TABLE PRODUCTO ADD COLUMN activo BOOLEAN DEFAULT TRUE;

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

CREATE TABLE SALIDA(
id int primary key auto_increment not null,
id_codigo_barrafk bigint not null,
id_empleadofk int not null,
fecha date not null,
hora time not null,
FOREIGN KEY (id_codigo_barrafk) REFERENCES PRODUCTO(id_codigo_barra),
FOREIGN KEY(id_empleadofk) REFERENCES USUARIO(id)
);
INSERT INTO SALIDA (id_codigo_barrafk, id_empleadofk, fecha, hora) VALUES
    (1234567891234, 2, '2024-07-24', '08:30:00'),
    (2365298562134, 3, '2024-07-24', '09:00:00'),
    (4565456789767, 4, '2024-07-24', '09:30:00'),
    (1234567891234, 2, '2024-07-24', '10:00:00'),
    (2365298562134, 3, '2024-07-24', '10:30:00'),
    (4565456789767, 4, '2024-07-24', '11:00:00');