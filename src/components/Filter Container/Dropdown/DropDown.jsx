import React from 'react'
import styles from "./DropDown.module.css"
import { useState } from 'react'
import { useEffect } from 'react'
import {MdArrowDropDown} from "react-icons/md"
import { useRef } from 'react'
import useClickOutside from "../../../utils/CustomHooks/useClickOutside"

const DropDown = ({array,filteredArray,setFilteredArray,listName}) => {
  const [listToShow,setListToShow]=useState([])
  const [searchText,setSearchText]=useState("")
  const[isDropped,setIsDroppped]=useState(false)
  const ignoreElement = useRef(null)
  const domNode = useClickOutside(() =>{setIsDroppped(false)}, ignoreElement.current)


useEffect(()=>{
if(searchText===""){
  setListToShow(array)
  return
}
const filteredList=filterListByExactMatch(array,searchText)
setListToShow(filteredList)
},[searchText,array])


function filterListByExactMatch(array, searchWord) {
  return array.filter(item => {

    const lowercaseItem = item.toLowerCase();
    const lowercaseSearchWord = searchWord.toLowerCase();


    if (lowercaseItem.startsWith(lowercaseSearchWord)) {

      for (let i = 0; i < searchWord.length; i++) {
       
        if (lowercaseItem[i] !== lowercaseSearchWord[i]) {
          return false; 
        }
      }
      return true; 
    }
    return false; 
  });
}

const handleSelect=(item)=>{
  if(filteredArray.includes(item)){
    const tempList=filteredArray.filter((it)=>{return it!==item})
    setFilteredArray(tempList)
    return
  }
  setFilteredArray((prev)=>{return[...prev,item]})
}

  return (
   <>
    <section onClick={()=>setIsDroppped(true)} className={styles.outerCont}>
    {listName} {filteredArray.length?`(${filteredArray.length} Selected)`:null} <MdArrowDropDown style={{transform:isDropped?"rotate(180deg)":""}} className={styles.arrowIcon}/>
      {isDropped&&<div ref={domNode} className={styles.innerCont}>
        <div className={styles.itemsCont}>
        <input onChange={(e)=>setSearchText(e.target.value)} className={styles.searchInput} type="text" placeholder='Search....' value={searchText}/>
          {
            listToShow.map((item)=>{return <p onClick={()=>handleSelect(item)} style={{background:filteredArray.includes(item)?"#919090":""}} className={styles.itemCont}>{item}</p>})
          }
        </div>
      </div>}
    </section>
   </>
  )
}

export default DropDown