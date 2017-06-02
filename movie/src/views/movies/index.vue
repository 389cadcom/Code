<template>
<section class="grid has-search-bar">
	<div v-if="inTheater.title" class="inTheater">
		<h2>
			{{ inTheater.title }}
			<router-link :to="{ name:'movie-list', query:{ type: inTheater.type } }" class="more">更多></router-link>
		</h2>
		<div class="card">
			<router-link :to="{ name:'movie-details', params:{ id: movie.id } }" class="item"
			 v-for="movie in inTheater.list" :key="movie">
			 	<div class="cover">
	              <div class="wp">
	                <img class="img-show" :src="movie.images.medium"/>
	              </div>
	            </div>
	            <div class="info">
	            	<h3>{{movie.title}}</h3>
	            </div>
			</router-link>
		</div>
	</div>
	<v-load :show="loading"></v-load>
</section>
</template>

<script>
import vLoad from '../../components/Loading.vue';
import {API_TYPE, fetchMoviesByType} from '../../api/API.js'


export default {
	data(){
		return {
			loading: true,
			inTheater: {				//正在上映
				type: '',
				id: '01',
				list: [
					{title: 'A', images: {medium:'/src/assets/img/logo.png'}}
				]
			},
			comingSoon: {				//即将上映
				type: ''
			}
		}
	},
	components:{
		vLoad
	},
	mounted(){
		let type = API_TYPE.movie.now;
		fetchMoviesByType(API_TYPE.movie.now, 0, 9)
			.then(res=>{
				this.inTheater.type  = type;
				this.inTheater.title = res.title;
				this.inTheater.list = res.subjects;
				this.loading = false;
			})
	}
}
</script>

<style>
</style>