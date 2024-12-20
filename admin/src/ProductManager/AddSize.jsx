import React, { useEffect, useState } from 'react'
import "./Product.css";
import MessageBox from './MessageBox';
import Sizecss from './Sizecss.css'
import { AiFillDelete } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
const AddSize = () => {

    const [size, setSize] = useState('')
    const sizeForm = new FormData()
    const [fetchedSize, setFetchedSize] = useState([])
    const [sizeError,setSizeError] = useState('')
    const [sizeDuplicate,setSizeDuplicate] = useState('')
    const [showMessage,setShowMessage] = useState('')
    const [showDeleteMessage,setShowDeleteMessage] = useState('')

    useEffect(() => {
        fetchsize()
    }, []);

    const addsize = async () => {
        if(size === '')
        {
            setSizeError("required *")
            return;
        }
        else{
            setSizeError('')
        }


        sizeForm.append("size",size.toLowerCase())
        const isDuplicate = fetchedSize.some((item) => item.sizeName === size.toLowerCase());

        if (isDuplicate ) {
            setSizeDuplicate('already added')
            return; // Do not add the duplicate size
        }
            try {
                const reponse = await fetch("http://localhost:8000/adminsite/sizemaster",
                    {
                        method: 'POST',
                        body: sizeForm,
                    })
                    if(reponse.ok)
                    {
                        setShowMessage(true)
                        setTimeout(() => {
                            setShowMessage(false);
                          }, 2000);
                    }
                    fetchsize()
                    setSize('')        
            }
            catch (error) {
            console.log("Error", error)
            }

    }

    const fetchsize = async () => {
        try {
            const response = await fetch("http://localhost:8000/adminsite/sizemaster")
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setFetchedSize(data);


        }
        catch (error) {
            console.log("Error", error)
        }
    }

    const delSize =async(val)=>{
        try{
            
            const response = await fetch("http://localhost:8000/adminsite/sizemaster/"+val.toString(),{method:"DELETE"});
            if(response.ok){
                setShowDeleteMessage(true)
                setTimeout(() => {
                    setShowDeleteMessage(false);
                  }, 2000);
            }
          }
          catch(error){
            alert("Failed to delete")
            console.log("Delete unsuccessful")
          }
          fetchsize()
    }

    console.log("Fetched Dat", fetchedSize)

    return (
<div className=''>
  {showMessage && <MessageBox message="Size Added Successfully" visibility='true' />}
  {showDeleteMessage && <MessageBox message="Size Removed Successfully" visibility='true' />}

  <div className='mean-con non-selectable container'>
    <label>Size Name :</label>
    <input
      type="text"
      name='size'
      maxLength={10}
      value={size}
      onChange={(e) => setSize(e.target.value.replace(/[^A-Za-z0-9 .]/g, ''))}
      className='input-field'
    /><br />
    <p className='text-danger small-text'>{sizeDuplicate && <div className="error-message">{sizeDuplicate}</div>}</p>
    <p className='text-danger small-text'>{sizeError && <div className="error-message">{sizeError}</div>}</p>
    {fetchedSize.some((dict) => Object.values(dict).includes(size.toLowerCase())) ? (<p className='text-info'>Size already added</p>) : null}

    <button className='button ' onClick={addsize}><GrAdd/> Add Size</button>
    <table>
        <tr>
            <th>
                Size
            </th>
            <th></th>
        </tr>
        
        {fetchedSize.map((item) => (
                <tr>        
                            <td className='h5 text-center'>
                                {item.size}
                            </td>
                            <td>
                                <button className='button float-right' onClick={() => delSize(item.id)}>Delete <AiFillDelete/></button>

                            </td>
                            </tr>
        ))}
   
            
   

    </table>
    
  </div>
</div>

    )
}

export default AddSize
