<template>
<div>
	<mt-index-list>
		<mt-index-section v-for="item,i in list" :index="item.letter" :key="i">
		    <mt-cell v-for="cell,i in item.cells" :title="cell" :key="i"></mt-cell>
		</mt-index-section>
	</mt-index-list>
</div>
</template>

<script>
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

<style>
.mint-indexlist ul, .mint-indexlist li{width: 100%; text-align: left;}	
</style>