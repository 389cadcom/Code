let dataCenter = {
    baseUrl: 'http://example.com/api/data',
    search(query){
        return fetch(`${this.baseUrl}/search?query=${query}`)
            .then(res => res.json())
            .then(rows => {
                //此处的 this 是 DataCenter，而不是 fetch 中的某个实例
                return fetch(`${this.baseUrl}/fetch?ids=${rows.join(',')}`)
            })
            .then( res => res.json() )
    }
};

async function fetchURL(url) { 
    try{
        let response = await fetch(url);
        let data     = await response.json();
        console.log(data);
    }catch(err){
        console.log(err);;
    }
}