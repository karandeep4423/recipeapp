import React from 'react';

const Background = ( { children } ) =>
{
    return (
       
        <body className="bg-white  dark:bg-slate-900  transition-all">
            {children}
        </body>
    )
}

export default Background;