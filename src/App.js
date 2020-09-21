import React from 'react';
import rssProviders from './rssProviders.json';
import jsonFeed from './rssFeed.json';
import Moment from 'react-moment';
import './App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Section, Container, Columns, Box, Tag } from "react-bulma-components";

let showNumbers = () => {
    let formattedNumbers = [],
        number = (rssProviders.clicks).toString();

    for (let i = 0; i < number.length; i++) {
        formattedNumbers.push(<span className="num">{number[i]}</span>);
    }

    return formattedNumbers;
};

function App() {
    let formattedJSON = getJsonFeed();

  return (
    <div>
        <Section className={"is-medium gradient-color"}>
            <Container className={"has-text-centered"}>
                <h1 className={"title formatting is-spaced has-text-weight-bold"}>FlightWatcher</h1>
                <p className={"subtitle"}>
                    <h2 className={"subtitle formatting"}>
                        The best RSS cheap flight tracker</h2>
                        <span>
                            {showNumbers()}
                            &nbsp;&nbsp;new passengers
                        </span>
                </p>
            </Container>
        </Section>
        <Section>
            <Container>
                <h6 className={"subtitle is-6"}>
                    <Columns className={"is-gapless"}>
                        <Columns.Column className={"has-text-right upload-date"}>

                        </Columns.Column>
                    </Columns>
                </h6>
                <Columns>
                    <Columns.Column size="one-fifth">
                        <Box>
                            <h6 className={"title is-6"}>Filter</h6>
                            <label className="checkbox"><input type="checkbox"/> Europe</label>
                            <label className="checkbox"><input type="checkbox"/> USA</label>
                        </Box>
                    </Columns.Column>
                    <Columns.Column>
                        <Container>
                            <ol>
                                {formattedJSON && formattedJSON.map(function(item, index){
                                    return (
                                        <li key={index} className="boxed media">
                                            <div className="media-left">
                                                <img className="logo"
                                                     src={rssProviders.providers[item.provider].image} width={"32"} height={"32"}/>
                                            </div>
                                            <div className="media-content">
                                                <div className="content">
                                                    <div className="title-columns columns is-gapless is-mobile is-marginless">
                                                        <div className="column">
                                                            <h6 className="title is-6 is-marginless">
                                                                <a href={item.link} class="media-link" target={"_blank"} rel={"noopener noreferrer"}>{item.title}</a>
                                                                {item.category && (item.category).map(function(category){
                                                                    return (<Tag className={"is-rounded is-primary is-light tag"}>{category}</Tag>);
                                                                })}
                                                                {item.flightInfo ?
                                                                    item.flightInfo.from && item.flightInfo.to && item.flightInfo.price ?
                                                                        <Tag
                                                                            className={"is-rounded is-info is-light tag"}>{item.flightInfo.from + " -> " + item.flightInfo.to + " (" + item.flightInfo.price + ")"}</Tag>
                                                                        :
                                                                        item.flightInfo.from && item.flightInfo.to ?
                                                                            <Tag
                                                                                className={"is-rounded is-info is-light tag"}>{item.flightInfo.from + " -> " + item.flightInfo.to}</Tag>
                                                                            :
                                                                            item.flightInfo.price ?
                                                                                <Tag
                                                                                    className={"is-rounded is-info is-light tag"}>{item.flightInfo.price}</Tag>
                                                                                :
                                                                                null
                                                                    :
                                                                    null
                                                                }
                                                            </h6>
                                                        </div>
                                                        <div className="column is-narrow upload-date">
                                                            <Moment fromNow>{item.pubDate}</Moment>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                        </Container>
                    </Columns.Column>
                </Columns>
            </Container>
        </Section>
    </div>
  );
}

function getJsonFeed(provider = null){
    let formattedFeed = [];

    if(!provider) {
        for (let key in jsonFeed) {
            if(jsonFeed.hasOwnProperty(key)){
                jsonFeed[key].forEach(element => {
                    element.provider = key;
                    formattedFeed.push(element);
                })
            }
        }
    }

    formattedFeed.sort((a, b) => (a.pubDate < b.pubDate) ? 1 : -1);

    return formattedFeed;
}

export default App;
