import React,{useState} from 'react'
import "./profile.css"
import logo from './icons/Vector.png';
import Lupe from './icons/lupe.png';
import BigLupe from './icons/BigLupe.png'
import Feed from './feed'
const Profile = () => {

    const [data,setData] = useState({})
    const [username,setUsername] =useState("");
    const [repositories, setRepositories] = useState([]);
    const onChangeHandler = e =>{
        setUsername(e.target.value);
    };
    const submitHandler = async e =>{
        e.preventDefault();
        
        const profile = await fetch(`https://api.github.com/users/${username}`)
        const profileJson = await profile.json()
        console.log(profileJson)

        const repositories = await fetch(profileJson.repos_url)
        const repoJson = await repositories.json();
        console.log(repoJson)
        if (profileJson){
            setData(profileJson);
            setRepositories(repoJson);
        }
       
    }
   
   
    return (
    <div className='start'>
        <div className='header'>
        <div className='logo'><img src={logo} alt="logo" /></div>
        <div className='Search'>
        <img src={Lupe} className='Lupe' alt="logo" />
        <input className='input' placeholder="Enter GitHub username" type='text' value={username} onChange={onChangeHandler} />
        <button href='s' type='submit' onClick={submitHandler} className='Find'>Go</button></div>
        </div>
        <div className='repos'>Repositories({data.public_repos})
        <div className='ReposUr'>{repositories.map(repo=>(
            <ul><a href ={repo.html_url} target="_blank"><a className ='RepoName'>{repo.name}</a></a></ul>
        ))}</div>
        </div>
        <div className='Main'>
        <div className ='ava'><img className='avatar' src ={data.avatar_url}></img>
        <br></br>
        <div className='AvaName'>{data.name}</div>
        <br></br>
        <div  className='Login'><a href={data.html_url} target="_blank">{data.login}</a></div>
        <div className='followers'><a>{data.followers} followers</a> <a>{data.following} following</a></div>
        </div>
        </div>
    </div>

    )
   
}
export default Profile;