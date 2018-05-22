

//expanded compact compressed
sass -t expanded  src/index.scss index.css --sourcemap=none

sass -t expanded --watch src/index.scss 


//三目运算
top: if($direction==left, 1px, 0);