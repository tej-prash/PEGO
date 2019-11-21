-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: olx
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE=`+00:00` */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=`NO_AUTO_VALUE_ON_ZERO` */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--
drop database pego;
create database pego;
use pego;

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` varchar(20) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(450) NOT NULL,
  PRIMARY KEY (`category_id`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
create table  users
	(
		`user_id` varchar(20) primary key,
		`user_name` varchar(30),
		`pw` varchar(20),
		`dob` timestamp,
		`fullname` varchar(20),
		`phone_number` varchar(15),
		`email_id` varchar(40),
		`sex` varchar(10),
		`deleted_flag` boolean,
    `rating` int, 
    constraint check_rating check (`rating` < 6 AND `rating` > 0)
		);

DROP TABLE IF EXISTS `USERADDRESS`;
create table useraddress
	(
		`user_id` varchar(20) primary key,
		`flat_no` varchar(10),
		`street_name` varchar(20),
		`locality` varchar(20),
		`city` varchar(20),
		`state` varchar(20),
		`zip_code` varchar(10),
    `country` varchar(20),
		foreign key(user_id) references `users`(user_id) on delete cascade on update cascade
	);
/*!40101 SET character_set_client = @saved_cs_client */;



--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `paymentid` int NOT NULL AUTO_INCREMENT,
  `paymenttype` varchar(45) NOT NULL,
   PRIMARY KEY (`paymentid`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `product_id` varchar(20) NOT NULL,
  `name` varchar(45) NOT NULL,
  `category_id` varchar(20) NOT NULL,
  `picture_url` varchar(300) NOT NULL,
  `description` varchar(400) NOT NULL,
  `cost` varchar(45) NOT NULL,
  `discount` varchar(45) NOT NULL,
  `features` varchar(3000) NOT NULL,
  `ownerid` varchar(20) NOT NULL,
  `available_flag` int NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `ownerid_idx` (`ownerid`),
  KEY `category id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerid` FOREIGN KEY (`ownerid`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `order_id` varchar(20) NOT NULL,
  `productid` varchar(20) NOT NULL,
  `cust_id` varchar(20) NOT NULL,
  `paymentid` int NOT NULL,
  `shipdate` timestamp ,
  `total_amount` varchar(45) DEFAULT NULL,
  `time_of_order` timestamp ,
  PRIMARY KEY (`order_id`),
  KEY `productid_idx` (`productid`),
  KEY `custid_idx` (`cust_id`),
  KEY `paymentid_idx` (`paymentid`),
  CONSTRAINT `cust_id` FOREIGN KEY (`cust_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `paymentid` FOREIGN KEY (`paymentid`) REFERENCES `payment` (`paymentid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `productid` FOREIGN KEY (`productid`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

drop table if exists `reviews`;
create table `reviews`(
	`product_id` varchar(20),
	`order_id` varchar(20),
	`rating` int ,
	`review_date` timestamp,
	primary key(`product_id`,`order_id`),
	constraint check_rating check (`rating` < 6 AND `rating` > 0),
	foreign key (`order_id`) references `order`(`order_id`) on update cascade,
	foreign key (`product_id`) references `product`(`product_id`) on update cascade

);


INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa001', 'Tejas_P' , 'tejurocks' , '01-03-1998' , 'Tejas Prashanth' , '9930291339' , 'tejuprash@gmail.com','M',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa002', 'Megvya' , 'meg1999' , '26-02-1999' , 'Meghana Vyakaranam' , '9930294339' , 'meghanavs@gmail.com','F',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa003', 'taruni' , 'truni45' , '14-05-1998' , 'Taruni Sunder' , '9968292339' , 'tarunisunder@gmail.com','F',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa004', 'tanmudu' , 'tambooks123' , '01-07-1998' , 'Tanmaya Ududpa' , '9834291337' , 'tanmayup@gmail.com','M',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa005', 'vidhuroj' , 'dbmsftw' , '01-03-1979' , 'Vidhita Rojin' , '9936791354' , 'vr@gmail.com','F',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa006', 'dilkum' , 'musicsoul' , '30-07-1998' , 'Dilip Kumar' , '9935551330' ,'dilipk@gmail.com', 'M',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa007', 'ashwini' , 'dancer107' , '27-07-1998' , 'Ashwini Deshpande' , '8730291336' , 'ashdes@gmail.com','F',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa008', 'nidhi' , 'nidhrocks' , '08-03-1998' , 'Nidhi Singh' , '9930254317' ,'nidhi@gmail.com', 'F',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa009', 'nitin' , 'timetoread' , '11-06-1998' , 'Nitin Rao' , '9930267890' ,'nitin@gmail.com', 'M',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa010', 'nikhil' , 'password' , '01-03-1988' , 'Nikhil Gupta' , '993123439' , 'nikhil@gmail.com','M',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa011', 'priya' , 'pppqqq' , '01-09-1999' , 'Priya Rajan' , '9930291839' , 'priya@gmail.com','F',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa012', 'sunder' , 'suninsun' , '17-09-1968' , 'Sunder Chakravarty' , '8730297396' ,'sunderc@gmail.com', 'M',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa013', 'prabha' , 'prabsun' , '03-03-1970' , 'Prabha Sunder' , '9938791351' , 'prabha@gmail.com','F',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa014', 'ramita' , 'ramzshar' , '10-05-1996' , 'Ramita Sharma' , '9450291365' , 'ramita@gmail.com','F',false,1);
INSERT into users(`user_id`,`user_name`,`pw`,`dob`,`fullname`,`phone_number`,`email_id`,`sex`,`deleted_flag`,`rating`) values('uaa015', 'Yashas' , 'yashurocks' , '01-03-1998' , 'Yashas Prashanth' , '9930278339' , 'yashas@gmail.com','M',false,1);

INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa001', '23' , 'lavelle road' , 'gandhinagar' , 'Bangalore' , 'Karnataka' , 'India' ,'560001');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa002', '63' , 'malleshwaram road' , 'malleshwaram' , 'Bangalore' , 'Karnataka' , 'India' ,'560011');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa003', '78' , 'richmond road' , 'jayanagar' , 'Bangalore' , 'Karnataka' , 'India' ,'560041');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa004', '23' , 'wilson road' , 'koramangala' , 'Bangalore' , 'Karnataka' , 'India' ,'560078');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa005', '23' , 'kempegowda road' , 'indiranagar' , 'Bangalore' , 'Karnataka' , 'India' ,'560088');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa006', '23' , 'mekhri road' , 'gandhinagar' , 'Bangalore' , 'Karnataka' , 'India' ,'560001');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa007', '23' , 'bellandur road' , 'bellandur' , 'Bangalore' , 'Karnataka' , 'India' ,'560087');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa008', '23' , 'marathahalli road' , 'marathahalli' , 'Bangalore' , 'Karnataka' , 'India' ,'560037');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa009', '23' , 'mg road' , 'brookfields' , 'Bangalore' , 'Karnataka' , 'India' ,'560091');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa010', '23' , 'whitefield road' , 'whitefield' , 'Bangalore' , 'Karnataka' , 'India' ,'560051');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa011', '23' , 'church road' , 'girinagar' , 'Bangalore' , 'Karnataka' , 'India' ,'560089');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa012', '23' , 'sarjapur road' , 'sarjapur' , 'Bangalore' , 'Karnataka' , 'India' ,'560060');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa013',  '23' , 'sarjapur road' , 'sarjapur' , 'Bangalore' , 'Karnataka' , 'India' ,'560060');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa014', '23' , 'HAL road' , 'banashankari' , 'Bangalore' , 'Karnataka' , 'India' ,'560085');
INSERT into useraddress(`user_id`,`flat_no`,`street_name`,`locality`,`city`,`state`,`country`,`zip_code`) values('uaa015', '23' , 'lavelle road' , 'gandhinagar' , 'Bangalore' , 'Karnataka' , 'India' ,'560001');


INSERT INTO category(`category_id`,`name`,`description`) VALUES('c001','vehicles','Cars,bikes,vehicle parts');
INSERT INTO category(`category_id`,`name`,`description`) VALUES('c002','furniture','Household items');
INSERT INTO category(`category_id`,`name`,`description`) VALUES('c003','electronics','TV,AC, fridge,laptops');
INSERT INTO category(`category_id`,`name`,`description`) VALUES('c004','mobile phones','mobile phones and accessories');
INSERT INTO category(`category_id`,`name`,`description`) VALUES('c005','apparel','men and women clothing');
INSERT INTO category(`category_id`,`name`,`description`) VALUES('c006','misc','misc');

INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po001', 'car', 'c001', '/po001', 'Maruti Suzuki Swift Dzire. About 5 years old', '500000','0','Automatic;Insurance cover of 3 years;Blue in color;Bluetooth;Power steering','uaa001',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po002', 'car', 'c001', '/po002', 'New Audi A10', '2000000','0','Manual;Insurance cover of 3 years;Red in color;Bluetooth;','uaa002',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po003', 'phone', 'c004', '/po003', 'Brand new iPhone10', '70000','0','Grey in color; 64GB storage;1GB RAM','uaa001',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po004', 'bike', 'c001', '/po004', '4 year old Royal Enfield Bullet', '1500000','0','Black color;350CC engine capacity','uaa006',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po005', 'sofa', 'c002', '/po005', 'A new 2 seater-sofa set','75000','0','Black color; Soft cushions; Hard exterior;','uaa007',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po006', 'shirts', 'c005', '/po006', 'Shirts from Levi', '100', '0','Size:M','uaa001',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po007', 'HP laptop', 'c003', '/po007', 'HP x360 pavilion', '55000', '0','1TB HDD + 128GB SSD,8GB RAM;Warranty available;Battery in good condition','uaa014',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po008', 'Asus Zenfone', 'c004', '/po008', 'Asus Zenfone 3', '20000', '0','6GB RAM; 64GB storage; 10MP rear camera','uaa010',1);


insert into product values ('po009', 'Karaoke set', 'c006', '/po009', 'A Karaoke set with a microphone', 9979, 0, 'Speakers; Microphone', 'uaa010', 1);
insert into product values ('po010', 'bike', 'c001', '/po010', 'Ducati monster', 779, 0, 'Powerful engine', 'uaa010', 1);
insert into product values ('po011', 'phone', 'c004', '/po011', 'Samsung Galaxy S7', 7797, 0, 'Fast processor; 8GB RAM; 8MP camera', 'uaa004', 1);
insert into product values ('po012', 'car', 'c001', '/po012', 'Mercedes Benz S7', 7798767, 0, 'Powerful engine', 'uaa005', 1);
insert into product values ('po013', 'electronics', 'c003', '/po013', 'Mechanical Keyboard', 2339, 0, 'Cherry MX Keys', 'uaa005', 1);
insert into product values ('po014', 'apparel', 'c005', '/po014', 'Gucci Handbag', 12212, 0, 'Leather purse', 'uaa006', 1);
insert into product values ('po015', 'vehicles', 'c001', '/po015', 'Activa', 233990, 0, 'Honda Activa; 100cc', 'uaa007', 1);
insert into product values ('po016', 'Asus Zenphone', 'c004', '/po016', 'Asus Zenphone 3', 12339, 0, 'Bionic security', 'uaa001', 1);
insert into product values ('po017', 'Wireless Mouse', 'c004', '/po017', 'logitech mouse', 2339, 0, 'Cherry MX Keys', 'uaa002', 1);
insert into product values ('po018', 'sofa', 'c003', '/po018', 'A 3 seater sofa set', 2339, 0, 'sofa set', 'uaa003', 1);


INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po100', 'Pant', 'c005', '/po100', 'Pant from Levi', '3200', '10','Size: M; Colour: Brown','uaa001',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po101', 'Pant', 'c005', '/po101', 'Pant from Lee', '4000', '12','Size: M; Colour: Black','uaa001',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po102', 'Hoodie', 'c005', '/po102', 'Winter Hoodie Grey', '3200', '10','Size: L; Colour: Grey; Great condition','uaa001',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po103', 'Shoes', 'c005', '/po103', 'Bata Shoes', '1500', '0','Size: M; Colour: Black; Good condition','uaa001',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po104', 'Pant', 'c005', '/po104', 'Pant from Levi', '6000', '10','Size: M; Colour: Blue; Skin fit','uaa003',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po105', 'Shrug', 'c005', '/po105', 'Fashionable shrug', '2000', '0','Colour: Blue','uaa003',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po106', 'Hoodie', 'c005', '/po106', 'Winter Hoodie Black', '1249', '10','Colour: Black; Great condition','uaa003',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po107', 'Shoes', 'c005', '/po107', 'Heels', '3500', '0','Colour: Black; Good condition; Original Leather','uaa003',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po108', 'Shorts', 'c005', '/po108', 'Beach Shorts', '1000', '0','Size: M; Cool and fashionable','uaa002',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po109', 'Shrug', 'c005', '/po109', 'Fashionable shrug', '2200', '0','Colour: white; Good for winters','uaa002',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po110', 'T-Shirt', 'c005', '/po110', 'Shirt from Pepe jeans', '1249', '10','Colour: Yellow; Great condition','uaa002',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po111', 'Scarf', 'c005', '/po111', 'Scarf for dust protection', '500', '0','Good condition','uaa002',1);


INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po200', 'Samsung Fridge', 'c003', '/po200', 'Samsung Single Door', '16000', '0','20 L; Single Door; 1 Year Warranty','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po201', 'Haier Fridge', 'c003', '/po201', 'Haier Fridge Single Door', '14000', '0','195 L; Double Door; 2 Year Warranty','uaa006',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po202', 'Whirlpool Fridge', 'c003', '/po202', 'Whirlpool Single Door', '16000', '0','190 L; Single Door; 3 Year Warranty','uaa005',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po203', 'LG Fridge', 'c003', '/po203', 'LG Single Door', '9000', '0','10 L; Single Door; 1 Year Warranty','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po204', 'BLue Star Fridge', 'c003', '/po204', 'Blue Star Double Door', '21000', '0','200 L; Double Door; 4 Year Warranty','uaa001',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po205', 'Samsung washing machine', 'c003', '/po205', 'Samsung Fully Automatic', '14000', '0','Fully automatic; Top Load; 6.2 kg','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po206', 'Bosch  washing machine', 'c003', '/po206', 'Bosch FUlly automatic', '28000', '0','Fully automatic; Front Load; 7 kg','uaa005',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po207', 'LG  washing machine', 'c003', '/po207', 'LG FUlly automatic', '25000', '0','Fully automatic; Front Load; 6 kg','uaa001',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po208', 'Whirlpool  washing machine', 'c003', '/po208', 'Whirlpool Royal plus FUlly automatic', '15000', '0','Fully automatic; TOp Load; 7 kg','uaa003',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po209', 'Onida washing machine', 'c003', '/po209', 'Onida Lava Red', '6000', '0','Semi automatic; TOp Load;  4 kg','uaa005',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po210', 'Philips  Trimmer', 'c003', '/po210', 'Philips QT005IJ', '2800', '0','Cordless; With clip; 5 hours battery','uaa001',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po211', 'Kindle paperwhite', 'c003', '/po211', 'Kindle Oasis 9th Gen', '20000', '0','Wifi; Water proof; 8 gb','uaa002',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po212', 'Sandisk Pendrive', 'c003', '/po212', 'Sandisk Ultra Speeddd', '3000', '0','3.1; 1 TB; Water-proof','uaa002',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po213', 'Google Home Mini', 'c003', '/po213', 'Google Home Mini white ', '4000', '0','Works with 6 users; 173 g; multiple languages','uaa003',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po214', 'JBL earphones', 'c003', '/po214', 'JBL CS002I', '749', '0','in-ear; Noise cancellation; water proof','uaa001',1);

INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po400', 'Dining Table', 'c002', '/po400', 'Table with set of 4 chairs', '30000', '0','Solid Wood 4 Seater Dining Set in Provincial Teak Finish','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po401', 'Study Table', 'c002', '/po401', 'Elegant white decor', '20000', '0','Table to study; Comes with chair','uaa011',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po402', 'Coffee Table', 'c002', '/po402', 'Catchy brown vineer', '10000', '0','2 step table; Teak finish','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po403', 'Horizontal Dresser', 'c002', '/po403', 'White Dresser with glass shelf', '15000', '0','Furniture to stack items; With Glass shelf','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po404', 'Recliner Sofa', 'c002', '/po404', 'Set of 2 brown recliners', '30000', '0','Comfotable Recliners;Adjustable foot rest','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po405', 'Platform Bed', 'c002', '/po405', 'Platform Bed', '40000', '0','Comfortable Platform bed','uaa011',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po406', 'Folding Bed', 'c002', '/po406', 'Foldable yet durable', '41000', '0','Light weight; Comfortable bed','uaa012',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po407', 'Panel Bed', 'c002', '/po407', 'Brown panel bed', '45000', '0','Comfortable; Reliable Panel bed','uaa011',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po408', 'Writing Desk', 'c002', '/po408', 'Comfortable Writing desk', '10000', '0','Desk for reading and writing','uaa012',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po409', 'Computer Desk', 'c002', '/po409', 'Desktop Desk', '15000', '0','Comfortable Computer table','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po410', 'Credenza Desk', 'c002', '/po410', 'Credenza Desk', '25000', '0','Fancy Credenza look','uaa011',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po411', 'Hutch TV Stand', 'c002', '/po411', 'Hutch TV Stand', '21000', '0','With Storage space; Hutch Fashion','uaa012',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po412', 'Cabinet', 'c002', '/po412', 'White Oak; Sufficient Storage Space', '27000', '0','','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po413', 'Rustic TV Stand', 'c002', '/po413', 'Rustic TV Stand', '18000', '0','Rustic Look; Reliable','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po414', 'Bunk Bed', 'c002', '/po414', 'Wooden Bunk Bed', '30000', '0','2 step beds','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po415', 'Futon', 'c002', '/po415', 'Futon', '20000', '0','Fancy look','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po416', 'Home Bar', 'c002', '/po416', 'Stylish Home Bar', '40000', '0','Storage space for beverages','uaa012',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po417', 'Column Locker', 'c002', '/po417', 'Single Column Locker', '8000', '0','Single Column; With lock facility','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po418', 'Arm Chair', 'c002', '/po418', 'Comfortable Arm Chair', '15000', '0','Comfortable;Durable','uaa010',1);
INSERT into product(`product_id`,`name`,`category_id`,`picture_url`,`description`,`cost`,`discount`,`features`,`ownerid`,`available_flag`) values('po419', 'Lounge Chair', 'c002', '/po419', 'Fancy Lounge Chair', '12000', '0','With foot rest','uaa010',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-09 11:13:17
