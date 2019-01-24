
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Global from '../Shared/Global';
import axios from 'axios';
import moment from 'moment';
import CompetitionList from '../Football2019/CompetitionList';

class FootballLeagueInfo extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            info: {},
            area: {},
            season: {},
            leagueId: props.match.params.leagueId,
            leagueMatches: [],
            upcomingLeagueMatches: [],
            leagueTeams: [],
            leagueTeamStandings: []
        };

    }

    fetchLeagueInfo(leagueId)
    {
        var urlPath = Global.FootballUrl2019 + "competitions/"+leagueId;
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2019}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data !== undefined){
                const info = res.data;
                //console.log(info);
                this.setState({ info, area: info.area, season: info.currentSeason });
              }
              else{
                this.setState({ info: {},area: {},season: {} });
              }
          })
          .catch(error => {
            this.setState({ info: {},area: {},season: {} });
          })
    }

    fetchLeagueTeams(leagueId)
    {
        var urlPath = Global.FootballUrl2019 + "competitions/"+leagueId+"/teams";
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2019}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data !== undefined){
                const leagueTeams = res.data.teams;
                //console.log(leagueTeams);
                this.setState({ leagueTeams });
              }
              else{
                this.setState({ leagueTeams: [] });
              }
          })
          .catch(error => {
            this.setState({ leagueTeams: [] });
          })
    }

    fetchLeagueTeamStandings(leagueId)
    {
        var urlPath = Global.FootballUrl2019 + "competitions/"+leagueId+"/standings";
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2019}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data !== undefined){
                const leagueTeamStandings = res.data.standings[0].table;
                //console.log(leagueTeamStandings);
                this.setState({ leagueTeamStandings });
              }
              else{
                this.setState({ leagueTeamStandings: [] });
              }
          })
          .catch(error => {
            this.setState({ leagueTeamStandings: [] });
          })
    }

    
    fetchLeageMatches(leagueId)
    {
        var urlPath = Global.FootballUrl2019 + "competitions/"+leagueId+"/matches";
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2019}` } };
        var toDate = moment().format("YYYY-MM-DD"); 

        axios.get(urlPath, config)
          .then(res => {
            if(res.data !== undefined){
                const leagueMatches = res.data.matches;
                var recentLeagueMatches = leagueMatches.filter(function(match) {
                    return match.utcDate <= toDate;
                });
                var upcomingLeagueMatches = leagueMatches.filter(function(match) {
                    return match.utcDate > toDate;
                }); 
                //console.log(leageMatches);
                this.setState({ leagueMatches: recentLeagueMatches,upcomingLeagueMatches });
              }
              else{
                this.setState({ leagueMatches: [],upcomingLeagueMatches: [] });
              }
          })
          .catch(error => {
            this.setState({ leagueMatches: [],upcomingLeagueMatches: [] });
          })
    }


    componentDidMount() {
        this.fetchLeagueInfo(this.state.leagueId);
        this.fetchLeagueTeams(this.state.leagueId);
        this.fetchLeagueTeamStandings(this.state.leagueId);
        this.fetchLeageMatches(this.state.leagueId);
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.leagueId !== this.props.match.params.leagueId) {
		  const currentleagueId = nextProps.match.params.leagueId
          this.fetchLeagueInfo(currentleagueId);
          this.fetchLeagueTeams(currentleagueId);
          this.fetchLeagueTeamStandings(currentleagueId);
          this.fetchLeageMatches(currentleagueId);
		}
	}

    render() {
    
      return (
        <div class="container">

            <h1 class="mt-4 mb-3">
                League Details
            </h1>
    
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item">
                <Link to="/football-updates-2019">Football</Link>
            </li>
            <li class="breadcrumb-item active">{this.state.info.name}</li>
            </ol>
    
            <div class="row">

                <CompetitionList />

                <div class="col-lg-8 mb-4">
                    <div class="card">
                        <h3 class="card-header">{this.state.info.name}&nbsp;-&nbsp;{this.state.area.name}</h3>
                        <div class="card-body">
                            <h5 class="card-title">
                                Current Season:
                                &nbsp;
                                {moment.utc(this.state.season.startDate).local().format("Do MMM YYYY")}
                                &nbsp;-&nbsp;
                                {moment.utc(this.state.season.endDate).local().format("Do MMM YYYY")}
                            </h5>
                            <Tabs>
                                <TabList>
                                    <Tab>Teams</Tab>
                                    <Tab>Standings</Tab>
                                    <Tab>Recent Matches</Tab>
                                    <Tab>Upcoming Matches</Tab>
                                </TabList>
                                <TabPanel tabalign="center">
                                    <p>&nbsp;</p>
                                    <div class="row text-center">
                                    {
                                        this.state.leagueTeams
                                        .map(function(team, i){
                                            return (
                                                <div class="col-md-3">
                                                    <img src={team.crestUrl}  style={{width: 50, height: 50 }} alt="" />
                                                    <br />
                                                    <Link to={`/football/team-info/${team.id}`}>
                                                        {team.name}
                                                    </Link>
                                                    <hr />
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </TabPanel>
                                <TabPanel tabalign="center">
                                    <table class="table table-hover table-responsive">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Team</th>
                                            <th>P</th>
                                            <th>W</th>
                                            <th>D</th>
                                            <th>L</th>
                                            <th>GF</th>
                                            <th>GA</th>
                                            <th>GD</th>
                                            <th>PTS</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.leagueTeamStandings
                                            .sort((a,b) => parseInt(a.position) - parseInt(b.position))
                                            .map(function(standing, i){
                                                return (
                                                    <tr key={i}>
                                                        <td>{standing.position}</td>
                                                        <td>
                                                            <img src={standing.team.crestUrl} style={{width: 25, height: 25}} alt=""/>
                                                            <Link to={`/football/team-info/${standing.team.id}`}>
                                                                {standing.team.name}
                                                            </Link>
                                                        </td>
                                                        <td>{standing.playedGames}</td>
                                                        <td>{standing.won}</td>
                                                        <td>{standing.draw}</td>
                                                        <td>{standing.lost}</td>
                                                        <td>{standing.goalsFor}</td>
                                                        <td>{standing.goalsAgainst}</td>
                                                        <td>{standing.goalDifference}</td>
                                                        <td>{standing.points}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </TabPanel>
                                <TabPanel tabalign="center">
                                    <table class="table table-hover table-responsive">
                                        <tbody>
                                        {
                                            this.state.leagueMatches
                                            .sort((a,b) => new Date(b.utcDate) - new Date(a.utcDate))
                                            .map(function(match, i){
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            {moment.utc(match.utcDate).local().format("Do MMM YYYY")}
                                                            <br />
                                                            {moment.utc(match.utcDate).local().format("h:mm:ss a")}
                                                        </td>
                                                        <td>
                                                            {match.homeTeam.name}
                                                        </td>
                                                        <td>
                                                            {match.score.fullTime.homeTeam}
                                                            &nbsp;vs&nbsp;
                                                            {match.score.fullTime.awayTeam}
                                                        </td>
                                                        <td>
                                                            {match.awayTeam.name}
                                                        </td>
                                                        <td>
                                                            <Link to={`/football/match-info/${match.id}`}>
                                                                More...
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </TabPanel>
                                <TabPanel tabalign="center">
                                    <table class="table table-hover table-responsive">
                                        <tbody>
                                        {
                                            this.state.upcomingLeagueMatches
                                            .sort((a,b) => new Date(a.utcDate) - new Date(b.utcDate))
                                            .map(function(match, i){
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            {moment.utc(match.utcDate).local().format("Do MMM YYYY")}
                                                            <br />
                                                            {moment.utc(match.utcDate).local().format("h:mm:ss a")}
                                                        </td>
                                                        <td>
                                                            {match.homeTeam.name}
                                                        </td>
                                                        <td>
                                                            {match.score.fullTime.homeTeam}
                                                            &nbsp;vs&nbsp;
                                                            {match.score.fullTime.awayTeam}
                                                        </td>
                                                        <td>
                                                            {match.awayTeam.name}
                                                        </td>
                                                        <td>
                                                            <Link to={`/football/match-info/${match.id}`}>
                                                                More...
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </TabPanel>
                            </Tabs>
                            
                        </div>
                    </div>

                    {/* <h5 class="card-header">Standings - {this.state.selectedLeagueName}</h5>
                    <div class="card-body scroll">
                        <table class="table table-hover table-responsive">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Team</th>
                                <th>P</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>GF</th>
                                <th>GA</th>
                                <th>GD</th>
                                <th>PTS</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.standings
                                .sort((a,b) => parseInt(a.position) - parseInt(b.position))
                                .map(function(standing, i){
                                    return (
                                        <tr key={i}>
                                            <td>{standing.position}</td>
                                            <td>
                                                <img src={standing.crestURI} style={{width: 25, height: 25}} alt=""/>
                                                {standing.teamName}
                                            </td>
                                            <td>{standing.playedGames}</td>
                                            <td>{standing.wins}</td>
                                            <td>{standing.draws}</td>
                                            <td>{standing.losses}</td>
                                            <td>{standing.goals}</td>
                                            <td>{standing.goalsAgainst}</td>
                                            <td>{standing.goalDifference}</td>
                                            <td>{standing.points}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div> */}
                </div>
                
            </div>
        </div>        
      );
    }
}

export default FootballLeagueInfo;