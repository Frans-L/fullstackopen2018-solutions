import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ event, name }) => (
    <button onClick={event}>{name}</button>
)

const Text = ({ txt }) => (
    <div>{txt}</div>
)

const Anecdote = ({ anecdote, score }) => (
    <div>
        <Text txt={anecdote} />
        <br></br>
        <Text txt={'This one has ' + score + ' votes.'} />
    </div>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: Math.floor(Math.random() * anecdotes.length),
            score: new Array(anecdotes.length).fill(0)
        }
    }

    randomState = () => {
        const i = Math.floor(Math.random() * anecdotes.length);
        this.setState({ selected: i });
    }

    vote = () => {
        const s = [...this.state.score];
        s[this.state.selected]++;
        this.setState({ score: s })
    }

    bestAnecdote = () => (this.state.score.indexOf(Math.max(...this.state.score)))

    render() {
        return (
            <div>
                <Anecdote
                    anecdote={this.props.anecdotes[this.state.selected]}
                    score={this.state.score[this.state.selected]} />
                <div>
                    <Button event={this.vote} name='Vote' />
                    <Button event={this.randomState} name='Next anecdote' />
                </div>
                <div>
                    <h2> Anecdote with most votes: </h2>
                    <Anecdote
                        anecdote={this.props.anecdotes[this.bestAnecdote()]}
                        score={this.state.score[this.bestAnecdote()]} />
                </div>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)