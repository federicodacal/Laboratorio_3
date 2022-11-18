-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-07-2020 a las 14:03:45
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `farmacia_bd`
--
CREATE DATABASE IF NOT EXISTS `farmacia_bd` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `farmacia_bd`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barbijos`
--

DROP TABLE IF EXISTS `barbijos`;
CREATE TABLE `barbijos` (
  `id` int(10) UNSIGNED NOT NULL,
  `color` varchar(50) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `precio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `barbijos`
--

INSERT INTO `barbijos` (`id`, `color`, `tipo`, `precio`) VALUES
(1, 'blanco', 'liso', 200),
(2, 'amarillo', 'listorti', 125),
(5, 'naranjita', 'liso', 125),
(6, 'naranjita', 'liso', 125);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `correo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `perfil` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `foto` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `correo`, `clave`, `nombre`, `apellido`, `perfil`, `foto`) VALUES
(1, 'prop@prop.com', '1234', 'Propietario', 'Propietario', 'propietario', './fotos/prop@prop.com_1.jpg'),
(2, 'empleado@empleado.com', '123456', 'Emple', 'Ado', 'empleado', './fotos/empleado@empleado.com_2.jpg'),
(3, 'encargado@encargado.com', '123456', 'Encargado', 'Encargado', 'encargado', './fotos/encargado@encargado.com_3.jpg'),
(4, 'juan@perez.com', '123456', 'juan', 'perez', 'empleado', './foto/juan@perez.com_4.jpg'),
(5, 'juan@perez.com', '123456', 'juan', 'perez', 'empleado', 'coronavirus.jpg'),
(6, 'juan@perez.com', '123456', 'juan', 'perez', 'empleado', 'juan@perez.com_6.jpg'),
(7, 'pedro@perez.com', '123456', 'pedro', 'perez', 'empleado', 'pedro@perez.com.195341.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `barbijos`
--
ALTER TABLE `barbijos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `barbijos`
--
ALTER TABLE `barbijos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
