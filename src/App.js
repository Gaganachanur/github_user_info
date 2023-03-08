import React ,{useState, useEffect}from 'react';
import './styles.css';

function App() {

  const [val, setVal] = useState(null);
  const [rdata, setRdata] = useState([]);
  const [check, setCheck] = useState();
  

  const  callApi =() =>{

   fetch(`https://api.github.com/users/${val}/repos`)
	.then(response => response.json())
	.then(data => {

    data.sort((a, b) => (a.size < b.size) ? 1 : -1)
    setRdata(data)
    
  })
	.catch(err => console.error(err));
  }

console.log(rdata)

  return (
    <div className="App">
      <div className="input">
        <label htmlFor="username">Github username: </label>
        <input onChange={(e)=>setVal(e.target.value)} id="username" type="text" />
        <label  htmlFor="fork">Include forks: </label>
        <input id="fork" type="checkbox"  onChange={(e)=>setCheck(e.target.checked)}/>
        <button onClick={callApi}  disabled={val === null? true :false}>Submit</button>
      </div>
    {rdata.length === 0?<div className="error"> Not Found</div>:''}
     
      { rdata?
      <section>
           {rdata.length !== 0?
        <header>
          <div className="col">Name</div>
          <div className="col">Language</div>
          <div className="col">Description</div>
          <div className="col">Size</div>
        </header>:''
      }
             
          { rdata !== null ?rdata
          .filter(value => !check ?value.fork === false: value.id )
          .map((value)=>{
          return(
          <div>
          <div className="col">{value.name}</div>
          <div className="col">{value.language}</div>
          <div className="col">{value.description}</div>
          <div className="col">{value.size}</div>
          </div>
          )

          }):''
            }
          
        
      </section>: ''
}


      {/* <div className="error">Dummy error</div> */}
    </div>
  );
}

export default App;
