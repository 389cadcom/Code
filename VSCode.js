GITHUB TOKEN: 45d313c18adec114ac253581b700324f48c0d3fe
GITHUB GIST: 88daf1f122c1d82bacd9a6b12b6d2554

1.带snippets	一般是代码提示类扩展；
2.带viewer		一般是代码运行预览类扩展；
3.带support		一般是代码语言支持；
4.带document	一般是参考文档类扩展；
5.带Format	 	一般是代码格式化整理扩展；

tab
1. ! 生成html

Ement
http://blog.csdn.net/u011127019/article/details/52263347


2.Ctrl+Alt+鼠标左键  选中多项

3.将自动高亮的变量、字符一次性替换：
双击变量，右键‘更改所有匹配项’。

双击变量，Ctrl+F2

4.跳转到定义处：F12


5.如果要重置同步设置：按ctrl+p输入'>sync'    //ctrl+shift+p
upload: shift+alt+u, downland: shift+alt+d


6.项目切换  Ctrl+P  >proj edit

7. lang  -> configure language   "locale":"zh-CN"

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