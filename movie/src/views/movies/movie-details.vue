<template>
<div class="">
	<div class="detail-card" v-if="movie.title">
		<div class="title">{{movie.title }}&nbsp;</div>
		<div> <img :src="url" style="width:100%"> </div>
	  	<section class="subject-info"></section>
	  	<section class="subject-mark">
			<div class="mark-item">
			  <a><span>想看({{movie.wish_count}})</span></a>
			  <a><span>看过</span></a>
			</div>
		</section>
		<section class="subject-intro">
			<h2>{{movie.title}}的剧情介绍</h2>
			<div class="bd">
			  <p>
			    {{movie.summary}}
			  </p>
			</div>
		</section>
	</div>
	<v-load :show="loading"></v-load>
</div>
</template>

<script>
import vLoad from '../../components/Loading.vue'
import {fetchMoviesById} from '../../api/API';

export default {
	components:{ vLoad },
	data(){
		return {
			id: '',
			url: '',
			loading: true,
			movie:{}
		}
	},
	created(){
		this.id = this.$route.params.id;
		fetchMoviesById(this.id)
			.then(res=>{
				this.url = res.images.large;
				this.movie = res;
				this.loading = false;
			})
	}
}

</script>

<style scoped lang="scss">
  .detail-card {
    background: #fff;
    border-radius: 10px;
    padding: 10px 15px;;
    -webkit-text-size-adjust: 100%;
    .title {
      font-size: 16px;
      line-height: 32px;
      word-break: break-all;
    }
    section {
      margin-bottom: 30px;
      p {
        font-size: 15px;
        color: #494949;
        line-height: 1.5;
      }
    }
    .subject-info {
      position: relative;
      overflow: hidden;
      margin-top: 10px;
      line-height: 1.5;
    }
    .subject-mark{
      .mark-item{
        margin-bottom: 30px;
        display: -webkit-box;
        display: -moz-box;
        display: box;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -moz-box-align: center;
        box-align: center;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        -o-align-items: center;
        align-items: center;
        -ms-flex-align: center;
        a{
          height: 30px;
          line-height: 30px;
          display: block;
          border: 1px solid #ffb712;
          border-radius: 3px;
          margin-right: 10px;
          color: #ffb712;
          font-size: 15px;
          text-align: center;
          -webkit-box-flex: 1;
          -moz-box-flex: 1;
          box-flex: 1;
          -webkit-flex: 1;
          -moz-flex: 1;
          -ms-flex: 1;
          flex: 1;
        }
      }
    }
    .subject-intro {

      h2 {
        color: #aaa;
        margin: 0 0 15px;
        font-size: 15px;
      }
    }
  }
</style>