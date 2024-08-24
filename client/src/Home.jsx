import React,{useState,useEffect} from "react";
import ItemCard from "./ItemCard";
import axios from "axios";
const Home = () => {
    const [list,setList]=useState(null);
    
    useEffect(()=>{
       function getItems(){
            axios.get('http://localhost:5000/getitems').then(resp=>{console.log(resp.data);setList(resp.data)}).catch(error => {
                console.error('Error:', error);
            });
        }
        getItems();
    },[])
    
    return <>
        {list && list.map((obj)=>(
            <ItemCard obj={obj} />
        ))}
    </>
}
export default Home;