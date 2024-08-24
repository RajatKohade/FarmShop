import axios from "axios";
import React from "react";
import {useNavigate} from "react-router-dom";
export default function AddNewItem() { 
    const navigate=useNavigate()
    const [responseData,setResponseData]=React.useState(null);
    const sendForm=event=>{
        event.preventDefault();
        axios.defaults.withCredentials=true;
        const formdata = new FormData(event.currentTarget);
        let data={
            title:formdata.get('title'),
            price:formdata.get('price'),
            decription:formdata.get('decription'),
            image:formdata.get('image')
        }
        console.log(data);
        axios.post('http://localhost:5000/addnewitem',data,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(response=>setResponseData(response.data)).catch((error=>{console.log(error)}));
       console.log(responseData)
       if(responseData && responseData.data==true)
       {
        navigate('/')
       }
       else
       {
        navigate('/signin')
       }
    }
    
    return <>
        <form className="form" onSubmit={sendForm}>
            <div className="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Title" name="title"/>
            </div>
            <div className="form-group">
                <label for="exampleFormControlInput1">Price</label>
                <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Price (rs/kg)" name="price"/>
            </div>
            <div className="form-group">
                <label for="exampleFormControlFile1">Example file input</label>
                <input type="file" className="form-control-file" id="exampleFormControlFile1" accept="image/*" name="image"/>
            </div>
            <div className="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="decription"></textarea>
            </div>
            <div className="form-group">
                <input type="submit" className="form-control" id="exampleFormControlInput1" value="Add Item"/>
            </div>
        </form>
    </>
}