/*
 Navicat Premium Data Transfer

 Source Server         : phpMysql
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : tansuoshop

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 29/11/2022 15:31:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `userid` int(4) NOT NULL,
  `goodid` int(4) NOT NULL,
  `number` int(10) NOT NULL,
  INDEX `userid`(`userid`) USING BTREE,
  INDEX `goodid`(`goodid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (1, 1, 3);
INSERT INTO `cart` VALUES (1, 3, 1);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `typeid` int(4) NOT NULL AUTO_INCREMENT,
  `typename` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`typeid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '航拍无人机');
INSERT INTO `category` VALUES (2, '手持拍摄设备');
INSERT INTO `category` VALUES (3, '增值服务');

-- ----------------------------
-- Table structure for good
-- ----------------------------
DROP TABLE IF EXISTS `good`;
CREATE TABLE `good`  (
  `goodid` int(4) NOT NULL AUTO_INCREMENT,
  `typeid` int(4) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` double(9, 2) NOT NULL,
  `picture` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `state` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`goodid`) USING BTREE,
  INDEX `typeid`(`typeid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 33 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of good
-- ----------------------------
INSERT INTO `good` VALUES (1, 1, '精灵 Phantom 4 Pro V2.0', 9999.00, 'img/goodImg/typeId1/精灵 Phantom 4 Pro V2.0.jpg', 0);
INSERT INTO `good` VALUES (2, 1, 'DJI Mini 3 Pro（普通遥控器）', 4788.00, 'img/goodImg/typeId1/DJI Mini 3 Pro（普通遥控器）.jpg', 1);
INSERT INTO `good` VALUES (3, 1, 'DJI Air 2S', 6499.00, 'img/goodImg/typeId1/DJI Air 2S.jpg', 1);
INSERT INTO `good` VALUES (4, 1, 'DJI Mavic 3 Classic（带屏遥控器）', 10888.00, 'img/goodImg/typeId1/DJI Mavic 3 Classic（带屏遥控器）.jpg', 1);
INSERT INTO `good` VALUES (5, 1, 'DJI Avata 进阶套装', 8498.00, 'img/goodImg/typeId1/DJI Avata 进阶套装.jpg', 1);
INSERT INTO `good` VALUES (6, 1, 'DJI FPV 套装', 5999.00, 'img/goodImg/typeId1/DJI FPV 套装.jpg', 1);
INSERT INTO `good` VALUES (7, 1, '悟 Inspire 2', 19999.00, 'img/goodImg/typeId1/悟 Inspire 2.jpg', 1);
INSERT INTO `good` VALUES (8, 1, 'DJI Mavic 3', 12888.00, 'img/goodImg/typeId1/DJI Mavic 3.jpg', 1);
INSERT INTO `good` VALUES (9, 1, '御 Mavic Air 2', 4999.00, 'img/goodImg/typeId1/御 Mavic Air 2.jpg', 1);
INSERT INTO `good` VALUES (10, 1, 'DJI Mini SE', 1999.00, 'img/goodImg/typeId1/DJI Mini SE.jpg', 1);
INSERT INTO `good` VALUES (11, 2, 'Osmo Mobile 6', 999.00, 'img/goodImg/typeId2/Osmo Mobile 6.jpg', 1);
INSERT INTO `good` VALUES (12, 2, 'Osmo Action 3 标准套装', 2299.00, 'img/goodImg/typeId2/Osmo Action 3 标准套装.jpg', 1);
INSERT INTO `good` VALUES (13, 2, 'Osmo Mobile SE', 599.00, 'img/goodImg/typeId2/Osmo Mobile SE.jpg', 1);
INSERT INTO `good` VALUES (14, 2, 'DJI RS 3', 2999.00, 'img/goodImg/typeId2/DJI RS 3.jpg', 1);
INSERT INTO `good` VALUES (15, 2, 'DJI RS 3 Pro', 5499.00, 'img/goodImg/typeId2/DJI RS 3 Pro.jpg', 1);
INSERT INTO `good` VALUES (16, 2, 'DJI Action 2 双屏套装', 3499.00, 'img/goodImg/typeId2/DJI Action 2 双屏套装.jpg', 1);
INSERT INTO `good` VALUES (17, 2, 'DJI Mic', 2299.00, 'img/goodImg/typeId2/DJI Mic.jpg', 1);
INSERT INTO `good` VALUES (18, 2, 'DJI Ronin 4D-6K', 43888.00, 'img/goodImg/typeId2/DJI Ronin 4D-6K.jpg', 1);
INSERT INTO `good` VALUES (19, 2, 'DJI Transmission', 13499.00, 'img/goodImg/typeId2/DJI Transmission.jpg', 1);
INSERT INTO `good` VALUES (20, 2, 'DJI Pocket 2', 2499.00, 'img/goodImg/typeId2/DJI Pocket 2.jpg', 1);
INSERT INTO `good` VALUES (21, 2, 'DJI RSC 2', 2299.00, 'img/goodImg/typeId2/DJI RSC 2.jpg', 1);
INSERT INTO `good` VALUES (22, 2, 'Ronin SC 如影 SC 单手持微单稳定器', 1299.00, 'img/goodImg/typeId2/Ronin SC 如影 SC 单手持微单稳定器.jpg', 1);
INSERT INTO `good` VALUES (23, 2, 'Osmo Action 3 全能套装', 2999.00, 'img/goodImg/typeId2/Osmo Action 3 全能套装.jpg', 1);
INSERT INTO `good` VALUES (24, 2, 'DJI Action 2 续航套装', 2799.00, 'img/goodImg/typeId2/DJI Action 2 续航套装.jpg', 1);
INSERT INTO `good` VALUES (25, 2, 'Osmo Mobile 6 直播套装', 3298.00, 'img/goodImg/typeId2/Osmo Mobile 6 直播套装.jpg', 1);
INSERT INTO `good` VALUES (26, 2, 'DJI Action 2 第一视角续航套装', 3157.00, 'img/goodImg/typeId2/DJI Action 2 第一视角续航套装.jpg', 1);
INSERT INTO `good` VALUES (27, 2, 'DJI 体感控制器专业版', 8000.00, 'img/goodImg/typeId2/DJI 体感控制器专业版.jpg', 1);
INSERT INTO `good` VALUES (28, 3, 'DJI Care 随心换 1 年版（DJI Mavic 3 Classic）', 988.00, 'img/goodImg/typeId3/DJI Care 随心换 1 年版（DJI Mavic 3 Classic）.jpg', 1);
INSERT INTO `good` VALUES (29, 3, 'DJI Care 随心换 1 年版（Osmo Mobile 6）', 49.00, 'img/goodImg/typeId3/DJI Care 随心换 1 年版（Osmo Mobile 6）.jpg', 1);
INSERT INTO `good` VALUES (30, 3, 'DJI Care 随心换 1 年版（Osmo Mobile SE）', 39.00, 'img/goodImg/typeId3/DJI Care 随心换 1 年版（Osmo Mobile SE）.jpg', 1);
INSERT INTO `good` VALUES (31, 3, 'DJI Care 随心换 1 年版（Osmo Action 3）', 109.00, 'img/goodImg/typeId3/DJI Care 随心换 1 年版（Osmo Action 3）.jpg', 1);
INSERT INTO `good` VALUES (32, 3, 'DJI Care 随心换 1 年版（DJI Avata）', 369.00, 'img/goodImg/typeId3/DJI Care 随心换 1 年版（DJI Avata）.jpg', 1);

-- ----------------------------
-- Table structure for orderproduct
-- ----------------------------
DROP TABLE IF EXISTS `orderproduct`;
CREATE TABLE `orderproduct`  (
  `orderid` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `goodid` int(4) NOT NULL,
  `number` int(4) NOT NULL,
  INDEX `orderid`(`orderid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orderproduct
-- ----------------------------
INSERT INTO `orderproduct` VALUES ('120221128200408', 2, 1);
INSERT INTO `orderproduct` VALUES ('120221128223728', 1, 2);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `orderid` varchar(18) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` datetime(0) NOT NULL,
  `userid` int(4) NOT NULL,
  `price` double(9, 2) NOT NULL,
  `state` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`orderid`) USING BTREE,
  INDEX `userid`(`userid`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('120221128200408', '2022-11-28 20:04:08', 1, 4788.00, 1);
INSERT INTO `orders` VALUES ('120221128223728', '2022-11-28 22:37:28', 1, 9999.00, 0);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `userid` int(4) NOT NULL AUTO_INCREMENT,
  `password` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nickname` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '用户',
  `name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telephone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mail` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, '123', '管理员', '张三', '13415001085', '10086@qq.com', '广东省广州市天河区');
INSERT INTO `users` VALUES (2, '123', '用户', '李四', '13415001084', '100861@qq.com', '广东省广州市白云区');
INSERT INTO `users` VALUES (3, '123', '用户', '王五', '13415001083', '1008611@qq.com', '广东省广州市番禺区');
INSERT INTO `users` VALUES (5, '123', '用户', 'admin', '13415001000', 'hanli_147@qq.com', NULL);

SET FOREIGN_KEY_CHECKS = 1;
