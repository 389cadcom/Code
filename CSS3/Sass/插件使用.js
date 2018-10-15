/**
webpack-spritesmith
$sprite: nth($spritesheet-sprites, 1);
.icon{
  @include sprite-image($sprite);
  @include sprite-position($sprite);
  @include sprite-width($sprite);
  @include sprite-height($sprite);
}
@include sprites;

&.#{$sprite-name} {
	// @include sprite($sprite);
	@include sprite-position($sprite)
}
*/

sass”Îcompass