<template>
<section class="grid has-search-bar" v-infinite-scroll="fetchSearch" infinite-scroll-disabled="busy"
	infinite-scroll-distance="10">
	<h2>搜索 "{{$route.query.query}}" 的结果</h2>
	<!--<h2>{{movies.title}}</h2>-->
	<div class="card">
		<router-link :to="{name: 'movie-details', params: {id: movie.id}}" class="item"
			v-for="movie in movies.list" :key="movie">
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
	<v-load :show="loading"></v-load>
</section>
</template>

<script>
import vLoad from '../../components/Loading.vue';	
import {fetchMoviesBySearch} from '../../api/API';
import infiniteScroll from 'vue-infinite-scroll';

export default {
	components: { vLoad },
	directives: { infiniteScroll },
	data(){
		return {
			loading: true,
			busy: false,
			query: '',
			movies: {
				list:[]
			}
		}
	},
	created(){
		this.query = this.$route.query.query;
		this.fetchSearch();
	},
	watch:{
		'$route': 'reSearch'
	},
	methods:{
		reSearch(){
			this.movies.list = [];
			this.busy = false;
			
			this.loading = true;
			this.query = this.$route.query.query;
			
			this.fetchSearch(this.query);
		},
		fetchSearch(){
			let start = this.movies.list.length;
			this.busy = true;
			
			fetchMoviesBySearch(this.query, start)
				.then(res=>{
					this.movies.title = res.title;
					this.movies.total = res.total;
					this.movies.list  = this.movies.list.concat(res.subjects);
					
					if(this.movies.list.length < this.movies.total){
						this.busy = false;
					}
					this.loading = false;
				})
		}
	}
}
</script>

<style>
</style>