
import React, { Component } from "react";
import axios from "axios";
import Animated_bar from "./Animated_hr.jsx";
import CountUp from 'react-countup';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_counter_value:0
        }
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
                    display:"flex",
                    // alignContent:"center",
                    // justifyContent:"center",
                    alignItems:"center",
                    // position:"relative",
                }}
            >
                <div style={{backgroundColor:"#000", width:"200px", height:"200px", borderRadius:"50%", position:"absolute"}}></div>
                {/* <div style={{backgroundColor:"red",  width:"200px", height:"200px", borderRadius:"50%", position:"absolute"}}></div> */}
                <img src={this.state.user_profilepic} style={{width:"200px", position:"absolute", borderRadius:"50%"}} />
                <div style={{
                    position   : "absolute",
                    fontSize   : "50px",
                    textAlign  : "center",
                    marginLeft : "auto",
                    marginRight: "auto",
                    left       : 0,
                    right      : 0,
                    color      : "#e62424",
                }}>
                    {/* 999999 */}
                    {/* {this.props.star_count} */}
                    <CountUp end={this.props.star_count} />
                </div>
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
        if (this.props.user !== "")
        {
            const user_profileinfo = (user) => axios
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

    componentDidUpdate()
    {
        if (this.props.user !== "")
        {

        
        // console.log("...")
        const user_profileinfo = (user) => axios
        .get(`https://api.github.com/users/${user}`)
        .then((res) => res.data);

    //     // user_prof("egeres").then(console.log);
    //     // user_prof("egeres").then((res) => {console.log("asdadsads");console.log(res);console.log(res.avatar_url)});

        // if (res.avatar_url !== this.state.user_profilepic)
        // {
            
        user_profileinfo(this.props.user).then(
            (res) => {
                // console.log("asdadsads");
    //             // console.log(res);
    //             // console.log(res.avatar_url)

                if (res.avatar_url !== this.state.user_profilepic)
                {
                    this.setState({ user_profilepic: res.avatar_url})
                }
            }
        );
        // }

        // for (let i = 0; i < 100; i++) {
        //     // const element = array[i];
            
        // }


        }
    }
}