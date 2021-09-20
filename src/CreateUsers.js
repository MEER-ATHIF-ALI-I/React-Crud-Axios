import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


function CreateUsers() {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [imgurl, setImgurl] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    let handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            await axios.post("https://60ebd2d8e9647b0017cdde36.mockapi.io/Users", { name, age, email, imgurl, description })
            setIsLoading(false);
            history.push('/users')
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    return (
        <div>
            <h3 className="page-title mb-4">Create New User</h3>
            {
                isLoading ? <h1 className="loading">Loading...</h1>
                    : (<form onSubmit={handleSubmit} className="pb-3">
                        <div className="row">
                            <div className="col-lg-6 mt-2 mb-2">
                                <label htmlFor="name">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="form-control" />
                            </div>
                            <div className="col-lg-6 mt-2 mb-2">
                                <label htmlFor="age">Age</label>
                                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} id="age" className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mt-2 mb-2">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="form-control" />
                            </div>
                            <div className="col-lg-6 mt-2 mb-2">
                                <label htmlFor="imgurl">Image Url</label>
                                <input type="text" value={imgurl} onChange={(e) => setImgurl(e.target.value)} id="imgurl" className="form-control" />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-12 mt-2 mb-2">
                                <label htmlFor="description">Description</label>
                                <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} id="description" className="form-control" rows="3"></textarea>
                            </div>
                        </div>
                        <div className="btn-container">
                            <button className="btn btn-outline-primary btn-container-primary" disabled={isLoading ? true : false}>Create User</button>
                        </div>
                    </form>)
            }

        </div>
    )
}

export default CreateUsers