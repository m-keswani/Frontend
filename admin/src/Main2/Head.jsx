import React from 'react'
import head from './head.css'
const Head = () => {
  return (
    <div style= {{ position: 'fixed', width: '100%', zIndex: 1 }} >
    
        <div className="p-3 text-white" id='head1' >
            Administration
            <div className='float-right'>
                Log Out
            </div>
        </div>

        <div class="p-1 bg-muted text-white" id='head2'>
        Home
        </div>

    </div>
  )
}

export default Head
