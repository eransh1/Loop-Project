import React, { useEffect } from 'react'
import Table from './components/Table/Table'
import FilterContainer from './components/Filter Container/FilterContainer'
import { useDispatch } from 'react-redux'
import { setCalculating, setData, setRawData } from './redux/homeSlice'

const App = () => {
  const dispatch=useDispatch()
  // const data=useSelector((state)=>state.home.data)
  // const rawData=useSelector((state)=>state.home.rawData)
  // const[rawData,setRawData]=useState([])
 

  useEffect(()=>{
    dispatch(setCalculating(true))
      fetchData()
  //eslint-disable-next-line
    },[])


    async function fetchData(){
      try {
  
          const target = `/dataset_large.csv`;        
          const res = await fetch(target, {
              method: 'get',
              headers: {
                  'content-type': 'text/csv;charset=UTF-8',
              }
          });
  
          if (res.status === 200) {
              const data = await res.text();
             dispatch( setRawData(data))
              // console.log(data);
              dispatch(setData(csvJSON(data)))
             

              dispatch(setCalculating(false))
          } else {
              console.log(`Error code ${res.status}`);
          }
      } catch (err) {
          console.log(err)
      }
  }
  function csvJSON(csv){
  
      var lines=csv.split("\n");
    
      var result = [];
  
      var headers=lines[0].split(",");
    
      for(var i=1;i<lines.length;i++){
    
          var obj = {};
          var currentline=lines[i].split(",");
    
          for(var j=0;j<headers.length;j++){
              obj[headers[j]] = currentline[j];
          }
          result.push(obj);
    
      }
      return (result);
    }

 

  return (
<>
<FilterContainer />
  <Table/>
</>
  )
}

export default App