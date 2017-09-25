<template>
<div class="page-toast">
	<h1 class="page-title">Picker</h1>
	<div class="page-wrapper">
		<div class="page-picker-wrapper">
	      <mt-picker :slots="numberSlot" @change="onNumberChange" :visible-item-count="1"></mt-picker>
	    </div>
	    <p class="page-picker-desc">动态默认选项: {{ number }}</p>
	    <div class="page-picker-wrapper">
	      	<mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="1"></mt-picker>
	    </div>
	    <p class="page-picker-desc">地址: {{ addressProvince }} {{ addressCity }}</p>
	    <br>
	    <div class="page-picker-wrapper">
	      	<mt-picker :slots="streetSlots" @change="onStreetChange" :visible-item-count="1"></mt-picker>
	    </div>
	</div>
</div>
</template>

<script>
import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker)

/*
	Picker初始默认值有问题，需另外处理, defaultIndex初始值不能与设置的相等
	this.$nextTick(()=>{
		setTimeout(()={
			this.numberSlot[0].defaultIndex = 1;
		}, 100)
	});
	
*/
const address = {
    '北京': {
    	'北京':{'海淀': ['北大', '清华'] }
    },
    '福建': {
    	'福州':{'鼓楼':['鼓东','鼓西'], '台江':['上海','黎明']}, 
    	'厦门':{'思明':['莲花','中山'], '湖里':['会展','前莆']}
    }
};

export default {
	data(){
		return {
			number: 'A',
			numberSlot: [ {
				  flex: 1,
				  defaultIndex: 1,
		          values: ['A', 'B', 'C', 'D', 'E', 'F', "G"],
		          className: 'slot1'
				}
			],
			addressSlots: [
		          {
		            flex: 1,
		            defaultIndex: 0,
		            values: Object.keys(address),
		            className: 'slot1',
		            textAlign: 'center'
		          }, {
		            divider: true,
		            content: '-',
		            className: 'slot2'
		          }, {
		            flex: 1,
		            values: [],
		            className: 'slot3',
		            textAlign: 'center'
		          },  {
		            divider: true,
		            content: '-',
		            className: 'slot4'
		          }, {
		            flex: 1,
		            values: [],
		            className: 'slot5',
		            textAlign: 'center'
		          }
	        ],
	        streetSlots: [{
	            flex: 1,
	            values: [],
	            className: 'slot1',
	            textAlign: 'center'
	        }],
	        addrStreets: [],
	        addrProvince: '',
	        addrCity: '',
	        addrArea: '',
	    }
	},
	created(){
		this.$nextTick(() => {
	      	setTimeout(()=>{
	      		//TODO 
	      		this.numberSlot[0].defaultIndex = 0;
	      		this.addressSlots[0].defaultIndex = 1;
	      	}, 10);
      	});
	},
	methods: {
		onNumberChange(picker, values) {
			this.number = values[0];
			var val = picker.getSlotValue(0);
	   },
	   onAddressChange(picker, values) {
	   		//市
	   		if(!values[0]) return;
	   		var city = Object.keys(address[values[0]]);
        	picker.setSlotValues(1, city);
        	
        	//区、县
	   		if(!values[1]) return;
	   		var area = address[values[0]][values[1]];
	   		if(area){
	   			picker.setSlotValues(2, Object.keys(area));
	   			
				//街道
	   			if(!values[2]) return;
	   			var steets = area[values[2]];
	   			this.addrStreets = steets
	   			this.addrArea = values[2];
	   		}
      	},
      	onStreetChange(picker, values){
      		console.log(values[0])
      	}
	},
	watch:{
		addrArea(){
			this.streetSlots[0].values = this.addrStreets;
		}
		/*addrArea: {
			handler(val, oldVal){
				console.log(val, oldVal)
			}
		}*/
	}
}
</script>

<style lang="scss">
.page-picker-desc{
   margin: 10px 0 50px;
   color: #666;
}
</style>