CREATE TABLE `alumno` (
  `alumnoId` varchar(13) PRIMARY KEY NOT NULL,
  `email` varchar(50) DEFAULT null,
  `nombre` varchar(50) DEFAULT null,
  `facultadId` varchar(5) DEFAULT null,
  `telefono` varchar(9) DEFAULT null,
  `createdAt` datetime DEFAULT null,
  `updatedAt` datetime DEFAULT null
);

CREATE TABLE `docente` (
  `docenteId` varchar(13) PRIMARY KEY NOT NULL,
  `email` varchar(50) DEFAULT null,
  `nombre` varchar(50) DEFAULT null,
  `facultadId` varchar(5) DEFAULT null,
  `telefono` varchar(9) DEFAULT null,
  `createdAt` datetime DEFAULT null,
  `updatedAt` datetime DEFAULT null
);

CREATE TABLE `excusas` (
  `id_excusa` int PRIMARY KEY NOT NULL,
  `alumnoId` varchar(13) NOT NULL,
  `razon` ENUM ('Enfermedad', 'Luto', 'Viaje', 'Otro') NOT NULL,
  `archivo` varchar(255) DEFAULT null,
  `fecha_solicitud` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `estado` ENUM ('Pendiente', 'Aprobado', 'Rechazado') DEFAULT 'Pendiente'
);

CREATE TABLE `facultad` (
  `facultadId` varchar(5) PRIMARY KEY NOT NULL,
  `nombreFacultad` varchar(100) DEFAULT null,
  `createdAt` datetime DEFAULT null,
  `updatedAt` datetime DEFAULT null
);

CREATE TABLE `user` (
  `userId` varchar(13) PRIMARY KEY NOT NULL,
  `pass` varchar(255) DEFAULT null,
  `roleId` int DEFAULT null,
  `createdAt` datetime DEFAULT null,
  `updatedAt` datetime DEFAULT null
);

CREATE INDEX `fk_alumno_facultad` ON `alumno` (`facultadId`);

CREATE INDEX `facultadId` ON `docente` (`facultadId`);

CREATE INDEX `alumnoId` ON `excusas` (`alumnoId`);

CREATE INDEX `roleId` ON `user` (`roleId`);

ALTER TABLE `alumno` ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`alumnoId`) REFERENCES `user` (`userId`);

ALTER TABLE `alumno` ADD CONSTRAINT `fk_alumno_facultad` FOREIGN KEY (`facultadId`) REFERENCES `facultad` (`facultadId`) ON UPDATE CASCADE;

ALTER TABLE `docente` ADD CONSTRAINT `docente_ibfk_1` FOREIGN KEY (`docenteId`) REFERENCES `user` (`userId`);

ALTER TABLE `docente` ADD CONSTRAINT `docente_ibfk_2` FOREIGN KEY (`facultadId`) REFERENCES `facultad` (`facultadId`);

ALTER TABLE `excusas` ADD CONSTRAINT `excusas_ibfk_1` FOREIGN KEY (`alumnoId`) REFERENCES `alumno` (`alumnoId`);
