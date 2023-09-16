import React, { useEffect, useState } from 'react'
import "./Product.css";

const AddSize = () => {

    const [size, setSize] = useState('')
    const sizeForm = new FormData()
    const [fetchedSize, setFetchedSize] = useState([])
    const [sizeError,setSizeError] = useState('')
    const [sizeDuplicate,setSizeDuplicate] = useState('')
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
                await fetch("http://localhost:8000/adminsite/sizemaster",
                    {
                        method: 'POST',
                        body: sizeForm,
                    })
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
            
            await fetch("http://localhost:8000/adminsite/sizemaster/"+val.toString(),{method:"DELETE"});
            
          }
          catch(error){
            alert("Failed to delete")
            console.log("Delete unsuccessful")
          }
          fetchsize()
    }

    console.log("Fetched Dat", fetchedSize)

    return (
        <div className='container">
        '>
            <div className='mean-con'>
            <label>size Name :</label>
            <input type="text" name='size' maxLength={10} value={size} onChange={(e) => setSize(e.target.value.replace(/[^A-Za-z0-9]/g, ''))} /><br />
            <p className='text-danger 9px'>{sizeDuplicate && <div className="error-message">{sizeDuplicate}</div>}</p>
            <p className='text-danger 9px'>{sizeError && <div className="error-message">{sizeError}</div>}</p>

            <button className='button' onClick={addsize}>Add size</button>

            {fetchedSize.map((item) => (
            <>
                <p key={item.id}>{item.size}</p>
                <button className='button' onClick={() => delSize(item.id)}>Remove</button>
            </>
            ))}
            </div>
        </div>
    )
}

export default AddSize
