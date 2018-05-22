1.带snippets	一般是代码提示类扩展；
3.带support		一般是代码语言支持；
5.带Format	 	一般是代码格式化整理扩展；
2.带viewer		一般是代码运行预览类扩展；
4.带document	一般是参考文档类扩展；

svg view

svg --> svg language support


/*
"terminal.integrated.shell.windows": "D:\\Program Files\\cmder\\cmder.exe"

Ctrl + Shift + K			收缩代码
Ctrl + K					展开代码

Ctrl + U					大小写
Ctrl + Shift + U

ctrl+alt+i					文件头注释			//vscode-fileheader

ctrl+shift+p webpack create webpack创建

Alt + 点击					多行编辑

Ctrl + F					查找及查找下一个

Ctrl + Shift + B		    运行生成任务

project Manager				项目切换 Shift + Alt + E
*/
Ement
http://www.iteye.com/news/27580

tab
1.! 生成html

2.cmd设置： terminal.integrated.shell.windows

3.将自动高亮的变量、字符一次性替换： //双击变量，右键‘更改所有匹配项’。

4.跳转到定义处及导入文件：Ctrl+ 点击

5.同步设置：
按ctrl+p输入'>sync'    //ctrl+shift+p
upload: shift+alt+u, downland: shift+alt+d

6.插件位置：
C:\Users\ 你的用户名\.vscode\extensions

7. 语言设置：命令 lang  -> configure language   "locale":"zh-CN"		//en-Us

8.自定义代码段  文件 -> 首选项 -> 用户代码片段

Ement生成：
db		-> display:block;
dn		-> display:none;
w10		-> width: 10px;
w5p		-> width: 5%;
pl10	-> padding-left:10px;



/**VSCode整理*/
ext install vscode-codemetrics    //代码重构


PHP--XDebug
1.php-xdebug
2.浏览器启动xdebug
3.配置php.ini
4.浏览器运行项目


//Task
// Sass configuration
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "taskName": "Sass Compile",
            "type": "shell",
            "command": "node-sass style.scss style.css",
            "group": "build"
        }
    ]
}

//babel 
{
	"type": "npm",
	"script": "build",
	"group": {
		"kind": "build",
		"isDefault": true
	}
}