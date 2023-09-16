import React, { useEffect, useState } from 'react'
import "./Product.css";



const AddColor = () => {

    const [color, setColor] = useState('')
    const colorForm = new FormData()
    const [fetchedColor, setFetchedColor] = useState([])
    const [colorError,setColorError] = useState('')
    const [colorDuplicate,setColorDuplicate] = useState('')

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
            setColorDuplicate("already added")
            return; // Do not add the duplicate color
        }
        try {
            await fetch("http://localhost:8000/adminsite/colormaster",
                {
                    method: 'POST',
                    body: colorForm,
                })
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
            
            await fetch("http://localhost:8000/adminsite/colormaster/"+val.toString(),{method:"DELETE"});
            
          }
          catch(error){
            alert("Failed to delete")
            console.log("Delete unsuccessful")
          }
          fetchColor()
    }


    return (
        <div className='container'>

            <label>Color Name :</label>
            <input type="text" name='color' maxLength={10} value={color} onChange={(e) => setColor(e.target.value.replace(/[^A-Za-z' ']/g, ''))} /><br />

            <p className='text-danger 9px'>{colorDuplicate && <div className="error-message">{colorDuplicate}</div>}</p>
            <p className='text-danger 9px'>{colorError && <div className="error-message">{colorError}</div>}</p>


            <button className='button'onClick={addColor}>Add Color</button>

            {fetchedColor.map((item) => (
          <div key={item.id} className="color-item">
          <p>{item.colorName}</p>
          <button className="delete-button" onClick={() => delColor(item.id)}>Remove</button>
        </div>
            ))}
        </div>
    )
}

export default AddColor
