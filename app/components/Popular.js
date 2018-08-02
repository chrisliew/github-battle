import React from 'react';
import PropTypes from 'prop-types';
import api from '../util/api';
// var api = require('../utils/api'); 

var languages = ['All', "Javascript", 'Ruby', "Java", "CSS", "Python"];

function SelectLanguage(props) {
  return (
    <ul className="languages">
      {languages.map(language => {
        return (
          <li
            onClick={() => props.updateLanguage(language)}
            key={language}
            style={language === props.selectedLanguage ? { color: '#d0021b' } : null}>
            {language}
          </li>
        )
      })}
    </ul>
  );
}

function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}


    </ul>
  )
}

export class Popular extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    }
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    //Want to fetch after component mounted.  Also want to fetch when language updated.  
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang,
      repos: null,
    })

    api.fetchPopularRepos(lang)
      .then(repos => {
        this.setState({
          //setting repos to the new chosen repos
          repos: repos,
        })
        console.log("REPOS", repos);
      })
  }

  render() {
    return (
      <div>
        <SelectLanguage updateLanguage={this.updateLanguage}
          selectedLanguage={this.state.selectedLanguage}
        />
        {!this.state.repos
          ? <p>LOADING!!!</p>
          : <RepoGrid repos={this.state.repos} />
        }
      </div>
    )
  };
}
