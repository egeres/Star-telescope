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

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

// https://blog.logrocket.com/complete-guide-building-smart-data-table-react/
// https://github.com/learnwithparam/logrocket-smart-table

import { useState, useEffect } from "react";

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
            list_of_starred: [],
            starred_count  : 0,
            user_profilepic: "",
        };
    }

    render() {
        return (

            <div style={{ backgroundColor:"black", height:"100%" }}>

			<Header user="egeres"></Header>

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
				<Route path="/about">
					{/* <About /> */}
					<div>asdasaaaaaadasd</div>
				</Route>
				<Route path="/users">
					{/* <Users /> */}
					<div>asdasdasd</div>
                <TableContainer columns={this.columns} data={this.data} />
				</Route>
				<Route path="/">
					{/* <Home /> */}
					<div>dddddddd</div>
				</Route>
				</Switch>

			</Router>

            </div>
        );
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
        // eva.replace()

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
            this.setState({ starred_count: 100 });
			// this.setState({ user_profilepic: "https://img.microsiervos.com/images2021/ParacaidasPercyMicrosiervos.jpg"})
			this.setState({ user_profilepic: "https://avatars.githubusercontent.com/u/241138?v=4"})

			
        }, 200);

        stars("egeres").then(console.log);

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
