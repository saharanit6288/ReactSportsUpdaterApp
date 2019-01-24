import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Global from '../Shared/Global';
import axios from 'axios';

class CompetitionList extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            leagues: []
        };
    }

    fetchLeagues()
    {
        var urlPath = Global.FootballUrl2019 + "competitions/?plan=TIER_ONE";
        var config = { headers: { 'X-Auth-Token': `${Global.FootballApiKey2019}` } };

        axios.get(urlPath, config)
          .then(res => {
            if(res.data !== undefined){
                const leagues = res.data.competitions;
                //console.log(leagues);
                this.setState({ leagues });
              }
              else{
                this.setState({ leagues: [] });
              }
          })
          .catch(error => {
            this.setState({ leagues: [] });
          })
    }    

    componentDidMount() {
        this.fetchLeagues();
    }


    render() {
    
      return (
        

                <div class="col-lg-4 mb-4">
                    <div class="card mb-4">
                        <h5 class="card-header">Football Leagues</h5>
                        <div class="card-body">
                        
                        <div class="input-group">
                            <ul class="list-unstyled mb-0">
                                {
                                    this.state.leagues.map(function(league, i){
                                        return (  
                                            <li key={i}>
                                                <Link to={`/football/league-info/${league.id}`}>
                                                    {league.name}&nbsp;({league.area.name})
                                                </Link>
                                                <hr />
                                            </li>
                                        )
                                    })
                                }  
                            </ul>
                        </div>
                        
                        </div>
                    </div>
                </div>

                
      );
    }
}

export default CompetitionList;