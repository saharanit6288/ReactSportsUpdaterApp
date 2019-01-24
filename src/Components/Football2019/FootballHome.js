import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../Shared/Global';
import axios from 'axios';
import moment from 'moment';

import CompetitionList from './CompetitionList';

class FootballHome extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            recentMatches: [],
            upcomingMatches: []
        };

    }
    

    fetchRecentMatches()
    {
        var toDate = moment().add(-1, 'days').format("YYYY-MM-DD"); 
        var fromDate = moment().add(-3, 'days').format("YYYY-MM-DD");
        var urlPath = Global.FootballUrl2019 + "matches/?plan=TIER_ONE&dateFrom="+fromDate+"&dateTo="+toDate;
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2019}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data !== undefined){
                const recentMatches = res.data.matches;
                //console.log(recentMatches);
                this.setState({ recentMatches });
              }
              else{
                this.setState({ recentMatches: [] });
              }
          })
          .catch(error => {
            this.setState({ recentMatches: [] });
          })
    }  

    fetchUpcomingMatches()
    {
        var fromDate = moment().format("YYYY-MM-DD"); 
        var toDate = moment().add(3, 'days').format("YYYY-MM-DD");
        var urlPath = Global.FootballUrl2019 + "matches/?plan=TIER_ONE&dateFrom="+fromDate+"&dateTo="+toDate;
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2019}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data !== undefined){
                const upcomingMatches = res.data.matches;
                //console.log(upcomingMatches);
                this.setState({ upcomingMatches });
              }
              else{
                this.setState({ upcomingMatches: [] });
              }
          })
          .catch(error => {
            this.setState({ upcomingMatches: [] });
          })
    }  

    componentDidMount() {
        this.fetchRecentMatches();
        this.fetchUpcomingMatches();
    }


    render() {
    const title ="Football Updates";
      return (
        <div class="container">

            <h1 class="mt-4 mb-3">
                {title}
            </h1>
    
            <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item active">{title}</li>
            </ol>
    
            <div class="row">

                <CompetitionList />

                <div class="col-lg-8 mb-4">
                    <div class="card">
                        <h5 class="card-header">Recent Matches</h5>
                        <p>&nbsp;</p>
                        <div class="card-body text-center scroll">
                            <table class="table table-hover table-responsive">
                                <tbody>
                                {
                                    this.state.recentMatches
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
                                                    {match.competition.name}
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
                        </div>
                    </div>

                    <div class="card">
                        <h5 class="card-header">Upcoming Matches</h5>
                        <p>&nbsp;</p>
                        <div class="card-body text-center scroll">
                            <table class="table table-hover table-responsive">
                                <tbody>
                                {
                                    this.state.upcomingMatches
                                    .sort((a,b) => new Date(a.utcDate) - new Date(b.utcDate))
                                    .map(function(umatch, i){
                                        return (
                                            
                                            <tr key={i}>
                                                <td>
                                                    {moment.utc(umatch.utcDate).local().format("Do MMM YYYY")}
                                                    <br />
                                                    {moment.utc(umatch.utcDate).local().format("h:mm:ss a")}
                                                </td>
                                                <td>
                                                    {umatch.competition.name}
                                                </td>
                                                <td>
                                                    {umatch.homeTeam.name}
                                                </td>
                                                <td>
                                                    {umatch.score.fullTime.homeTeam}
                                                    &nbsp;vs&nbsp;
                                                    {umatch.score.fullTime.awayTeam}
                                                </td>
                                                <td>
                                                    {umatch.awayTeam.name}
                                                </td>
                                                <td>
                                                    <Link to={`/football/match-info/${umatch.id}`}>
                                                        More...
                                                    </Link>
                                                </td>
                                            </tr>
                                            
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>        
      );
    }
}

export default FootballHome;