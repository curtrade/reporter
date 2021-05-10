-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Фев 18 2021 г., 15:56
-- Версия сервера: 5.7.33-0ubuntu0.18.04.1
-- Версия PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `reporter`
--

--
-- Дамп данных таблицы `payment`
--

INSERT INTO `payment` (`id`, `provider_id`, `data`, `created_at`, `updated_at`) VALUES
(1, 1, '{\"amount\": 100, \"description:\": \"Первый платеж\", \"transactionId\": \"transaction_1\"}', '2021-02-18 00:00:00', '2021-02-18 00:00:00'),
(2, 1, '{\"amount\": 200, \"description:\": \"Второй платеж\", \"transactionId\": \"transaction_2\"}', '2021-02-18 00:00:00', '2021-02-18 00:00:00'),
(3, 1, '{\"amount\": 300, \"description:\": \"Третий платеж\", \"transactionId\": \"transaction_3\"}', '2021-02-18 00:00:00', '2021-02-18 00:00:00');

--
-- Дамп данных таблицы `provider`
--

INSERT INTO `provider` (`id`, `title`, `created_at`, `updated_at`) VALUES
(1, 'First provider', '2021-02-18 00:00:00', '2021-02-18 00:00:00');

--
-- Дамп данных таблицы `report_template`
--

INSERT INTO `report_template` (`id`, `provider_id`, `columns`, `format`, `recipients`, `created_at`, `updated_at`) VALUES
(1, 1, '[{\"field\": \"transactionId\", \"title\": \"Транзакция\"}, {\"field\": \"description\", \"title\": \"Описание платежа\"}, {\"field\": \"amount\", \"title\": \"Сумма\"}]', 'html', '[{\"address\": \"dev@odnokasanie.ru\", \"transport\": \"email\"}]', '2021-02-18 00:00:00', '2021-02-18 00:00:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
