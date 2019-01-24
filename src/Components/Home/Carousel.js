import React, { Component } from 'react';

class Carousel extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            images: [
                {url: 'http://lundcricketclub.org/wp-content/uploads/2017/01/cricket-wallpapers-017.jpg', title: 'Cricket Updates', description: 'Get Cricket Updates.'},
                {url: 'https://media3.mensxp.com/media/section/2015/Feb/football1366_1424159532.jpg', title: 'Football Updates', description: 'Get Football Updates.'},
                {url: 'http://dubaieye1038.com/wp-content/uploads/2017/10/DubaiEye-header-SportsNews.jpg', title: 'Sports News', description: 'Get Sports News Updates.'},
            ]
        };
    }
    

    render() {
      return (
        <header>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                {
                    this.state.images.map(function(img, i){
                        return <li key={i} data-target="#carouselExampleIndicators" data-slide-to={i} className={i===0?'active':''}></li>
                    })
                }
                
                </ol>
                <div class="carousel-inner" role="listbox">
                {
                    this.state.images.map(function(img, i){
                        return (
                            <div key={i} className={"carousel-item " + (i===0?'active':'')} style={ { backgroundImage: `url(${img.url})` } }>
                                <div class="carousel-caption d-none d-md-block">
                                <h3>{img.title}</h3>
                                <p>{img.description}</p>
                                </div>
                            </div>
                        )
                    })
                    
                }
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
                </a>
            </div>
        </header>       
      );
    }
}

export default Carousel;