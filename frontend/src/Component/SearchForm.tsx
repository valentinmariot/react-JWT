import { SetStateAction, useState } from "react";
import { useLocation, useNavigate } from "react-router"

export default function SearchForm({setUser}) {
    const [value, setValue] = useState();
    const navigate = useNavigate();
    let location = useLocation();
    console.log('navigate : ', navigate);
    console.log('location : ', location);

    const handleChange = (e: any) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        navigate(from, {replace: true})
        setUser(value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={value} onChange={handleChange}/>
            <button type='submit'>Click</button>
        </form>
    )
}