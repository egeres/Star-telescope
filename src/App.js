import logo from "./logo.svg";
import "./App.css";

import React, { Component } from "react";
import axios from "axios";

import anime from "animejs/lib/anime.es.js";
import * as eva from "eva-icons";

// import TableContainer from "./TableContainer"
// https://thewidlarzgroup.com/react-table-7/
// https://github.com/TheWidlarzGroup/RT7-example/blob/102c5bbfddf9e01e556b84e81de51ef2cef3ba5e/src/App.js

// import Table from "./Table_mine";
import TableContainer from "./Table_mine";
import Animated_bar from "./Animated_hr.jsx";
import Header from "./Header.jsx";
import Display_simple_graph from "./Display_simple_graph.jsx";

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

// const FunctionalComponent = () => {
//     useEffect(() => {
//         console.log("aaaaasd");
//         anime({
//             targets: this,
//             translateX: 250,
//             rotate: '1turn',
//             backgroundColor: '#FFF',
//             duration: 800
//           });
//     }, []);
//     return <h1>Hello, world</h1>;
// };



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_of_starred        : [],
            // starred_count          : 0,
            // user_profilepic        : "",
            // list_of_counts_per_star: [],
        };
    }

    render() {
        return (

            <div style={{ backgroundColor:"black", height:"100%" }}>

			{/* <Header user="egeres"></Header> */}

			<Router>
				
            {/* {this.state.starred_count} */}

            <nav>
                <ul>
                    <li>
                    <Link to="/">Home</Link>
                    </li>
                    <li>
                    <Link to="/about">About</Link>
                    </li>
                    <li>
                    <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>

            <Switch>
            <Route path="/">
                {/* <Home /> */}
                <div>HOmeee</div>
                {/* <Display_simple_graph data={[ {x:0, y:0}, {x:10, y:20}, {x:40, y:90}, {x:80, y:50}, {x:100, y:100} ]} /> */}
                <Display_simple_graph 
                    data   = {this.extract_star_count(this.state.list_of_starred)}
                    // data   = {this.extract_star_count([])}
                    width  = {900}
                    height = {300}
                    margin = {20 }
                />
                {/* <Display_simple_graph data={this.state.list_of_counts_per_star} /> */}
            </Route>
            <Route path="/about">
                {/* <About /> */}
                <div>asdasaaaaaadasd</div>
            </Route>
            <Route path="/users">
                {/* <Users /> */}
                <div>asdasdasd</div>
            <TableContainer columns={this.columns} data={this.data} />
            </Route>
            </Switch>

			</Router>

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

    componentWillMount() {
        this.columns = [
            {
                // // first group - TV Show
                // Header: "TV Show",
                // // First group columns
                // columns: [
                //     {
                //     Header: "Name",
                //     accessor: "show.name"
                //     },
                //     {
                //     Header: "Type",
                //     accessor: "show.type"
                //     }
                // ]
                // },
                // {
                // // Second group - Details
                Header: "Details",
                // Second group columns
                columns: [
                    {
                        Header: "Name",
                        accessor: "show.name",
                    },
                    {
                        Header: "Language",
                        accessor: "show.language",
                    },
                    {
                        Header: "Genre(s)",
                        accessor: "show.genres",
                        Cell: ({ cell: { value } }) => (
                            <Genres values={value} />
                        ),
                    },
                    {
                        Header: "Runtime",
                        accessor: "show.runtime",
                    },
                    {
                        Header: "Status",
                        accessor: "show.status",
                    },
                ],
            },
        ];
        // []
        // );

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

    componentDidMount() {

        eva.replace()

        // const got = require('got');

        // const stars = (user) =>
        //   got(`https://api.github.com/users/${user}/starred`)
        //   .then((res) => JSON.parse(res.body))
        //   .then((starred) => starred.map((s) => ({
        //       owner      : s.owner.login,
        //       repo       : s.name,
        //       description: s.description,
        //       language   : s.language,
        //       isFork     : false,
        //       stargazers : s.stargazers_count,
        //       watchers   : s.watchers_count,
        //   })))

        // setInterval(() => {
        //     console.log("Appending...")
        //     this.setState({ list_of_counts_per_star: [...this.state.list_of_counts_per_star, {x:Math.floor(Math.random() * 100) ,y:Math.floor(Math.random() * 100)}] })
        // }, 1000)

        const stars = (user) =>
            axios
                .get(
                    `https://api.github.com/users/${user}/starred?per_page=100&page=1`

					
                )
                .then((res) => res);
        // .then((res) => JSON.parse(res.body))
        // .then((starred) => starred.map((s) => ({
        //     owner      : s.owner.login,
        //     repo       : s.name,
        //     description: s.description,
        //     language   : s.language,
        //     isFork     : false,
        //     stargazers : s.stargazers_count,
        //     watchers   : s.watchers_count,
        // })))

        setTimeout(() => {
            // this.setState({ starred_count: 100 });
			// this.setState({ user_profilepic: "https://avatars.githubusercontent.com/u/241138?v=4"})
            this.setState({
                list_of_starred: [
                    {
                        "id"              : 251352980,
                        "name"            : "JasonMaToonRenderPipeline",
                        "html_url"        : "https://github.com/Jason-Ma-233/JasonMaToonRenderPipeline",
                        "stargazers_count": 459,
                        "language"        : "C#",
                        "created_at"      : "2020-03-30T15:48:44Z"
                    },
                    {
                        "id"              : 325873493,
                        "name"            : "videos",
                        "html_url"        : "https://github.com/3b1b/videos",
                        "stargazers_count": 385,
                        "language"        : "Python",
                        "created_at"      : "2020-12-31T21:07:33Z"
                    },
                    {
                        "id"              : 103749180,
                        "name"            : "cosmos",
                        "html_url"        : "https://github.com/OpenGenus/cosmos",
                        "stargazers_count": 12517,
                        "language"        : "C++",
                        "created_at"      : "2017-09-16T12:07:05Z"
                    },
                    {
                        "id"              : 164554832,
                        "name"            : "handson-ml2",
                        "html_url"        : "https://github.com/ageron/handson-ml2",
                        "stargazers_count": 13449,
                        "language"        : "Jupyter Notebook",
                        "created_at"      : "2019-01-08T03:49:07Z"
                    },
                    {
                        "id"              : 136265021,
                        "name"            : "albumentations",
                        "html_url"        : "https://github.com/albumentations-team/albumentations",
                        "stargazers_count": 7381,
                        "language"        : "Python",
                        "created_at"      : "2018-06-06T03:10:50Z"
                    },
                ]
            })
        }, 2000);

        // stars("egeres").then(console.log);

        const get_repos  = (user, page=0) => axios
            .get(`https://api.github.com/users/${user}/starred?per_page=100&page=${page+1}`)
            .then(res => res.data)
            .then(res => res.map(x => {
                    return {
                        id              : x.id,
                        name            : x.name,
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