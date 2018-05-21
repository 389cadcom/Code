//expanded compact compressed
sass -t expanded  src/index.scss index.css --sourcemap=none

sass -t expanded --watch src/index.scss 


//ÈıÄ¿ÔËËã
top: if($direction==left, 1px, 0);