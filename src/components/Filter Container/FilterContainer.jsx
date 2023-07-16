import React, { useEffect, useState } from 'react'
import styles from "./FilterContainer.module.css"
import DropDown from './Dropdown/DropDown'
import { useDispatch, useSelector } from 'react-redux'
import { setPageNumber } from '../../redux/tableSlice'
import { setCalculating, setFinalDataToShow } from '../../redux/homeSlice'

const FilterContainer = () => {
  const data=useSelector((state)=>state.home.data)
  const rawData=useSelector((state)=>state.home.rawData)
    const[uniqMod3Array,setUniqMod3Array]=useState([])
    const[uniqMod4Array,setUniqMod4Array]=useState([])
    const[uniqMod5Array,setUniqMod5Array]=useState([])


    const[filteredArrayForMod3,setFilteredArrayForMod3]=useState([])
    const[filteredArrayForMod4,setFilteredArrayForMod4]=useState([])
    const[filteredArrayForMod5,setFilteredArrayForMod5]=useState([])

    const dispatch=useDispatch()

//THE RAW DATA THAT WE GOT INITIALLY IS USED TO GET UNIQUE COLUMN ITMEMS FOR FILTER PURPOSE
useEffect(()=>{
  dispatch(setCalculating(true))
if(rawData.length===0){return}
setUniqMod3Array(getUniqueValuesFromCSV(rawData,"mod350"))
setUniqMod4Array(getUniqueValuesFromCSV(rawData,"mod8000"))
setUniqMod5Array(getUniqueValuesFromCSV(rawData,"mod20002"))
dispatch(setCalculating(false))
//eslint-disable-next-line
},[rawData])


//HERE DEPENDING UPON FILTER APPLIED FINAL ROWS THAT NEED TO BE SHOWN IS CALCULATED
useEffect(()=>{
  dispatch(setCalculating(true))
  dispatch(setPageNumber(0))

if(filteredArrayForMod3.length===0&&filteredArrayForMod4.length===0&&filteredArrayForMod5.length===0){
    dispatch(setFinalDataToShow(data))
    dispatch(setCalculating(false))
    return
}
 if(filteredArrayForMod3.length!==0&&filteredArrayForMod4.length===0&&filteredArrayForMod5.length===0){

    const firstArr=data.filter((item)=>{return filteredArrayForMod3.includes(item.mod350)})
    console.log("firstArr",firstArr.length)
    dispatch(setFinalDataToShow(firstArr))
    setUniqMod4Array(getUniqueValuesFromCSV(convertArrayOfObjectsToCSV(firstArr),"mod8000"))
    setUniqMod5Array(getUniqueValuesFromCSV(convertArrayOfObjectsToCSV(firstArr),"mod20002"))
     dispatch(setCalculating(false))
      return
}
if(filteredArrayForMod3.length===0&&filteredArrayForMod4.length!==0&&filteredArrayForMod5.length===0){
    const firstArr=data.filter((item)=>{return filteredArrayForMod4.includes(item.mod8000)})
   dispatch( setFinalDataToShow(firstArr))
    setUniqMod3Array(getUniqueValuesFromCSV(convertArrayOfObjectsToCSV(firstArr),"mod350"))
    setUniqMod5Array(getUniqueValuesFromCSV(convertArrayOfObjectsToCSV(firstArr),"mod20002"))
dispatch(setCalculating(false))
      return
}
if(filteredArrayForMod3.length===0&&filteredArrayForMod4.length===0&&filteredArrayForMod5.length!==0){
    const firstArr=data.filter((item)=>{return filteredArrayForMod5.includes(item.mod20002)})
   dispatch( setFinalDataToShow(firstArr))
    setUniqMod3Array(getUniqueValuesFromCSV(convertArrayOfObjectsToCSV(firstArr),"mod350"))
    setUniqMod4Array(getUniqueValuesFromCSV(convertArrayOfObjectsToCSV(firstArr),"mod8000"))
     dispatch(setCalculating(false))
      return
}
 if(filteredArrayForMod3.length!==0&&filteredArrayForMod4.length!==0&&filteredArrayForMod5.length===0){
  const tempArr=data.filter((item)=>{return filteredArrayForMod3.includes(item.mod350)}).filter((item)=>{return filteredArrayForMod4.includes(item.mod8000)})
 dispatch( setFinalDataToShow(tempArr))
  setUniqMod5Array(getUniqueValuesFromCSV(convertArrayOfObjectsToCSV(tempArr),"mod20002"))
   dispatch(setCalculating(false))
    return
}
 if(filteredArrayForMod3.length!==0&&filteredArrayForMod4.length===0&&filteredArrayForMod5.length!==0){
  const tempArr=data.filter((item)=>{return filteredArrayForMod3.includes(item.mod350)}).filter((item)=>{return filteredArrayForMod5.includes(item.mod20002)})
  dispatch(setFinalDataToShow(tempArr))
  setUniqMod4Array(getUniqueValuesFromCSV(convertArrayOfObjectsToCSV(tempArr),"mod8000"))
dispatch(setCalculating(false))
    return
}
 if(filteredArrayForMod3.length===0&&filteredArrayForMod4.length!==0&&filteredArrayForMod5.length!==0){
  const tempArr=data.filter((item)=>{return filteredArrayForMod4.includes(item.mod8000)}).filter((item)=>{return filteredArrayForMod5.includes(item.mod20002)})
 dispatch( setFinalDataToShow(tempArr))
  setUniqMod3Array(getUniqueValuesFromCSV(convertArrayOfObjectsToCSV(tempArr),"mod350"))
  dispatch(setCalculating(false))
    return
}
 if(filteredArrayForMod3.length!==0&&filteredArrayForMod4.length!==0&&filteredArrayForMod5.length!==0){
    const tempArr=data.filter((item)=>{return filteredArrayForMod3.includes(item.mod350)}).filter((item)=>{return filteredArrayForMod4.includes(item.mod8000)}).filter((item)=>{return filteredArrayForMod5.includes(item.mod20002)})
    dispatch(setFinalDataToShow(tempArr))
    dispatch(setCalculating(false))
    return
   
}
//eslint-disable-next-line
},[filteredArrayForMod3,filteredArrayForMod4,filteredArrayForMod5,data])


//THIS FUNCTION IS USED TO GET UNIQUE LIST FROM RAW DATA FORMAT OF CSV
function getUniqueValuesFromCSV(csv, columnName) {
    // Split the CSV into rows
    const rows = csv.split('\n');
    
    // Find the index of the specified column
    const headers = rows[0].split(',');
    const columnIndex = headers.indexOf(columnName);
    
    // Extract values from the specified column into an array
    const values = rows.slice(1).map(row => row.split(',')[columnIndex]);
    
    // Create a Set to store unique values
    const uniqueSet = new Set(values);
    
    // Convert the Set back to an array
    const uniqueArray = Array.from(uniqueSet);
    
    return uniqueArray.filter((item)=>{return item!==undefined});
  }


  //THIS FUNCTION IS USED TO CONVERT JSON FORMAT TO RAW DATA FORMAT OF CSV
  function convertArrayOfObjectsToCSV(data) {
    const csvRows = [];
    
    // Extracting headers from the first object
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    
    // Extracting values from each object and constructing CSV rows
    for (const row of data) {
      const values = headers.map(header => {
        const cellValue = row[header];
        const escapedValue = String(cellValue).replace(/"/g, '""');  // Escaping double quotes
        return `${escapedValue}`;
      });
      csvRows.push(values.join(','));
    }
    // Combining all rows into a single CSV string
    return csvRows.join('\n');
  }
  


  return (
    <>
        <section className={styles.outerCont}>
           
    <DropDown array={uniqMod3Array} filteredArray={filteredArrayForMod3} setFilteredArray={setFilteredArrayForMod3} listName={"MOD350"}/>
    <DropDown array={uniqMod4Array} filteredArray={filteredArrayForMod4} setFilteredArray={setFilteredArrayForMod4} listName={"MOD8000"}/>
    <DropDown array={uniqMod5Array} filteredArray={filteredArrayForMod5} setFilteredArray={setFilteredArrayForMod5} listName={"MOD20002"}/>
        </section>
    </>
  )
}

export default FilterContainer