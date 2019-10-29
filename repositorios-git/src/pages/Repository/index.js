import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Loading,
  Owner,
  IssueList,
  ButtonFilterIssue,
  ButtonControllerPages,
  ControlPagesButton,
} from './styles';
import Container from '../../components/Container';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    stateIssue: 'all',
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const { page, stateIssue } = this.state;

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: stateIssue,
          per_page: 10,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  // Ao alterar o tipo de issue o valor de page tbm é altera, pois a lista deve recomeçar do ínicio
  handleFilter = async s => {
    const { repository } = this.state;
    const issues = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: s,
        per_page: 10,
        page: 1,
      },
    });
    this.setState({
      issues: issues.data,
      stateIssue: s,
      page: 1,
    });
  };

  handlePage = async (op, page) => {
    const newPage = page + op < 1 ? 1 : page + op;
    const { stateIssue, repository } = this.state;
    const issues = await api.get(`/repos/${repository.full_name}/issues`, {
      params: {
        state: stateIssue,
        per_page: 10,
        page: newPage,
      },
    });
    this.setState({ issues: issues.data, page: newPage });
  };

  render() {
    const { repository, issues, loading, page } = this.state;

    if (loading) return <Loading>Carregando</Loading>;

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar para a HOME</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <ButtonFilterIssue>
            <button type="button" onClick={() => this.handleFilter('all')}>
              All
            </button>
            <button type="button" onClick={() => this.handleFilter('open')}>
              Open
            </button>
            <button type="button" onClick={() => this.handleFilter('closed')}>
              Close
            </button>
          </ButtonFilterIssue>
          <ButtonControllerPages>
            <ControlPagesButton
              firsPage={page}
              onClick={() => this.handlePage(-1, page)}
            >
              <FaAngleLeft color="#FFF" size={14} />
              <span>Prev</span>
            </ControlPagesButton>
            <ControlPagesButton onClick={() => this.handlePage(1, page)}>
              <span>Next</span>
              <FaAngleRight color="#FFF" size={14} />
            </ControlPagesButton>
          </ButtonControllerPages>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
