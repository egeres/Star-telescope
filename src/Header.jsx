
import React, { Component } from "react";
import axios from "axios";
import Animated_bar from "./Animated_hr.jsx";

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render()
    {
        return (<div
        style={{
            width         : "100%",
            display       : "flex",
            // flexGrow      : 1,
            justifyContent: "center",
            // flexDirection : "row",
        }}>
        {/* <div style={{backgroundColor:"black", width:"calc(50% - 100px - 10px)"}}><Animated_bar/></div> */}

            <div
                style={{
                    // backgroundColor: "black",
                    width: "calc(50% - 100px)",
                    // display        : "table",
                    // verticalAlign  : "middle",
                    // textAlign      : "center",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    alignItems: "center",
                    // alignContent  : "flex-start",
                    // alignContent:"center"

                    // display:flex;
                    // flexDirection: "row",
                    // justify-content: center;
                }}
            >
                <Animated_bar align="R" />
                {/* <div style={{width:"20px", height:"20px", backgroundColor:"blue"}}></div> */}
            </div>

            {/* <div style={{}}> <Animated_bar/> asd </div> */}
            <div
                style={{
                    width          : "200px",
                    height         : "200px",
                    // backgroundColor: "red"  ,
                }}
            >
                <img src={this.state.user_profilepic} style={{width:"100%", borderRadius:"50%"}} />
            </div>


            <div
                style={{
                    // backgroundColor: "black",
                    width: "calc(50% - 100px)",
                    // display        : "table",
                    // verticalAlign  : "middle",
                    // textAlign      : "center",

                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    alignItems: "center",
                    // alignContent  : "flex-start",
                    // alignContent:"center"

                    // display:flex;
                    // flex-direction: column;
                    // justify-content: center;
                }}
            >
            <Animated_bar align="L"/>
            {/* <div style={{width:"20px", height:"20px", backgroundColor:"blue"}}></div> */}
            </div>

        </div>)
    }

    componentDidMount()
    {

        const user_profileinfo = (user) =>
            axios
            .get(`https://api.github.com/users/${user}`)
            .then((res) => res.data);

        // user_prof("egeres").then(console.log);
        // user_prof("egeres").then((res) => {console.log("asdadsads");console.log(res);console.log(res.avatar_url)});


        user_profileinfo(this.props.user).then(
            (res) => {
                // console.log("asdadsads");
                // console.log(res);
                // console.log(res.avatar_url)
                this.setState({ user_profilepic: res.avatar_url})
            }
        );


    }
}