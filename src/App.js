import logo from "./logo.svg";
import "./App.css";

import React, { Component } from "react";
import axios from "axios";

import anime from "animejs/lib/anime.es.js";
import * as eva from "eva-icons";

// import TableContainer from "./TableContainer"
// https://thewidlarzgroup.com/react-table-7/
// https://github.com/TheWidlarzGroup/RT7-example/blob/102c5bbfddf9e01e556b84e81de51ef2cef3ba5e/src/App.js

import TableContainer from "./Table_mine";
import Animated_bar from "./Animated_hr.jsx";
import Header from "./Header.jsx";
import Display_simple_graph from "./Display_simple_graph.jsx";
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

import data_test from "./data_test.js";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_of_starred : [],
        };
    }

    render() {
        return (

            <div style={{ 
                backgroundColor: "black",
                // height         : "100%",
                display        : "flex",
                justifyContent : "center"
            }}>
            
            <div class="element_spacer"></div>

            {/* 😚 Container of the elements ! */}
            <div style={{ 
                backgroundColor: "#0e0e0e",
                // height         : "100%",
                width          : "1000px",
                display        : "flex",
                flexDirection  : "column",
                alignItems     : "center",
            }}>
                <Tooltip></Tooltip>


                <Header user="egeres"></Header>

                <Router>
                <nav>
                    <div style={{display:"flex"}}>
                        <Link to="/"      class="link_router">Overview</Link>
                        <p>-</p>
                        <Link to="/table" class="link_router">Table</Link>
                        {/* <p>-</p>
                        <Link to="/users" class="link_router">Users</Link> */}
                    </div>
                </nav>

                <div class="element_spacer"></div>

                <Switch>
                    <Route exact path="/"> 
                    <div>
                        <Display_simple_graph 
                        data   = {this.extract_star_count(this.state.list_of_starred)}
                        width  = {1000}
                        height = {300 }
                        margin = {50  }
                        />
                    </div> 
                    </Route>
                    <Route path="/table">
                        <div>
                        {/* <TableContainer columns={this.columns} data={this.data} /> */}
                        <TableContainer columns={this.columns} data={data_test} />
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
                    // {
                    //     Header: "Genre(s)",
                    //     accessor: "show.genres",
                    //     Cell: ({ cell: { value } }) => (
                    //         <Genres values={value} />
                    //     ),
                    // },
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

        eva.replace()

        // this.setState({list_of_starred: data_test})

        const get_repos = (user, page=0) => axios
            .get(`https://api.github.com/users/${user}/starred?per_page=100&page=${page+1}`)
            .then(res => res.data)
            .then(res => res.map(x => {
                return {
                    id              : x.id,
                    name            : x.name,
                    fullname        : x.fullname,
                    html_url        : x.html_url,
                    stargazers_count: x.stargazers_count,
                    language        : x.language,
                    created_at      : x.created_at,
                    topics          : null,
                }
                }
            ))

        const get_topics = (url) => axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept"      : "application/vnd.github.mercy-preview+json" // MUST ADD TO INCLUDE TOPICS
                }
            })
            .then((res) => res.data)

        let extracted = ""
        
        extracted = await get_repos("egeres", 1).then(x => {console.log(x); return x})
        console.log(extracted)

        // extracted = get_repos("egeres", 1000)
        get_repos("egeres", 1000).then(x => {extracted = x})
        console.log(extracted)


        this.setState({list_of_starred: data_test})
        
        // get_topics("https://api.github.com/repos/serengil/deepface/topics").then(console.log);

        // https://api.github.com/repos/serengil/deepface/topics

		// https://api.github.com/users/karpathy
    }
}

// Custom component to render Genres
const Genres = ({ values }) => {
    // Loop through the array and create a badge-like component instead of a comma-separated string
    return (
        <>
            {values.map((genre, idx) => {
                return (
                    <span key={idx} className="badge">
                        {genre}
                    </span>
                );
            })}
        </>
    );
};

export default App;
