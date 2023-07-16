
import { useEffect, useState } from "react"
import styles from "./Table.module.css"
import ReactPaginate from "react-paginate"
import { useDispatch, useSelector } from "react-redux"
import { setPageNumber } from "../../redux/tableSlice"

const Table = () => {
    const dispatch=useDispatch()
    const data=useSelector((state)=>state.home.finalDataToShow)
    const calculating=useSelector((state)=>state.home.calculating)
    const pageNumber=useSelector((state)=>state.table.pageNumber)
    const[displayRows,setDisplayRows]=useState([])
    const[rowsToShow,setRowsToShow]=useState([])
    const rowsPerPage=100;
    const pagesVisited=pageNumber*rowsPerPage

const pageCount=Math.ceil(data.length/rowsPerPage)


const changePage=({selected})=>{
    setRowsToShow([])
    setDisplayRows([])
    document.querySelector(`.${styles.dependency_table}`).scrollTo({
        top:0,
        behavior: 'smooth'
      });
      dispatch(setPageNumber(selected))
    }


//PAGINATION IS DONE HERE BASED ON TOTAL ROWS    
useEffect(()=>{
    if(data.length===0){return}
    const tempRowsArray=data?.slice(pagesVisited,pagesVisited+rowsPerPage)
    setDisplayRows(tempRowsArray)
   //eslint-disable-next-line
},[data,pageNumber])


//SLICE THE TOTAL ROWS TO SHOW TO JUST 20 AS REQUIRED
useEffect(()=>{
    if(displayRows.length===0){return}
setRowsToShow(displayRows.slice(0,20))
},[displayRows])


//FETCH NEXT 20 ROWS
const fetchMoreRows = async(number) => {
let newShowArr = rowsToShow.concat(displayRows.slice(number, number + 20))
setRowsToShow(newShowArr)
}


//ADD EVENT LISTNER TO CONTAINER SO THAT WHEN IT REACH THE END WE CAN TRIGGER FUNCTION
setTimeout(()=>{

    let element = document.querySelector(`.${styles.dependency_table}`);

    element.addEventListener('scroll', function() {
      if (Math.ceil(element.scrollTop + element.clientHeight) >= element.scrollHeight) {
            element.scrollTo({
                bottom: -10,
                behavior: 'smooth'
              });
            fetchMoreRows(rowsToShow.length)
      }
    });
},10)

  return (
    <>
    
            <div className={styles.dependency_table}>
            {calculating&&<div className={styles.loaderCon}><img src="/Spinner-1s-363px.svg" alt="spinner" /></div>}
                {!calculating&&<table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.tableHead}>Number</th>
                            <th className={styles.tableHead}>mod350</th>
                            <th className={styles.tableHead}>mod8000</th>
                            <th className={styles.tableHead}>mod20002</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                  
                        {rowsToShow.map((item, index) => (
                            <>
                            <tr className={styles.tableRow} key={index}>
                                <td className={styles.tableColumn} style={{textTransform:"capitalize"}}>{item.number ? item.number : "Not Available"}</td>
                                <td className={styles.tableColumn} style={{textTransform:"capitalize"}}>{item.mod350 ? item.mod350 : "Not Available"}</td>
                                <td className={styles.tableColumn} style={{textTransform:"capitalize"}}>{item.mod8000 ? item.mod8000 : "Not Available"}</td> 
                                <td className={styles.tableColumn} style={{textTransform:"capitalize"}}>{item.mod20002 ? item.mod20002 : "Not Available"}</td>    
                            </tr>
                        
                            </>
                        ))}
                     
                    </tbody>
                </table>}
            </div>
            {data.length<=rowsPerPage?null:
<ReactPaginate 
  previousLabel={"Prev"}
  nextLabel={"Next"}
  pageCount={pageCount}
  onPageChange={changePage}
  containerClassName={styles.pagination_btn}
  previousLinkClassName={"prev-btn"}
  nextLinkClassName={"next-btn"}
  disabledClassName={styles.disable_btn}
  activeClassName={styles.pagination_active}
/>}
    </>
  )
}

export default Table