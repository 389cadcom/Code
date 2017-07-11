
SHOW DATABASES;

CREATE DATABASE db_admin;

DROP DATABASE db_admin;

USE db_admin;

SHOW INDEX FROM tb_admin;

DESC tb_admin;

#显示数据库 db_admin 中所有表的信息
SHOW TABLE STATUS FROM db_admin;

SHOW COLUMNS FROM tb_admin [FROM db_admin];


CREATE TABLE tb_admin(
    id INT(6) AUTO_INCREMENT PRIMARY KEY,
    users VARCHAR(30) NOT NULL,
    pwd VARCHAR(30) NOT NULL,
    createtime DATETIME NOT NULL
);

#重命表
RENAME tb_admin TO tb_root;

#衙命名字段
ALTER TABLE tb_admin CHANGE USER users VARCHAR(30);

#添加字段，修改字段类型
ALTER TABLE tb_admin ADD email VARCHAR(40) NOT NULL, CHANGE USER  MODIFY users VARCHAR(40) NOT NULL;

#删除某一字段
ALTER TABLE tb_admin DROP createtime;

#删除索引
ALTER TABLE tb_admin DROP PRIMARY KEY;

INSERT INTO tb_admin (users, PASSWORD, createtime) VALUES  ('Li', '123456', '2017-07-11');

INSERT INTO tb_admin (users, PASSWORD, createtime) VALUES  ('Wu', '123456', '2017-06-11');

UPDATE tb_admin SET users = 'Zhao' WHERE id=2;

SELECT * FROM tb_admin  ORDER BY createtime ASC;


