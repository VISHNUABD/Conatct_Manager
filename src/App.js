import React,{useState,useEffect} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";



const App=()=> {
  return <Contacts />
}

const Contacts=()=>{

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const[name,changename]=useState("");
  const[num,setnum]=useState("")
  const[email,emailfun]=useState("")
  const[checkemail,checkemailfun]=useState("")
  const[lst,changelst]=useState([]);
  

const newname=(event)=>{
changename(event.target.value);
}

const newnum=(e)=>{
  setnum(e.target.value)
}

const emailfunction=(ev)=>{
  emailfun(ev.target.value)
}

const handleSubmit=()=>{
  axios.post("http://localhost:8000/userslist",{name:name,num:num,email:email}).then(success=>{
    console.log(success.data);
    changelst([...lst,success.data]);
    changename("");
  })

}

useEffect(()=>{
  fetch()
},[])

const fetch=()=>{
  axios.get("http://localhost:8000/userslist").then(success=>{
    changelst(success.data)
  }).catch(error=>{
    console.log("error")
  })
}

const buttonaction=(deleteid)=>{
    axios.delete("http://localhost:8000/userslist/"+deleteid).then(success=>{
      fetch()
if(success.Status===200 && success.Text==="OK")
{
    changename([name.filter(i=>i.id!==deleteid)])
}
})
}

const updateaction=(updateid)=>{
  let a=prompt("enter the updated name");
  let b=prompt("enter the updated number");
  axios.put("http://localhost:8000/userslist/"+updateid,{name:a,num:b}).then(success=>{
    fetch()
    changelst(lst.map(i=>i.id===updateid?[...lst,success.data]:[lst])
  )})
}

return (
  <div className="container-fluid">
  <div  style={{background:"lightgrey"}}>
    <form>
      <h2 style={{background:"lightblue",textAlign:"center"}} >CONTACT MANAGER</h2>
    Name:<input className="form-control" style={{width:700,height:40}} type='text' id='t1' value={ name} onChange={newname}></input>
    <br></br>
    <div></div>
    Number:<input className="form-control" style={{width:700,height:40}}  type="text" onChange={newnum}></input> <br></br>
    Email:<input className="form-control" style={{width:700,height:40}} type="text" onChange={emailfunction}></input>
     {/* <input type='submit' id='b1' value='submit' onClick={fun}></input>  */}
     <br></br>
     <span ><button className="btn btn-primary btn-lg btn-block" onClick={handleSubmit}>Add Contact</button></span>
     
     
     {/* <button onClick={handleUpdate}>update</button> */}
     </form>
     <table className="table">
       <thead>
         <th>NAME</th>
         <th>NUMBER</th>
         <th>EMAIL</th>
       </thead>
       <tbody>
           {
             lst.map((i=>
              {
              return(
                <tr key={i.id} >
              <td>
                {i.name}
              </td>
              <td>
                {i.num}
              </td>
              <td>
              {i.email}
              <button className="btn btn-danger float-right"  style={{marginLeft:"20px"}} onClick={()=>buttonaction(i.id)}>DELETE</button>
              <button className="btn btn-info float-right" style={{marginLeft:"20px"}} onClick={()=>updateaction(i.id)}>UPDATE</button>
              
              </td>
              </tr>)
           })
             )
          }
       </tbody>
     </table>
    {/* {
       lst.map((i=>
        {
        return(
  <span><tr><th>Name</th></tr><tr><td key={i.id} >{i.name}</td></tr></span> <span><tr><th>Number</th></tr><td>{i.num}</td></span>
<br></br>
 <span><button className="btn btn-info " onClick={()=>buttonaction(i.id)}>DELETE</button></span>
<span><button className="btn btn-info" onClick={()=>updateaction(i.id)}>UPDATE</button></span>)
       }))
     } */}


  </div>
  </div>
)
}
export default App;
