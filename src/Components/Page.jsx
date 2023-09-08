import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Github } from 'lucide-react';
import '../index.css';

const Page = () => {

  const [user, setUser] = useState("khushi-digi");
  const [userData, setUserData] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${user}`)
        let res = await response.json()
        console.log(res)
        setUserData(res)
      }
      catch (error) {
        console.log("error - ",error);
      }
    };

    const fetchRepoData = async () => {
      try {
        let response = await fetch(`https://api.github.com/users/${user}/repos`)
        let result = await response.json()
        console.log(result)
        setRepoData(result)
      }
      catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
    fetchRepoData();

    setLoading(false);
  }, [user]);

  if (loading) {
    return <div class="loading">Loading...</div>;
  }

  if (!userData) {
    return <div class="loading">Loading...</div>;
  }

  return (
    <>
      <div className='my-header'>

        <h1>
          <span>
            <Github color='white' size='35px' />
          </span>
          Github Wrapper
        </h1>
        <div className='searchBar'>

          <input type='text' placeholder=' search here' onChange={(e) => {
            setUser(e.target.value);
          }} />
          <button onClick={() => setUser("khushi-digi")}>Reset</button>
        </div>
      </div>
      <div className='main'>
        <div class="card">
          <div class="left">
            <img src={userData.avatar_url} class="logo" />
            <h4>@{userData.login}</h4>

          </div>
          <div class="right">
            <div class="top">
              <h1>{userData.name}</h1>
              <a href={userData.html_url}>
                Visit Profile</a>
            </div>
            <div class="data">
              <span><a href="#repositories">{userData.public_repos} Repos</a></span>
              <span> {userData.followers} Followers</span>
              <span>{userData.following} Followings </span>
            </div>
            <p>📍{userData.location}</p>
            <p> {userData.bio}</p>

          </div>
        </div>
      </div>
      <div id="repositories">
      <h1 class="rtitle">Repository</h1>
        {repoData && repoData.length > 0 ? (
          repoData.map((repo) => (
            <div class="repo">
              <h1 class="repoheading"> {repo.name}</h1>
              <br />
              <div class="links">
                <a href={repo.svn_url} class="viewcode">code</a>
                <a href={`https://${repo.owner.login}.github.io/${repo.name}`} class="viewlive">Live</a>
              </div>
              
            </div>
          ))
        ) : (
          <p>No repositories found</p>
        )}
      </div>
    </>
  );
};

export default Page;
