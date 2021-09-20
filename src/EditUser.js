import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function EditUsers(props) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [imgurl, setImgurl] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        let getUser = async () => {
            try {
                setIsLoading(true);
                let user = await axios.get(`https://60ebd2d8e9647b0017cdde36.mockapi.io/Users/${props.match.params.id}`);
                setName(user.data.name);
                setAge(user.data.age);
                setEmail(user.data.email);
                setImgurl(user.data.imgurl);
                setDescription(user.data.description);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error)
            }
        }
        getUser();
    }, [props.match.params.id])


    const history = useHistory();
    let handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            await axios.put(`https://60ebd2d8e9647b0017cdde36.mockapi.io/Users/${props.match.params.id}`, { name, age, email, imgurl, description });
            setIsLoading(false);
            history.push('/users')
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }


    return (
        <div>
            <h3 className="page-title mb-4">Edit Existing User</h3>
            {
                isLoading ? <h1 className="loading">Loading...</h1>
                    : <form onSubmit={handleSubmit} className="pb-3">
                        <div className="row ">
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
                                <input type="mail" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="form-control" />
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
                            <button className="btn btn-outline-primary btn-container-primary">Update</button>
                        </div>
                    </form>
            }

        </div>
    )
}
