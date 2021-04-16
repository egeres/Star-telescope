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
// https://www.akashmittal.com/gui-utility-to-generate-react-table-code/

// import TableContainer from "./Table_mine";
import TableContainer from "./Table_new.jsx";
import Animated_bar from "./Animated_hr.jsx";
import Header from "./Header.jsx";
import Display_simple_graph from "./Display_simple_graph.jsx";
import Display_bubble_graph from "./Display_bubble_graph.jsx";
import Tooltip from "./Tooltip.jsx";
import Popup from "./Popup_screen.jsx";

import Data_digitize from "./data_from_arrayofvalues_to_listofcounts.js";

import Local_database from "./local_database_repos_topics.js"

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
import { reduce } from "d3-array";
// import data_test from "./data_test_full.js";

// axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';


class App extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            stars_count              : 0,
            list_of_starred          : [],
            distribution_of_languages: {},
            muted                    : true,
            max_scrapping_pages      : 99999,
            username_to_search       : "",
            username_current         : "",

            popup_show       : false,
            popup_title      : "Test",
            popup_description: "🙄",
        };
    }

    render()
    {
        let root_origin  = "";
        root_origin      = "/Star-telescope"
        let audio_pop    = new Audio(root_origin+"/pop_0.mp3");
        audio_pop.volume = 0.2;

        const handleChange_username = (event) =>
        {
            this.setState({username_to_search: event.target.value});
        }

        const state_toggle_mute = () =>
        {
            this.setState(
                prev_state => ({muted: !prev_state.muted}), 
                ()         => {Cookies.set('muted', this.state.muted.toString()); console.log("Toggled !...", this.state.muted.toString()) }
            )
        }

        const toggle_popup_window = () =>
        {
            this.setState({popup_show: !this.state.popup_show});
        }

        return (

            <div style={{ 
                backgroundColor: "black",
                display        : "flex",
                justifyContent : "center",
                minHeight      : "100%",
            }}>
            
            {this.state.popup_show && <Popup
                title          = {this.state.popup_title}
                description    = {this.state.popup_description}
                function_close = {toggle_popup_window}
            />}

            <div 
                className="background_grid_50"
                style={{ 
                    backgroundColor: "#0e0e0e",
                    minHeight      : "100%",
                    width          : "1000px",
                    display        : "flex",
                    flexDirection  : "column",
                    alignItems     : "center",
            }}>
                <Tooltip></Tooltip>

                <div className="element_spacer"></div>

                <Header 
                    user       = {this.state.username_current}
                    star_count = {this.state.stars_count}
                ></Header>

                <div className="element_spacer"></div>

                <Router>
                <nav className="Navigation_bar">

                    <input
                        id="input_username"
                        style        = {{ 
                            width          : "223px",
                            backgroundColor: "#0e0e0e",
                            borderColor    : "#343434",
                            borderStyle    : "solid",
                            fontSize       : "16px",
                            margin         : "10px",
                            marginRight    : "0px",
                            color          : "#343434",
                        }}
                        placeholder = "username to search 😀"
                        value       = {this.state.username_to_search}
                        onChange    = {handleChange_username}
                    ></input>

                    <button
                        style={{
                            margin    : "10px",
                            marginLeft: "0px",
                        }}
                        onClick={() => {
                            if (this.state.username_current !== this.state.username_to_search)
                            {
                                this.setState({username_current: this.state.username_to_search}); 
                                this.extract_user_data().then(x => { console.log("Exiting...", x)});
                            }
                            if (!this.state.muted && this.state.username_current !== this.state.username_to_search) {audio_pop.play()}
                        }}
                    >
                        Go !
                    </button>

                    <div className="element_spacer"></div>

                    <div style={{height:"100%", display:"flex", justifyContent:"center", backgroundColor:"transparent", alignItems:"center"}}>

                        <Link to={root_origin+"/"}      className="link_router" onClick={()=>{if (!this.state.muted) {audio_pop.play()}}}>Overview</Link>
                        
                        <block_mini/>

                        <Link to={root_origin+"/table"} className="link_router" onClick={()=>{if (!this.state.muted) {audio_pop.play()}}}>Table</Link>
                        
                        <block_mini/>

                        <Link to={root_origin+"/why"} className="link_router" onClick={()=>{if (!this.state.muted) {audio_pop.play()}}} style={{height:"24px"}}>
                            <i data-eva="question-mark-outline" fill="#343434"></i>
                        </Link>

                        <block_mini/>

                        <a href="https://github.com/egeres/Star-telescope" target="_blank" style={{margin:"10px" , height:"24px"}}>
                            <i data-eva="star-outline" fill="#343434"></i>
                        </a>

                        <block_mini/>

                        <div onClick={() => state_toggle_mute()} style={{margin:"10px"}}>
                            <Button_toggle_sound onoroff={this.state.muted}></Button_toggle_sound>
                        </div>

                    </div>
                </nav>

                <div className="element_spacer"></div>

                <Switch>
                    <Route exact path={root_origin+"/"}>

                        <div style={{
                            display:"flex"
                        }}>
                            <Display_simple_graph
                                width        = {500}
                                height       = {500}
                                margin       = {50 }
                                func_tooltip = {(d, i) => {return " " + i.y + " repos with stars in the range " + i.x*10 + "K - " + (i.x+1)*10+"K"}}
                                func_axis_x  = { x     => {return x*10+"K"}}
                                data         = {
                                    Data_digitize(this.state.list_of_starred.map(x => x.stargazers_count), 10000)
                                    .filter(x => !isNaN(x))
                                    .map((v, i) => {return {"x":i, "y":v}})
                                }
                            />

                            <Display_bubble_graph
                            data   = {this.state.distribution_of_languages}
                            width  = {500}
                            height = {500}
                            margin = {50  }
                            />

                        </div> 
                    </Route>
                    <Route       path={root_origin+"/table"} style={{overflow:"hidden"}}>
                        {/* <div> */}
                        {/* <TableContainer columns={this.columns} data={this.data} /> */}
                        <TableContainer 
                            columns  = {this.columns}
                            data     = {this.state.list_of_starred}
                            // pageSize = {100}
                        />
                        {/* <TableContainer columns={this.columns} data={data_test} /> */}
                        {/* </div> */}
                    </Route>
                    <Route       path={root_origin+"/why"}>
                        <div style={{width:"80%", fontSize:"18px"}}>
                        Github is a wonderful tool not just for storing and management of repositories in the cloud. It also serves as a personal library of bookmarks of useful projects which might aid us in the future. This open source project only attempts to provide new means to extract insight from the starred repos of a user as well as ease the navigation process through them.
                        </div>
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

            let hehe = (Math.round(element.stargazers_count/1000)*1000)/1000
            
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

        return to_return
    }

    componentWillMount()
    {
        this.columns = [
            {
                "id"      : "columnId_0_00.3993265160822733",
                "Header"  : "Name",
                "Footer"  : "",
                "accessor": "html_url",
                Cell      : ({ cell: { value } }) => ( <a href={value}>{value.split("/")[ value.split("/").length - 1 ]}</a> )
            },
            {
                "id"      : "columnId_0_00.8048758967415083",
                "Header"  : "Stars",
                "Footer"  : "",
                "accessor": "stargazers_count",
            },
            {
                "id"      : "columnId_0_00.9075474765424285",
                "Header"  : "Language",
                "Footer"  : "",
                "accessor": "language",
            },
            {
                "id"      : "columnId_0_00.4798125422028431",
                "Header"  : "Topics",
                "Footer"  : "",
                "accessor": "topics",
                Cell      : ({ cell: { value } }) => ( <Genres values={value} /> ),
            }
        ]
    }

    async componentDidMount()
    {

        // Call to update eva icons 🥱
        eva.replace()

        // We set the variables stored in the cookies 🙄
        this.setState(prev_state => ({muted: Cookies.get('muted') === 'true'}))

        // Small warning 😋
        if (this.state.max_scrapping_pages != 99999) { 
            console.log("Warning 🤔");
            console.log("max_scrapping_pages set to", this.state.max_scrapping_pages)
        }

        // We extract the info from the user! 🥰
        // this.extract_user_data()
    }

    async extract_user_data()
    {
        // The amount of stars is resetted
        this.setState({stars_count: 0})

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
                    forks_count     : x.forks_count,
                    description     : x.description,
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
        
        function sleep(ms)
        {
            return new Promise((resolve) => { setTimeout(resolve, ms); });
        }

        await sleep(100);

        console.log("Extracting user data...")

        let extracted     = []
        let list_of_repos = []
            
        // We first get a full list of all the repositories (A while loop would be better tho...)
        try
        {
            for (let page = 0; page < this.state.max_scrapping_pages; page++)
            {
                console.log("Extracting page", page, "...")
                // extracted = await get_repos_API("egeres", page).then(x => {return x})

                if (this.state.username_current !== "")
                {
                    extracted = await get_repos_API(this.state.username_current, page)
                    .then( x => {return x})
                    .catch(e => {
                        if (e.response.status === 404) { console.log("...0"); return "error 404"; }
                        if (e.response.status === 403) { console.log("...1"); return "error 403"; }
                    });
                    
                    // console.log("extracted =", extracted)

                    if (extracted === null) { return ""; break; }
                    if (extracted === "error 404") {

                        let array_of_witty_responses = [
                            [
                                "You sure you spelled that username correctly ?", 
                                "I bet not",
                            ],
                            [
                                "API gave error 404, sounds like you misspelled the username", 
                                "I'm gladly accepting any pull requests that add some kind of logic to interpolate and search the most probable name",
                            ],
                            [
                                "It's possible that you come from the future and are now realizing that the username you searched for doesn't exist yet",
                                "But occam's razor tells me to guess that you made a typo on the name",
                            ],
                            [
                                "Did you wrote a typo in the nickname, or were you just presing keys at random ? I'm curious",
                            ],
                            [
                                "If I were smarter I would have coded a system to guess what you were going to type",
                            ],
                            [
                                "Error 404 is so mainstream that I can gloss over it's meaning, right ?",
                                "Go check what you typed again !",
                            ],
                            [
                                "It's possible that you're testing names at random on the search bar",
                                "If that's the case, I'll say I was VERY dissapointed by the username '0'",
                                "I was expecting something more interesting"
                            ],
                            [
                                "Funny enough, many 404 errors are time-dependent",
                                "Meaning, you didn't necessarily wrote an incorrect username per se, just at the wrong time",
                                "Such username might be created at the future",
                            ],
                            [
                                "I think you know what this error means",
                                "Also, it's kinda addictive to stalk people using this application",
                                "Have you tried typing funny usernames at random ?",
                                "Worse case scenario, you get one of these 'randomly chosen' 404 errors, which are already funny by themselves",
                            ],
                            [
                                "I just realized I could have coded a system that procedurally generates a user with random starred repos so that this would never retrieve error 404",
                            ],
                            [
                                "Nope, that name doesn't exist",
                            ],
                            [
                                "I'm very sorry that the name you wrote isn't registered in Github",
                                "But things sometimes have a good point of view, were you intrigued if you could register that name yourself ?",
                                "In that case, this error might just be the best news in your day !",
                            ],
                            [
                                "Oh, sadly you got error 404...",
                                "Tell you what, here's a joke",
                                "",
                                "There are 10 types of people in the world:",
                                "- Those who understand binary",
                                "- Those who don't",
                                "- Those who understand that '10' can actually refer to any numeric base ranging from binary to infinity",
                                "",
                                "(I bet you didn't see that coming 😉)",
                            ],
                            [
                                "Yeah, you couldn't find that username, sorry :/",
                                "Funny enough, these messages are randomly scripted, so they change from error to error",
                                "I wonder if this is the first one you see or if you're trying to catch them all",
                                "In theory you could never be really really certain of having seen the all (without peeking at the source code) since they are chosen at random",
                            ],
                            [
                                "Nooope, doesn't ring a bell",
                            ],
                            [
                                "I'm kinda tired of trying to come up with witty lines to make these errors more entertaining",
                                "Never though creating easter eggs would drain so much energy..."
                            ]
                        ]

                        let witty_response =  array_of_witty_responses[Math.floor(Math.random() * array_of_witty_responses.length)]

                        this.setState({
                            popup_title      : "Error 404 🤔",
                            popup_description: witty_response,
                        })
                        this.toggle_popup_window();
                        return "";
                        break; 
                    }
                    if (extracted === "error 403") {
                        this.setState({
                            popup_title      : "Error 403 ✋🏻",
                            popup_description: [
                                "Okay, this is a weird one...",
                                "Turns out, this is a front-end-only website. I.e, it directly calls Github's API without any kind of token. The problem with this is that the former has a limited amount of 60 requests per hour by IP address. You can consult how many of such tokens you have left at https://api.github.com/rate_limit. I'm open to better ideas different from using such an API system as long as they keep the no-backend spirit of the proyect. Thanks for understanding !", 
                                "TLDR: You gotta wait an hour 😢"
                            ],
                        })
                        this.toggle_popup_window();
                        return "";
                        break; 
                    }
                }
                else
                {
                    extracted = [];
                }

                
                if (extracted.length === 0) { break; }
                else                        { 
                    list_of_repos = list_of_repos.concat(extracted); 
                    this.setState({stars_count: list_of_repos.length})
                }
            }

            // Topics are extracted from a local database not to overuse github's API limit of anonymous requests
            for (let i = 0; i < list_of_repos.length; i++)
            {
                if (list_of_repos[i].full_name in Local_database) { list_of_repos[i].topics = Local_database[list_of_repos[i].full_name] }
                else { list_of_repos[i].topics = []; }
            }

            this.setState({list_of_starred: list_of_repos})


            // We update the distribution of languages !
            let tmp = {};

            for await (let repo of list_of_repos)
            {
                let repo_language = repo.language;
                if (repo_language == null) { repo_language = "No language"; } 

                if (!(repo_language in tmp)) { tmp[repo_language] = 1 }
                else                         { tmp[repo_language]++;  }
            }
            this.setState({distribution_of_languages: tmp})

        }
        catch(err)
        {
            console.log("err", err)
        }
    }

    toggle_popup_window = () =>
    {
        this.setState({popup_show: !this.state.popup_show});
    }
}

const block_mini = () => {
    return (<div style={{width:"2px", height:"2px", backgroundColor:"#343434"}}></div>)
}


const Button_toggle_sound = (props) => {
    return (
        <div>
            <div className={props.onoroff ? 'display_flex'   : 'display_hidden'}> <i  data-eva="volume-off-outline" fill="#343434"></i> </div>
            <div className={props.onoroff ? 'display_hidden' : 'display_flex'  }> <i  data-eva="volume-up-outline"  fill="#343434"></i> </div>
        </div>
    )
}

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
