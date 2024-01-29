import './App.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function App() {
  const [task,setTask]=useState("")
  const [showList,setshowList]=useState([])
  const [allList,setallList]=useState([])
  const [selected,setSelected]=useState(false)
  const [checked,setChecked]=useState(false)
  
  useEffect(()=>{
    setshowList(allList)
  },[allList,checked])

  const handleClick=()=>{
    const today=new Date()
    const date=today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    var newTask = {
      name: task,
      date: date,
      completed: false,
    }
    setallList([...allList,newTask])  
    setTask("")
  }

  const handleDelete=(index)=>{
     let updatedallList=[...allList]
     updatedallList.splice(index,1)
     setallList(updatedallList)
    //  console.log(index)
  }

  const handleChecked=(index)=>{
     const revisedList=allList.map((ele,idx)=>{
      if(idx==index){
        ele.completed=!ele.completed;
      }
     })
     setChecked(!checked)
    //  setallList(allList)
  }

  const handleSelect=()=>{
    if(selected){
       setshowList(allList) 
    }else{
      const revisedList=allList.filter((ele)=>{
        return ele.completed==true
      })
      setshowList(revisedList)
    }
    setSelected(!selected) 
  }

  const handleOnDragEnd=(result)=>{
     if(!result.destination) return
     const draggableBoxes=Array.from(showList)
     const [draggedItems]=draggableBoxes.splice(result.source.index,1)
     draggableBoxes.splice(result.destination.index,0,draggedItems)
     setshowList(draggableBoxes)
  }

  return (
    <div className="App">
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className='container'>
        <div className='inputContainer'>
          <input type='text' placeholder="enter your task..." onChange={(e)=>setTask(e.currentTarget.value)}/>
          <Fab color="primary" aria-label="add" style={{margin: 'auto 15px 5px 15px'}} onClick={handleClick}>
            <AddIcon/>
          </Fab>
          <Fab color={selected?"success":"none"} aria-label="edit" onClick={handleSelect} style={{margin: 'auto 10px 5px 15px'}}>
            <CheckIcon />
          </Fab>
        </div>
        <Droppable droppableId='taskboxes'>
        {(provided)=>(
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {showList.length?showList.map((ele,index)=>(
              <Draggable key={index} draggableId={index.toString()} index={index}>
              {(provided)=>(
                <div className='subcontainer' ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <DragIndicatorOutlinedIcon style={{margin: '10px'}}/>
                    <p style={{width: '40vw'}}>{ele.name}</p>
                    <p style={{fontSize: '12px'}}>created at {ele.date}</p>
                    <div>
                    <Checkbox type="checkbox" name="checkbox" value={ele.completed} checked={ele.completed} onChange={()=>handleChecked(index)}/>
                    </div>
                    <div>
                      <Tooltip title="Delete">
                      <IconButton onClick={()=>handleDelete(index)}>
                        <DeleteIcon/>
                      </IconButton>
                      </Tooltip>
                    </div>
                </div>
              )}
              </Draggable>
            )):(<p>No Task yet</p>)}
            {provided.placeholder}
          </div> 
        )}
        </Droppable>  
      </div>
    </DragDropContext>
    </div>
  );
}

export default App;
