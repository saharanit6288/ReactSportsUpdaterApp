class Global {
    constructor() {
      this.NewsUrl = 'https://newsapi.org/';
      this.NewsApiKey= '817ce204f34c4ee19ed5ceec9d99c62b';

      this.FootballUrl = 'https://apifootball.com/api/';
      this.FootballApiKey= '4abeba83c246625ed6a39107daec6881704ae5f346a1c4ce8e70c59db4859011';
      this.FootballDefaultCountryId= 169;
      this.FootballDefaultLeagueId= 62;

      this.EventBaseUrl= 'https://api.predicthq.com/v1/';
      this.EventApiToken= 'dUxdfAZkmonf597ln7ouyWL7SziJGU';

      this.FootballUrl2 = 'https://api.football-data.org/v1/';
      this.FootballApiKey2 = '215733580c0d4917aace7576750b25a5';

      this.CricketApiUrl = 'https://cricapi.com/api/';
      this.CricketApiKey = '9C1Q4T7jeEhGJuoe8dgDWwf9t5h1';

      this.FootballUrl2019 = 'https://api.football-data.org/v2/';
      this.FootballApiKey2019 = '215733580c0d4917aace7576750b25a5';
    }
  }
  
  export default (new Global());