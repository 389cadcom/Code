USE `db_admin`;

DROP TABLE IF EXISTS `tb_admin`;

CREATE TABLE `tb_admin` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `users` VARCHAR(30) CHARACTER SET gbk NOT NULL,
  `pwd` VARCHAR(30) CHARACTER SET gbk NOT NULL,
  `createtime` DATETIME NOT NULL,
  `email` VARCHAR(40) CHARACTER SET gbk DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MYISAM DEFAULT CHARSET=utf8;

SHOW TABLES;


#查看数据库的表消息
SHOW TABLE STATUS FROM db_admin;

#查看表内容like 
SHOW TABLE STATUS LIKE 'tb_root';	

#重命名表名
RENAME TABLE tb_root TO tb_roots;

ALTER TABLE tb_roots RENAME TO tb_root;

#查看表结构
DESC tb_root;  

SHOW COLUMNS FROM tb_root;

#添加字段、删除
ALTER TABLE tb_root ADD singin INT AFTER users;

ALTER TABLE tb_root DROP singin;

#修改字段modify, change, alter
ALTER TABLE tb_root MODIFY email VARCHAR(40);

ALTER TABLE tb_root CHANGE id userid INT;

#设置默认值
ALTER TABLE tb_root ALTER email SET DEFAULT 'lonves@qq.com'

ALTER TABLE tb_root ALTER email DROP DEFAULT;

#新增主键
ALTER TABLE tb_root ADD PRIMARY KEY primary_name (userid);

ALTER TABLE tb_root DROP PRIMARY KEY;

#普通索引、唯一索引
ALTER TABLE tb_root ADD INDEX index_name (userid, users);

ALTER TABLE tb_root DROP INDEX emp_name2;

ALTER TABLE tb_root ADD UNIQUE unique_name2(userid);

#全文索引
ALTER TABLE tb_root ADD FULLTEXT fulltext_name(users);

SHOW INDEX FROM tb_root;



BEGIN;
INSERT  INTO `tb_admin`(`id`,`users`,`pwd`,`createtime`,`email`) VALUES 
	(1,'张三','*6BB4837EB74329105EE4568DDA7DC','2017-07-12 00:00:00','389cadcom@163.com'),
	(2,'李四','*6BB4837EB74329105EE4568DDA7DC','2017-07-12 00:00:00','389cadcom@163.com'),
	(3,'王五','*6BB4837EB74329105EE4568DDA7DC','2017-07-12 00:00:00','389cadcom@163.com'),
	(4,'赵六','*6BB4837EB74329105EE4568DDA7DC','2017-07-12 00:00:00','389cadcom@163.com'),
	(5,'田七','*6BB4837EB74329105EE4568DDA7DC','2017-07-12 00:00:00','389cadcom@163.com'),
	(6,'王八','*6BB4837EB74329105EE4568DDA7DC','2017-07-12 00:00:00','389cadcom@163.com'),
	(7,'林九','e10adc3949ba59abbe56e057f20f88','2017-07-12 00:00:00','389cadcom@163.com');
COMMIT;

SELECT * FROM `tb_admin`;

UPDATE tb_admin SET users = '赵十' WHERE id = 10;

INSERT INTO tb_admin (users, pwd, createtime, email) VALUES 
	('张三','e10adc3949ba59abbe56e057f20f88','2017-07-12 00:00:00','389cadcom@163.com'),
	('田七','e10adc3949ba59abbe56e057f20f88','2017-07-12 00:00:00','389cadcom@163.com'),
	('赵六','*6BB4837EB74329105EE4568DDA7DC','2017-07-12 00:00:00','389cadcom@163.com');


SELECT users, SUM(singin) AS  singin FROM tb_admin GROUP BY users ORDER BY id ;

#总数 with rollup
SELECT COALESCE(users, '总数'), SUM(singin) AS singin_count FROM  tb_admin GROUP BY users WITH ROLLUP;

#like  正则REGEXP 
SELECT id, users FROM tb_admin WHERE users LIKE '赵%'

SELECT id, users FROM tb_admin WHERE users REGEXP '^赵'

SELECT users FROM tb_admin
UNION
SELECT * FROM tb_root;

#表联合
SELECT a.`id`, a.`singin`, b.`users` FROM tb_admin a LEFT JOIN tb_root b ON a.`users` = b.`users` ORDER BY a.`id`


#临时表
CREATE TEMPORARY TABLE tb_temp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    users VARCHAR(30) NOT NULL,
    pwd VARCHAR(30) NOT NULL,
    email VARCHAR(40) DEFAULT 'lonves@qq.com'
)

INSERT INTO tb_temp (users, pwd) VALUES 
    ('张三', MD5(123)),
    ('李四', MD5(123)),
    ('王五', MD5(123));

SELECT * FROM tb_temp;

SHOW TABLES

#查看创建表信息--复制表
SHOW CREATE TABLE tb_root;

CREATE TABLE `tb_clone` (
  `uid` INT(11) NOT NULL,
  `uname` VARCHAR(30) CHARACTER SET gbk NOT NULL,
  `upwd` VARCHAR(30) CHARACTER SET gbk NOT NULL,
  `email` VARCHAR(40) DEFAULT 'lonves@qq.com',
  PRIMARY KEY (`uid`)
) ENGINE=INNODB DEFAULT CHARSET=utf8

INSERT INTO tb_clone (uid, uname, upwd) SELECT id, users, pwd FROM tb_admin;

SELECT * FROM tb_clone;



<?php
$host = "mysql:host=localhost;dbname=db_admin";
$user = "root";
$pwd  = "";
try{
    $conn = new PDO($host, $user, $pwd);
    // $result = $db->query("set character set 'utf8'");
    $conn->query("set names utf8");
    $result = $conn->query("select * from tb_clone");
    foreach($result as $row){
        echo $row['uid'].":".$row['uname']."<br>";
    } 
    //设置 PDO 错误模式，用于抛出异常
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //$sql = "insert into tb_clone (uname, upwd, email) values ('王八', '123', 'qq.com')";
    $sql = "update tb_clone set uname='郑一' where uid = 1 ";
    //$conn->exec($sql);

    echo "修改成功!";
    
    // echo $str->fetch();

}catch(Exception $e){
    // 如果执行失败回滚
    //$conn->rollback();

    die("Error:".$e->getMessage());
}
$conn = null;
?>

<?php 
    //插入多条，使用事务处理
    /*
    $conn->beginTransaction();
    $conn->exec()
    $conn->commit();
    */
?>

<?php
    //预处理
try{    
    $conn = new PDO($host, $user, $pwd);
    $conn->query("set names utf8");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "update tb_clone set uname = :name where uid = :uid";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':uid', $uid);

    $name = "陈二";
    $uid  = 2;
    $res = $stmt->execute();
    var_dump($res);

    $name = "李四";
    $uid  = 4;
    $res = $stmt->execute();

} catch(Exception $e){
    die("Error:". $e->getMessage());
}