//
import Vue from 'vue'
import utils from './utils.js'

Vue.filter('format', (value, format) => {
	return utils.dataFormat(value, format)
})


//Table mixins
export default {
  data(){
    return {
      pages: 1,
      sizes: 10,
      total: 0,
      keyword: '',
      tableData: []
    }
  }
}