import logo from "./logo.svg";
import "./App.css";

import React, { Component } from "react";
import axios from "axios";


import anime from "animejs/lib/anime.es.js";
import * as eva from "eva-icons";

import * as cheerio from 'cheerio';

import Cookies from 'js-cookie'

// import TableContainer from "./TableContainer"
// https://thewidlarzgroup.com/react-table-7/
// https://github.com/TheWidlarzGroup/RT7-example/blob/102c5bbfddf9e01e556b84e81de51ef2cef3ba5e/src/App.js

import TableContainer from "./Table_mine";
import Animated_bar from "./Animated_hr.jsx";
import Header from "./Header.jsx";
import Display_simple_graph from "./Display_simple_graph.jsx";
import Display_bubble_graph from "./Display_bubble_graph.jsx";
import Tooltip from "./Tooltip.jsx";



import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

// https://blog.logrocket.com/complete-guide-building-smart-data-table-react/
// https://github.com/learnwithparam/logrocket-smart-table

import { useState, useEffect } from "react";
import { random } from "animejs";

// import data_test from "./data_test.js";
import data_test from "./data_test_topics.js";

// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


class App extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            list_of_starred          : [],
            distribution_of_languages: {},
            muted                    : true,
        };
    }

    // state_toggle_mute()
    // {
    //     console.log("Toggling...", this.state.muted)
    //     // if (this.state.muted) { this.setState({muted: false}) }
    //     // else                  { this.setState({muted: true }) }
    //     this.setState(prev_state => ({muted: !prev_state.muted}))
    // }

    // state_toggle_mute(context)
    // {
    //     if (context.state.muted) { context.setState({muted: false}) }
    //     else                     { context.setState({muted: true }) }
    // }

    render()
    {
        let audio_pop = new Audio("/pop_0.mp3");

        const state_toggle_mute = () =>
        {
            // console.log("Toggling...", this.state.muted)
            // if (this.state.muted) { this.setState({muted: false}) }
            // else                  { this.setState({muted: true }) }
            this.setState(
                prev_state => ({muted: !prev_state.muted}), 
                ()         => {Cookies.set('muted', this.state.muted.toString()); console.log("Toggled !...", this.state.muted.toString()) }
            )
        }

        // function render_volume_state()
        // {
        //     console.log("Renderig...")
        //     if (this.state.muted) { return ( <div onClick={this.state.state_toggle_mute()} > <i data-eva="volume-off-outline"  fill="#343434"></i> </div> ) }
        //     else                  { return ( <div onClick={this.state.state_toggle_mute()} > <i data-eva="volume-up-outline"   fill="#343434"></i> </div> ) }
        // }

        // const render_volume_state = () =>
        // {
        //     console.log("Renderig...", this)
        //     return ( <h1>asd</h1>)
        //     // return ( <h1>{context.sate.muted}</h1>)
        //     // if (context.state.muted) { return ( <div onClick={context.state_toggle_mute()} > <i data-eva="volume-off-outline"  fill="#343434"></i> </div> ) }
        //     // else                     { return ( <div onClick={context.state_toggle_mute()} > <i data-eva="volume-up-outline"   fill="#343434"></i> </div> ) }
        // }

        return (

            <div style={{ 
                backgroundColor: "black",
                // height         : "100%",
                display        : "flex",
                justifyContent : "center",
                minHeight         : "100%",
            }}>
            
            {/* <div className="element_spacer"></div> */}

            {/* 😚 Container of the elements ! */}
            <div style={{ 
                backgroundColor: "#0e0e0e",
                // backgroundColor: "red",
                // height         : "100%",
                minHeight    : "100%",
                width        : "1000px",
                display      : "flex",
                flexDirection: "column",
                alignItems   : "center",
            }}>
                <Tooltip></Tooltip>

                <div className="element_spacer"></div>

                {/* <Header user="egeres"></Header> */}

                <Router>
                <nav>
                    <div style={{display:"flex"}}>
                        <Link to="/"      className="link_router" onClick={()=>{if (!this.state.muted) {audio_pop.play()}}}>Overview</Link>
                        <p>-</p>
                        <Link to="/table" className="link_router" onClick={()=>{if (!this.state.muted) {audio_pop.play()}}}>Table</Link>
                        {/* <p>-</p>
                        <Link to="/users" className="link_router">Users</Link> */}

                        {/* {
                            if (true) { return <a> </a>}
                        } */}

                        {/* <Button_toggle_sound onoroff={this.state.muted} onClick={this.state_toggle_mute}></Button_toggle_sound> */}
                        {/* <Button_toggle_sound onoroff={this.state.muted} onClick={this.state_toggle_mute.bind(this)}></Button_toggle_sound> */}
                        {/* <Button_toggle_sound onoroff={this.state.muted}></Button_toggle_sound> */}
                        <div onClick={() => state_toggle_mute()}>
                            <Button_toggle_sound onoroff={this.state.muted}></Button_toggle_sound>
                        </div>

                        {/* <p onClick={this.state_toggle_mute()} >asdasdads</p> */}
                        {/* <p onClick={() => state_toggle_mute()} >asdasdads</p> */}


                        {/* {render_volume_state.bind(this)} */}
                        {/* {render_volume_state(this)} */}

                        {/* <i data-eva="volume-up-outline" fill="#343434"></i>
                        <i data-eva="volume-off-outline" fill="#343434"></i> */}
                    </div>
                </nav>

                <div className="element_spacer"></div>

                <Switch>
                    <Route exact path="/">

                        <div style={{
                            display:"flex"
                        }}>

                            
                            {/* <h3>Distribution of starred repos</h3> */}
                            <Display_simple_graph 
                            data   = {this.extract_star_count(this.state.list_of_starred)}
                            width  = {500}
                            height = {500}
                            margin = {50  }
                            />

                            {/* <div class="element_spacer"></div> */}

                            <Display_bubble_graph
                            // data   = {[
                            //     {name:"A BBBB", radius:100},
                            //     {name:"B BBBB", radius:30},
                            // ]}
                            data   = {this.state.distribution_of_languages}
                            width  = {500}
                            height = {500}
                            margin = {50  }
                            />

                        </div> 
                    </Route>
                    <Route path="/table">
                        {/* <div> */}
                        {/* <TableContainer columns={this.columns} data={this.data} /> */}
                        {/* <TableContainer columns={this.columns} data={this.state.list_of_starred} /> */}
                        <TableContainer columns={this.columns} data={data_test} />
                        {/* </div> */}
                    </Route>
                </Switch>
                </Router>

            </div>

            </div>

        );
    }

    extract_star_count(data)
    {
        let to_return = []
        data.forEach(element => {

            let   hehe    = (Math.round(element.stargazers_count/1000)*1000)/1000
            
            let was_incremented = false;
            for (let i = 0; i < to_return.length; i++) {
                const element = to_return[i];

                if (element.x == hehe) { element.y += 1; was_incremented = true }
            }

            if (!was_incremented) { to_return.push({
                x: hehe,
                y: 1,
            }) }

        });

        // console.log(to_return)
        return to_return
        // return [{x:10, y:10}, {x:20, y:20}]
    }

    componentWillMount()
    {

        this.columns = [
            // {
            //     Header: "Details",
            //     columns: [
                    { Header: "Name", accessor: "name", },
                    { Header: "Stars", accessor: "stargazers_count", },
                    { Header: "Language", accessor: "language", },
                    {
                        Header: "Topics",
                        accessor: "topics",
                        Cell: ({ cell: { value } }) => (
                            <Genres values={value} />
                        ),
                    },
                    // { Header: "Runtime", accessor: "show.runtime", },
                    // { Header: "Status", accessor: "show.status", },
            //     ],
            // },
        ];

        this.data = [
            {
                score: 17.592657,
                show: {
                    id: 44813,
                    url: "http://www.tvmaze.com/shows/44813/the-snow-spider",
                    name: "The Snow Spider",
                    type: "Scripted",
                    language: "English",
                    genres: ["Drama", "Fantasy"],
                    status: "In Development",
                    runtime: 30,
                    premiered: null,
                    officialSite: null,
                    schedule: {
                        time: "",
                        days: [],
                    },
                },
            },
            {
                score: 17.592657,
                show: {
                    id: 44813,
                    url: "http://www.tvmaze.com/shows/44813/the-snow-spider",
                    name: "The cook",
                    type: "Scripted",
                    language: "English",
                    genres: ["Drama", "Fantasy"],
                    status: "In Development",
                    runtime: 20,
                    premiered: null,
                    officialSite: null,
                    schedule: {
                        time: "",
                        days: [],
                    },
                },
            },
            {
                score: 17.592657,
                show: {
                    id: 44813,
                    url: "http://www.tvmaze.com/shows/44813/the-snow-spider",
                    name: "The cook",
                    type: "Scripted",
                    language: "English",
                    genres: ["Drama", "Fantasy"],
                    status: "In Development",
                    runtime: 50,
                    premiered: null,
                    officialSite: null,
                    schedule: {
                        time: "",
                        days: [],
                    },
                },
            },
        ];

    }

    async componentDidMount()
    {

        // Call to update eva icons
        eva.replace()

        // We set the variables stored in the cookies
        this.setState(prev_state => ({muted: Cookies.get('muted') === 'true'}))

        const get_repos_API = (user, page=0) => axios
            .get(`https://api.github.com/users/${user}/starred?per_page=100&page=${page+1}`)
            .then(res => res.data)
            .then(res => res.map(x => {
                return {
                    id              : x.id,
                    name            : x.name,
                    full_name       : x.full_name,
                    html_url        : x.html_url,
                    stargazers_count: x.stargazers_count,
                    language        : x.language,
                    created_at      : x.created_at,
                    topics          : null,
                }
                }
            ))

        const get_topics_API = (url) => axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept"      : "application/vnd.github.mercy-preview+json" // MUST ADD TO INCLUDE TOPICS
                }
            })
            .then((res) => res.data)

        const get_topics_scrapping = (url) => axios
            .get(url, {
                headers: {
                    'Content-Type': 'text/plain',
                }
            })
            .then(
                (res)   => { if(res.status === 200) { return res.data } },
                (error) => { console.log(error)}
            )
            // .then((html) => {
            //     let $ = cheerio.load(html);
            //     return $(".topic-tag")
            //     // topic-tag
            // })
            

        let list_of_repos = []

        if (false)
        {
            let extracted = ""
            
            // A while loop would be better tho
            // We first get a full list of all the repositories
            for (let page = 0; page < 99999; page++)
            {
                extracted = await get_repos_API("egeres", page).then(x => {return x})
                if (extracted.length === 0) { break; }
                else                        { list_of_repos += extracted; }
            }

            // Secondly, we proceed to extract the different topics present on the repo
            for await (let info_extracted of list_of_repos)
            {                
                // info_extracted.topics = await get_topics_API("https://api.github.com/repos/"+info_extracted.full_name+"/topics")
                // info_extracted.topics = info_extracted.topics.names
                // info_extracted.topics = []
            }
        }

        // let coso = await get_topics_scrapping("https://github.com/cheeriojs/cheerio")
        // let coso = await get_topics_scrapping("https://dev.to/aurelkurtula")
        // console.log(coso)

        console.log("Finished extracting information from user...")
        console.log(list_of_repos)
        

        this.setState({list_of_starred: data_test})

        let tmp = {};
        for await (let repo of data_test)
        {
            if (!(repo.language in tmp)) { tmp[repo.language] = 1 }
            else                         { tmp[repo.language]++;  }
        }
        this.setState({distribution_of_languages: tmp})


        // get_topics("https://api.github.com/repos/serengil/deepface/topics").then(console.log);

        // https://api.github.com/repos/serengil/deepface/topics

		// https://api.github.com/users/karpathy
    }
}

