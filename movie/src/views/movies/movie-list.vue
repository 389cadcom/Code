<template>
<section class="grid has-search-bar" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" >
    <h2>{{movieList.title}}</h2>
    <div class="card">
		<router-link :to="{ name:'movie-details', params:{ id: movie.id } }" class="item"
		 v-for="movie in movieList.list" :key="movie">
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
import {fetchMoviesByType} from '../../api/API';
import InfiniteScroll from 'vue-infinite-scroll';	
	
export default {
	components: { vLoad },
	directives: { InfiniteScroll },
	data(){
		return {
			loading: true,
	        type: '',
	        movieList: {
	        	list: [
//					{title: 'A', images: {medium:'/src/assets/img/logo.png'}}
				]
	        },
	        busy: false,
		}
	},
	created(){
		this.type = this.$route.query.type;
		
		this.loadMore()
	},
	methods:{
		loadMore(){
			let start = this.movieList.list.length;
	        this.busy = true;
	        
	        fetchMoviesByType(this.type, start)
                .then(data => {
                	console.log(data.subjects);
                	
					this.movieList.title = data.title;
					this.movieList.total = data.total;
					this.movieList.list  = this.movieList.list.concat(data.subjects);;
					 
					if (this.movieList.list.length < this.movieList.total) {
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