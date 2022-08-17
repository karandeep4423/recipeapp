import React from 'react'

export default function ProgressBar({completed,title}){
    const containerStyles = {
        width: '80%',
        borderRadius: 50,
      }

      const fillerStyles = {
        height: '100%',
        width: `${completed>100?100:completed}%`,
        backgroundColor:"rgb(251 191 36)",
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
        marginLeft:50,
        marginTop:-18

      }

      const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold',

      }
 return (
  <div className='pt-4 ml-10 border-b-[1px] border-white'>
<h1 className=''>{title}</h1>
    <div className=' pl-20 w-72 ' style={containerStyles} >
    <div  style={fillerStyles}>
    <span style={labelStyles}>{`${completed}%`}</span>
      </div> 

  </div>
  </div>
 )
  }