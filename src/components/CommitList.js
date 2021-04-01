import React, {useContext, useState, useEffect} from 'react';

import { AuthContext } from "../App";
import {useParams} from 'react-router-dom';
import moment from 'moment';
import * as Styles from '../styles/RepoListStyle.js';
import { GoThumbsup } from "react-icons/go";
export default function CommitList(){
    
    const { state } = useContext(AuthContext);

    const [commits, setCommits] = useState([]);
    let {repo} = useParams()

    useEffect(() => {
        async function fetchCommits(){
            await fetch(`https://api.github.com/repos/${state.user.login}/${repo}/commits?per_page=10`, {
                headers: {
                    'Authorization': `token ${state.token}`,
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(res => {setCommits(res); console.log(res);})
            .catch(err => console.log(err));
            // res.json()
            // .then(res => setCommits([...res]))
            // .catch(err => console.log(err))
            // console.log(res);
        }
        fetchCommits();
      }, [state.token, state.user.login, repo]);

    // if (!state.isLoggedIn) {
    // return <Redirect to="/login" />;
    // }

    return(
        <Styles.Wrapper>
        <div className="row">
            <div className="col-md-9 col-sm-9 col-lg-9" style={{marginTop: 20}}>
        {

            commits instanceof Array ? 
                commits.map((item) => {
                    let momentObj = moment(item.commit.date)
                    // let bgColor = item.private ? '#00bcd4' : '#e91e63';
                    // let bgText = item.private ? 'PRIVATE' : 'PUBLIC';
                    // let isPrivate = <span style={{color: '#ffffff',backgroundColor: bgColor }}>{bgText}</span>;
  
                    return (
                      <Styles.RepoList key={item.sha}>
                          <Styles.RepoListItem>
                              <Styles.Title>{item.commit.message}</Styles.Title>
                          </Styles.RepoListItem>
                          {
                              item.email != null ? <p>{item.email}</p> : ''
                          }
                          {/* {isPrivate} */}
                          <Styles.SpanProperty>
                          <GoThumbsup />
                              {
                                  item.forks
                              }
                          </Styles.SpanProperty>
                          Updated on {momentObj.format('YYYY-MM-DD')}                        
                      </Styles.RepoList>
                      // </button>
                    )
                })           
             : 'No Commits'
        }
            </div>
        </div>
        </Styles.Wrapper>
    );
}