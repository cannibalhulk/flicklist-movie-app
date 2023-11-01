import { MovieData } from "../types/MovieDataType";

export default function selection_sort(filter: "title" | "vote_average", data: MovieData, _type: "inc" | "dec") {
    for(let i = 0; i  < data.results.length-1; i++) {
        let min = i;
        if(_type === "inc") {
           for(let j=i+1; j < data.results.length; j++) {
                if(data.results[j][filter] < data.results[min][filter]){
                    min = j;
                }
            } 
        } else{
            for(let j=i+1; j < data.results.length; j++) {
                if(data.results[j][filter] > data.results[min][filter]){
                    min = j;
                }
            } 
        }
        
        const temp = data.results[i];
        data.results[i]= data.results[min];
        data.results[min] = temp;
    }
    return data
}