// const Button_toggle_sound = (props) => {
//     console.log(props)
//     if (props.onoroff) { return ( <div onClick={props.onClick} > <i data-eva="volume-off-outline"  fill="#343434"></i> </div> ) }
//     else               { return ( <div onClick={props.onClick} > <i data-eva="volume-up-outline"   fill="#343434"></i> </div> ) }
// }

const Button_toggle_sound = (props) => {
    // console.log("props", props)

    // useEffect(() => {
    //     eva.replace()
    // }, []);

    // if (props.onoroff) { return ( <i data-eva="volume-off-outline"  fill="#343434"></i> ) }
    // else               { return ( <i data-eva="volume-up-outline"   fill="#343434"></i> ) }

    // if (props.onoroff) { return ( <i>AAAAA</i> ) }
    // else               { return ( <i>BBBBB</i> ) }

    // let kjasndkjnad = "volume-off-outline"
    // if (props.onoroff) { kjasndkjnad = "volume-up-outline" }
    // return ( <i data-eva={kjasndkjnad} fill="#343434"></i> )

    // eva.replace()

    return (
        <div>
            <div className={props.onoroff ? '' : 'hidden'}> <i  data-eva="volume-off-outline" fill="#343434"></i> </div>
            <div className={props.onoroff ? 'hidden' : ''}> <i  data-eva="volume-up-outline"  fill="#343434"></i> </div>
        </div>
        )
}

// Custom component to render Genres
const Genres = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (
        <>
            {values.map((genre, idx) => {
                return (
                    <span key={idx} className="badge">
                    {/* <nobr> */}
                    {genre}
                    {/* </nobr> */}
                    </span>
                );
            })}
        </>
    );
};

export default App;
