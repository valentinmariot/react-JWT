import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import useLogin from "./Hook/useLogin";
import {BlogInterface, LoginResponseInterface} from "./Interface/ResponsesInterfaces";
import {LocalUserInterface} from "./Interface/LocalUserInterface";
import LoginForm from "./Component/LoginForm";
import HideIfLogged from "./Component/HideIfLogged";
import useRegister from "./Hook/useRegister";
import useGetBlogList from "./Hook/useGetBlogList";
import BlogList from "./Component/BlogList";
import HideIfNotLogged from "./Component/HideIfNotLogged";
import BlogForm from "./Component/BlogForm";
import useGetCookies from "./Hook/useGetCookies";
import useEraseCookie from "./Hook/useEraseCookie";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Component/home';
import About from './Component/about';
import SousL1 from './Component/SousL1';
import SousL2 from './Component/SousL2';
import Default from './Component/Default';
import Wildcard from './Component/Wildcard';
import SearchForm from './Component/SearchForm';
import NotFound from './Component/NotFound';
import NeedAuth from './Component/NeedAuth';

export default function App() {
    const [loggedUser, setLoggedUser] = useState<LoginResponseInterface>({
        status: 'error',
        token: "",
        username: ""
    })
    const [localUser, setLocalUser] = useState<LocalUserInterface>({password: "", username: ""})
    const [blogList, setBlogList] = useState<BlogInterface[]>([])
    // Determines if the user wants to LogIn or to Register
    const [needsLogin, setNeedsLogin] = useState<boolean>(true)
    const [needsUpdate, setNeedsUpdate] = useState<boolean>(false)

    const login = useLogin();
    const register = useRegister();
    const getBlogList = useGetBlogList();
    const cookies = useGetCookies();
    const eraseCookie = useEraseCookie();

    useEffect(() => {
        if (Object.keys(cookies).includes('hetic_token') && Object.keys(cookies).includes('hetic_username')) {
            console.log('got cookies !', loggedUser)
            setLoggedUser(prev => ({
                ...prev,
                username: cookies.hetic_username,
                token: cookies.hetic_token
            }))
        }
    }, [])

    useEffect(() => {
        if (needsLogin && localUser.username !== '') {
            console.log('login ?')
            login(localUser.username, localUser.password)
                .then(data => setLoggedUser(data))
        } else if (!needsLogin && localUser.username !== '') {
            console.log('register ?', localUser.username)
            register(localUser.username, localUser.password)
                .then(data => setLoggedUser(data))
        }
    }, [localUser])

    useEffect(() => {
        getBlogList()
            .then(data => {
                setBlogList(data)
                setNeedsUpdate(false)
            })
    }, [needsUpdate])

    const handleDisconnect = () => {
        setLoggedUser({
            status: 'error',
            token: "",
            username: ""
        });
        eraseCookie();
    }

    const [user, setUser] = useState();
    return (
        <BrowserRouter>
            <nav>
                <h1>Mes routes</h1>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/searchform'>searchform</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <ul>
                        <li><Link to='/about/souselement1'>SousElment1</Link></li>
                        <li><Link to='/about/souselement2'>SousElment2</Link></li>
                    </ul>
                </ul>

                <hr/>


            </nav>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='*' element={<NotFound/>}/>
                <Route path=':wildcard' element={<Wildcard/>}/>
                <Route path='/searchform' element={<SearchForm setUser={setUser}/>}/>
                <Route path='/about/*' element={
                    <NeedAuth user={user}>
                        <About />
                    </NeedAuth>
                }/>
            </Routes>
            <hr/>

            <Routes>
                <Route path='/' element={<SearchForm setUser={setUser}/>}/>
            </Routes>
            <div className='container mt-5'>
                <HideIfLogged loggedUser={loggedUser}>
                    <LoginForm setLocalUser={setLocalUser} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin}/>
                </HideIfLogged>

                <HideIfNotLogged loggedUser={loggedUser}>
                    <button className='btn btn-danger d-block mx-auto mb-3' onClick={handleDisconnect}>Disconnect</button>
                    <BlogForm loggedUser={loggedUser} setNeedsUpdate={setNeedsUpdate}/>
                </HideIfNotLogged>

                <BlogList blogList={blogList}/>
            </div>
        </BrowserRouter>
    )
}
