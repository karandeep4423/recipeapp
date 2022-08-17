import React from 'react'

export default function ProgressTaste({item}) {
    const containerStyles = {
        width: '75%',
        borderRadius: 50,
      }
    
      const fillerStyles = {
        height: '100%',
        width: `${item>100?100:item}%`,
        backgroundColor:"#ef4444",
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
       
      }
    
      const labelStyles = {
        padding:10,
        color: 'white',
        fontWeight: 'bold',
        
      }
  return (
    <div>

  <div className='  pt-4 mt-1 '>
    <div className=' p-19 mr-32 ' style={containerStyles} >
    <div  style={fillerStyles}>
    <span  style={labelStyles}>{`${item}%`}</span>
      </div> 
  </div>
  </div>
  </div>
 )
  }
