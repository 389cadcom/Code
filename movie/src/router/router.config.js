// 同步组件a
import index from '../views/movies/index.vue'
import list from '../views/movies/movie-list.vue'
import search from '../views/movies/movie-search.vue'
import details from '../views/movies/movie-details.vue'


export default [
    { path: '/movie', component: index, alias: '/', name: 'index' },
    { path: '/movie/list', component: list, name: 'movie-list' },
    { path: '/movie/search', component: search, name: 'movie-search' },
    { path: '/movie/subject/:id', component: details, name: 'movie-details' },
]