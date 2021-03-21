
import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class Popup extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render()
    {
        return (<div
        style={{
            position: "absolute",
            width   : "100%",
            height  : "100%",
            // padding        : "10px",
            backgroundColor: "rgba(0,0,0,0.5",
            // left           : 200,
            // top            : 200,
            // opacity        : 0,
            // width         : "100%",
            // display       : "flex",
            // flexGrow      : 1,
            // justifyContent: "center",
            // flexDirection : "row",
            zIndex:100,
        }}>
            <div
            style={{
                backgroundColor: "#e62424",
                position       : "relative",
                width          : "400px",
                // height         : "300px",
                marginLeft     : "auto",
                marginRight    : "auto",
                left           : 0,
                right          : 0,
                top            : "200px",
                padding        : "30px",
                borderRadius   : "20px",
            }}
                // backgroundColor:""
            >
                <div 
                    style={{
                        backgroundColor     : "#fff",
                        color               : "#e62424",
                        width               : "23px",
                        height              : "23px",
                        textAlign           : "center",
                        borderRadius        : "50%",
                        position            : "absolute",
                        right               : "10px",
                        top                 : "10px",
                    }}
                    onClick={() => {this.props.function_close()}}
                    className="noselect"
                >
                    X
                </div>
                {/* <h2 style={{marginTop:0}}>Error 403 ✋🏻</h2> */}
                <h2 style={{marginTop:0}}>{this.props.title}</h2>

                <hr></hr>
                {/* <p>
                    Okay, this is a weird one. Turns out, this is a front-end only website, meaning, it directly calls Github's API without any kind of token. The problem with this is that such API has a limited amount of 60 requests per hour by IP address. You can consult how many of such tokens you have left at <a>https://api.github.com/rate_limit</a>.
                </p>
                <p>TLDR: You gotta wait an hour 😢</p> */}
                {/* {this.props.description.map(x => <p>{x}</p>)} */}

                {/* {if (True) {<p>asdasd</p>}} ❌ */}
                {/* {false ? <p>asdasd</p> : <p>asd000asd</p> } ✅ */}
                {
                    Array.isArray(this.props.description) ? this.props.description.map(x => <p>{x}</p>) : <p>{this.props.description}</p>
                }
            </div>
            {/* asdadsadsads */}
        </div>)
    }

    componentDidMount()
    {

    }
}

Popup.propTypes = {
    // content_text     : PropTypes.string,
    title         : PropTypes.string,
    description   : PropTypes.array,
    function_close: PropTypes.func,
};

Popup.defaultProps = {
    title         : "Default",
    description   : ["Default", "default"],
    function_close: () => {},
};