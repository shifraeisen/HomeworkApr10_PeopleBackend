import React from 'react';

function PersonForm({ person, onTextChange, onAddClick, isEditing, updatePerson, cancelEdit }) {
    const { firstName, lastName, age } = person;
    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-3'>
                        <input value={firstName} onChange={onTextChange} name='firstName' type='text' className='form-control' placeholder='First Name' />
                    </div>
                    <div className='col-md-3'>
                        <input value={lastName} onChange={onTextChange} name='lastName' type='text' className='form-control' placeholder='Last Name' />
                    </div>
                    <div className='col-md-3'>
                        <input value={age} onChange={onTextChange} name='age' type='text' className='form-control' placeholder='Age' />
                    </div>
                    {!isEditing ? <div className='col-md-3'>
                        <button onClick={onAddClick} className='btn btn-outline-info w-100'>Add</button>
                    </div> : <>
                        <div className='col-md-1'>
                            <button onClick={updatePerson} className='btn btn-outline-warning w-100'>Update</button>
                        </div>
                        <div className='col-md-1'>
                            <button onClick={cancelEdit} className='btn btn-outline-secondary w-100'>Cancel</button>
                        </div>
                    </>}

                </div>
            </div>
        </>
    )
}
export default PersonForm;