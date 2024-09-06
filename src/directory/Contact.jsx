// import logo from '../logo.svg';
import '../App.css';
import { useState } from "react";

function Contact() {
const [list, setList] = useState([]);

const [editTime, seteditTime] = useState(false)

const [formData, setformdata] = useState({
  name :"",
  address : "",
  telephone : "",
});

const handleChange = (event)=>{
  let {name, value} = event.target

  setformdata({
    ...formData,
    [name]:value
  })
};

function deleteData(id) {
  setList(
    list.filter(i=>i.id!=id)
  )
  
}

const handleSave = ()=>{
 
  let item ={
    name:formData.name,
    address:formData.address,
    telephone:formData.telephone,
    id:Number(list.length)+1,

  }

  setList(
    [...list,item]
  )

  setformdata({
  name :"",
  address : "",
  telephone : "",
})
}

function HandleEditState(id) {
  setformdata(list.find(i=>i.id==id))
  seteditTime(true)
}

function handleSaveEdit() {

  let fileteredDelete =list.filter(i=>i.id!=formData.id)

  setList(
    [...fileteredDelete,formData]
  )

  seteditTime(false)

  setformdata({
    name :"",
    address : "",
    telephone : "",
  })
  
}
  return (
   <div className='container'>
   <div className='card mt-3'>
    <div className='card-body '>
     <h5> Add new Contact</h5>
    <div className='border border-secondary border-2 p-3'>
      <form action=''>
      <div className='row'>
          <div className='col md-12'>
          <div className='form-group'>
          <label htmlFor="" className='mb-2 fw-bold'>Contact Name</label>
          <input type='text' name="name" value={formData.name} onChange={handleChange} className='form-control' />
          </div>
          </div>
        </div>
        <div className='row mt-1'>
          <div className='col md-12'>
          <div className='form-group'>
          <label htmlFor="" className='mb-2 fw-bold'> Station Address</label>
          <input type='text' name='address' onChange={handleChange} className='form-control' value={formData.address} />
          </div>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col md-12'>
          <div className='form-group'>
          <label htmlFor='' className='mb-2 fw-bold'>Telephone Number</label>
          <input type='text' name='telephone' onChange={handleChange} className='form-control' value={formData.telephone}/>
          </div>
          </div>
        </div>
        <hr/>
        <button  type='button' onClick={editTime?handleSaveEdit:handleSave} className={editTime?'btn btn-success':'btn btn-primary'}> {editTime?"Update Contact":"Save Contact"} </button>
      </form>
    </div>
    <div className='border border-2 mt-5 p-3'>
     
        <h4>Contact List</h4>
   
        {
          list.map((i,index)=>(
            <div key={index} className='text-wrapper'>
              <div>
              <h5>{i.name}</h5>
              <p>{i.address} <span className='text-danger fw-bold'>{i.telephone}</span></p>
              </div>
              <div className='btn-group'>
                <button type='button' className='btn btn-warning' onClick={()=>HandleEditState(i.id)}>Edit</button>
                &nbsp;
                <button type='button' className='btn btn-danger' onClick={()=>deleteData(i.id )}>Delete</button>
              </div> 
          </div>
          ))
        }
        
        
    </div>
    </div>
   </div>
    
   </div>
  );
}

export default Contact;

