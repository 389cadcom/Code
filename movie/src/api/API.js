import axios from 'axios';

export const API_TYPE = {
    movie: {
        now: 'in_theaters',
        soon: 'coming_soon',
    }
}

export function fetch(url){
    return new Promise((resolve, reject)=>{
        axios.get(url)
            .then(res=>{
                resolve(res.data)
            })
            .catch(err=>{
                reject(err);
            })
    })
}

export function fetchListByType(type){
    return fetch(`/api/movie/${type}`);
}

export function fetchMoviesByType(type, start=0, count=20){
   return fetch(`/api/movie/${type}?start=${start}&count=${count}`)
}

export function fetchMoviesById(id){
   return fetch(`/api/movie/subject/${id}`)
}

export function fetchMoviesBySearch(text, start=0){
   return fetch(`/api/movie/search?q=${text}&start=${start}`)
}