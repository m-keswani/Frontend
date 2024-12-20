import React, { useEffect, useState } from 'react'
import "./Product.css";
import MessageBox from './MessageBox';
import { AiFillDelete } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';

const AddColor = () => {

    const [color, setColor] = useState('')
    const colorForm = new FormData()
    const [fetchedColor, setFetchedColor] = useState([])
    const [colorError,setColorError] = useState('')
    const [showMessage,setShowMessage] = useState('')
    const [showDeleteMessage,setShowDeleteMessage] = useState('')


    useEffect(() => {
        fetchColor()
    }, []);

    const addColor = async () => {
        
        if(color==='')
        {
            setColorError("required *")
            return;
        }
        else{
            setColorError('')
        }

        colorForm.append("colorName",color)
        const isDuplicate = fetchedColor.some((item) => item.colorName === color);
    
        if (isDuplicate) {
            return; // Do not add the duplicate color
        }
        try {
            const response = await fetch("http://localhost:8000/adminsite/colormaster",
                {
                    method: 'POST',
                    body: colorForm,
                })
                if(response.ok)
                {
                    setShowMessage(true)
                    setTimeout(() => {
                        setShowMessage(false);
                      }, 2000);
                }
                fetchColor()
                setColor('')        
        }
        catch (error) {
        console.log("Error", error)
        }

    }

    const fetchColor = async () => {
        try {
            const response = await fetch("http://localhost:8000/adminsite/colormaster")
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setFetchedColor(data);


        }
        catch (error) {
            console.log("Error", error)
        }
    }

    const delColor =async(val)=>{
        try{
            
            const reponse = await fetch("http://localhost:8000/adminsite/colormaster/"+val.toString(),{method:"DELETE"});
            if(reponse.ok)
            {
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
          fetchColor()
    }


    return (
        <div className='container'>
            
            {showMessage && <MessageBox message="Color Added Successfully" visibility='true' />}
            {showDeleteMessage && <MessageBox message="Color removed Successfully" visibility='true' />}

            <label>Color Name </label>
            <input type="text" name='color' maxLength={10} value={color} onChange={(e) => setColor(e.target.value.replace(/[^A-Za-z' ']/g, ''))} /><br />

            <p className='text-danger 9px'>{colorError && <div className="error-message">{colorError}</div>}</p>

            {fetchedColor.some((dict) => Object.values(dict).includes(color.toLowerCase()))?(<p>already added</p>):null}

            <button className='button' onClick={addColor}><GrAdd/> Add Color</button>
            <br/>
            <br/>
            <table>
                <tr>
                    <th>
                        Color Name
                    </th>
                    <th>

                    </th>
                </tr>
              
                    {fetchedColor.map((item) => (
                        <tr>
                            <td className='text-center'>
                                {item.colorName}
                            </td>

                            <td>
                                <button className="button float-right" onClick={() => delColor(item.id)}>Delete <AiFillDelete/></button>
                            </td>
                        </tr>   
                    ))}
                
            </table>



            
        </div>
    )
}

export default AddColor
