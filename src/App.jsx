import React, { useEffect } from 'react'
import Table from './components/Table/Table'
import FilterContainer from './components/Filter Container/FilterContainer'
import { useDispatch } from 'react-redux'
import { setCalculating, setData, setRawData } from './redux/homeSlice'

const App = () => {
  const dispatch=useDispatch()

  //FETCHING DATA FROM CSV
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
              //SAVE RAW DATA OF CSV
             dispatch( setRawData(data))
             //CONVERT RAW DATA TO JSON AND SAVE
              dispatch(setData(csvJSON(data)))
             

              dispatch(setCalculating(false))
          } else {
              console.log(`Error code ${res.status}`);
          }
      } catch (err) {
          console.log(err)
      }
  }

  //FUNCTION FOR CONVERTING CSV RAW DATA TO JSON
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