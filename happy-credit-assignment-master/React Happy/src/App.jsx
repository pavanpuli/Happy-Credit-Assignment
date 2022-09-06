
import './App.css';
import ReactPaginate from "react-paginate"
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [items,setitems]=useState([])
  // const [search,setsearch]=useState("")

  const [current,setcurrent]=useState(0)
  const [render,setrender]=useState(false)
   const limit=9;
  
  // search functions

    const searchitems=async(search)=>{
      await fetch(`https://jsonplaceholder.typicode.com/posts?q=${search}`)
      .then((res)=>{return res.json()})
      .then((data)=>{setitems(data)})
      .catch((error)=>console.error(error))
    }
    
    const handleSearch=(e)=>{
      if(e.target.value.length>2){
        setcurrent(0)
        searchitems(e.target.value)
      }else if(e.target.value.length<2){
        setrender(!render)
      }
    }
  

    // on landing function
  useEffect(()=>{
    // let url= search && search.length>2 ?`https://jsonplaceholder.typicode.com/posts?q=${search}&_limit=${limit}`:
     

    const landingitem=async()=>{
      await fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res)=>{return res.json()})
      .then((data)=>{setitems(data)})
      .catch((error)=>console.log(error))
    }
    landingitem()
  },[limit,render]);



  
// pagination function
  const handelPageClick=(e)=>{
    setcurrent(e.selected)
  }
  const offset=((current)*limit)
  const data=items.slice(offset,(offset+limit))



  // alert user detalis function
  const handleUserdesc = async(id)=>{
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res)=>res.json())
      .then((data)=>alert("Name:--"+data.name+"\n"+
      "Username:--"+data.username+"\n"+
      "Address:--"+data.address.city+"\n"+
      "Company:--"+data.company.name))
      .catch((error)=>console.log(error))

  }

  console.log(current)
  // used bootstrap className for styling

  return (
    <div className="container" >

      {/* search bar */}
      <div className="inp">
        <input type="text" onChange={(e)=>handleSearch(e)} placeholder='Search by Title'/>
      </div>


      {/* cards */}
      <div className="row m-5"  >

      {data && data.map((item)=>(
        // card
        <div key={item.id} className="col-sm-6 col-md-4 v my-5" >
            {/* card items */}
          <div className="card" style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.body}</p>
              <button onClick={()=>handleUserdesc(item.userId)} className="btn btn-primary">View User</button>
            </div>
          </div>

        </div>

      ))}</div>

      
      {/* pagination component from react-paginate */}
      <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={Math.ceil(items.length/limit)}
      onPageChange={handelPageClick}
      containerClassName={"pagination justify-content-center"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
      />


    </div>
  );
}

export default App;
