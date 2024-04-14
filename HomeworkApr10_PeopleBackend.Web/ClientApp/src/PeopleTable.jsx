import React from 'react';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';
import Axios from 'axios';
class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: ''
        },
        isLoading: true,
        isEditing: false,
        selectedPeopleIds: []
    }
    loadPeople = () => {
        this.setState({ isLoading: true });
        Axios.get('/api/people/getpeople').then(response => {
            this.setState({ people: response.data, isLoading: false })
        });
    }
    loadTable = () => {
        const { people, isLoading, selectedPeopleIds } = this.state;
        if (isLoading) {
            return <tr><td colSpan="5" className='text-center' ><img src="/src/load-image/Eclipse@1x-1.0s-200px-200px.gif" /></td></tr>
        }
        return people.map(p => <PersonRow key={p.id}
            person={p}
            onEditClick={() => this.onEditClick(p.id)}
            onDeleteClick={() => this.onDeleteClick(p.id)}
            isSelected={selectedPeopleIds.includes(p.id)}
            onCheckChange={() => this.onCheckChange(p.id)} />)
    }
    componentDidMount = () => {
        this.loadPeople();
    }
    onTextChange = e => {
        const copy = this.state.person;
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }
    onAddClicked = () => {
        const { firstName, lastName, age } = this.state.person;
        Axios.post('/api/people/addperson', { firstName, lastName, age }).then(response => {
            this.loadPeople();
            this.setState({
                person: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
        });
    }
    onEditClick = id => {
        const p = this.state.people.find(p => p.id === id);
        this.setState({ person: { id: p.id, firstName: p.firstName, lastName: p.lastName, age: p.age }, isEditing: true });
    }
    updatePerson = person => {
        Axios.post('/api/people/updateperson', this.state.person).then(response => {
            this.loadPeople();
            this.setState({
                person: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    age: ''
                },
                isEditing: false
            });
        })
    }
    cancelEdit = () => {
        this.setState({
            person: {
                id: '',
                firstName: '',
                lastName: '',
                age: ''
            },
            isEditing: false
        });
    }
    onDeleteClick = id => {
        Axios.post('/api/people/deleteperson', { id }).then(response => {
            this.loadPeople();
        });

    }
    onCheckChange = id => {   
        this.state.selectedPeopleIds.includes(id) ? this.setState({ selectedPeopleIds: this.state.selectedPeopleIds.filter(i => i !== id) })
            : this.setState({ selectedPeopleIds: [...this.state.selectedPeopleIds, id]  });
    }
    onSelectAllClick = () => {
        this.setState({ selectedPeopleIds: this.state.people.map(p => p.id) });
    }
    onDeselectAllClick = () => {
        this.setState({ selectedPeopleIds: [] });
    }
    onDeleteSelClick = () => {
        Axios.post('/api/people/deleteselected', { ids: this.state.selectedPeopleIds }).then(response => {
            this.loadPeople();
        });
    }
    render() {
        const { person, isEditing } = this.state;
        return (
            <>
                <PersonForm onTextChange={this.onTextChange}
                    onAddClick={this.onAddClicked}
                    person={person}
                    isEditing={isEditing}
                    updatePerson={this.updatePerson}
                    cancelEdit={this.cancelEdit}
                />
                <div className='container mt-5'>
                    <table className='table table-hover table-bordered mt-5'>
                        <thead>
                            <tr>
                                <th className='text-center' style={{ width: '15%' }}>
                                    <button onClick={this.onDeleteSelClick} className='btn btn-danger w-100'>Delete Selected</button>
                                    <button onClick={this.onSelectAllClick} className='btn btn-outline-danger w-100 mt-2'>Select All</button>
                                    <button onClick={this.onDeselectAllClick} className='btn btn-outline-danger w-100 mt-2'>Deselect All</button>
                                </th>
                                <th className='text-center'>First Name</th>
                                <th className='text-center'>Last Name</th>
                                <th className='text-center'>Age</th>
                                <th className='text-center'>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody style={{ alignContent: 'center' }}>
                            {this.loadTable()}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
export default PeopleTable;