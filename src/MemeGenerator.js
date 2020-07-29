import React from 'react';

export default class MemeGenerator extends React.Component {
    constructor(props){
        super(props);
        this.state={
            topText:'',
            botttomText:'',
            randomImg:"http://i.imgflip.com/1bij.jpg",
            allImages:[],
        };

        this.handleFormOnSubmit=this.handleFormOnSubmit.bind(this);
        this.handleOnChange=this.handleOnChange.bind(this);
        this.handleGenerateOnClick=this.handleGenerateOnClick.bind(this);
    }

    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(response => this.setState({allImages:response.data.memes}));
    }

    handleFormOnSubmit(){
        console.log('@handleFormonSubmit');
    }

    handleOnChange(event){
        const {name,value}= event.target;
        this.setState({[name]:value});
    }

    handleGenerateOnClick(){
        const {allImages} = this.state;
        const randomImg = allImages[allImages.length*Math.random()|0].url;
        this.setState({randomImg});
    }

    render(){
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleFormOnSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleOnChange}
                    />
                    <br/>
                    
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleOnChange}
                    />
                    <br/>
                    
                <button type="button" onClick={this.handleGenerateOnClick}>Next Image!</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImg} alt=""/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        );
    }
}
