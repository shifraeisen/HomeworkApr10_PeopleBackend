import React from 'react';

function PersonRow({ person, onEditClick, onDeleteClick, isSelected, onCheckChange }) {
    const { id, firstName, lastName, age } = person;
    return (
        <>
            <tr>
                <td>
                    <div className='d-flex justify-content-center align-items-center'>
                        <input checked={isSelected} onChange={onCheckChange} type='checkbox' className='form-check-input mt-2' style={{ transform: 'scale(1.5)' }} />
                    </div>
                </td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td>
                    <button onClick={onEditClick} className='btn btn-outline-warning w-50'>Edit</button>
                    <button onClick={onDeleteClick} className='btn btn-outline-danger w-50'>Delete</button>
                </td>
            </tr>
        </>
    )
}
export default PersonRow;