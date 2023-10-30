import { MovieDataType } from "../types/MovieDataType";

export default function selection_sort(filter: "title" | "vote_average", data: MovieDataType[], _type: "inc" | "dec") {
    for(let i = 0; i  < data.length-1; i++) {
        let min = i;
        if(_type === "inc") {
           for(let j=i+1; j < data.length; j++) {
                if(data[j][filter] < data[min][filter]){
                    min = j;
                }
            } 
        } else{
            for(let j=i+1; j < data.length; j++) {
                if(data[j][filter] > data[min][filter]){
                    min = j;
                }
            } 
        }
        
        const temp = data[i];
        data[i]= data[min];
        data[min] = temp;
    }
    return data
}