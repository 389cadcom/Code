<template>
<div class="page">
	<div class="page-title">Index List</div>
	<mt-index-list class="page-wraper">
		<mt-index-section v-for="item,i in list" :index="item.letter" :key="i">
		    <mt-cell v-for="cell,i in item.cells" :title="cell" :key="i"></mt-cell>
		</mt-index-section>
	</mt-index-list>
</div>
</template>

<script>
import {IndexList, IndexSection, Cell} from 'mint-ui';
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Cell.name, Cell)
	
const NAMES = ['Aaron', 'Alden', 'Austin', 'Baldwin', 'Braden', 'Carl', 'Chandler', 'Clyde', 'David', 'Edgar', 'Elton', 'Floyd', 'Freeman', 'Gavin', 'Hector', 'Henry', 'Ian', 'Jason', 'Joshua', 'Kane', 'Lambert', 'Matthew', 'Morgan', 'Neville', 'Oliver', 'Oscar', 'Perry', 'Quinn', 'Ramsey', 'Scott', 'Seth', 'Spencer', 'Timothy', 'Todd', 'Trevor', 'Udolf', 'Victor', 'Vincent', 'Walton', 'Willis', 'Xavier', 'Yvonne', 'Zack', 'Zane'];	
export default {
	data(){
		return {
			list: []
		}
	},
	created(){
		'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
			let cells = NAMES.filter(name => name[0] === letter);
			this.list.push({
				letter,
				cells
			});
		})
	},
	methods:{
		
	}
}
</script>

<style lang="scss">
.mint-indexlist-nav{ }
.page .mint-indexlist-navitem{width: 100%; text-align: center; padding-top: 3px;}	
</style>