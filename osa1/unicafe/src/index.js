import React from 'react';
import ReactDOM from 'react-dom';

const Head = ({ txt }) => (
    <h2>{txt}</h2>
)

const Button = ({ event, name }) => (
    <button onClick={event}>{name}</button>
)

const Buttons = ({ feedback, addEvent }) => (
    feedback.map(f => <Button key={f.name} event={addEvent(f.name)} name={f.name} />)
)

const Statistic = ({ name, value }) => (
    <tr>
        <td>{name}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({ feedback }) => {

    let result = [];
    let votes = feedback.reduce((t, f) => t + f.counter, 0);

    if (votes > 0) {
        let avg = (feedback.reduce((t, f) => t + f.value * f.counter, 0.0) / votes).toFixed(2);
        let positive = (feedback.filter(f => f.value > 0).reduce(
            (t, f) => t + f.counter, 0) / votes * 100).toFixed(1);

        result.push(feedback.map(f => <Statistic key={f.name} name={f.name} value={f.counter} />));
        result.push(<Statistic key='Keskiarvo' name='Keskiarvo' value={avg} />);
        result.push(<Statistic key='Positiivisia' name='Positiivisia' value={positive + '%'} />);
    } else {
        result.push(<Statistic key='Error' name='Ei yhtään palautetta annettu.' value='' />);
    }

    return (
        <table>
            <tbody>
                {result}
            </tbody>
        </table>
    )
}

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            feedback: [
                {
                    name: 'Hyvä',
                    counter: 0,
                    value: 1
                },
                {
                    name: 'Neutraali',
                    counter: 0,
                    value: 0
                },
                {
                    name: 'Huono',
                    counter: 0,
                    value: -1
                }
            ]
        }
    }

    add = (name) => () => {
        let newFeedback = this.state.feedback.map(f => (
            f.name === name ? { ...f, counter: f.counter + 1 } : f
        ))
        this.setState({ feedback: newFeedback })
    }

    render = () => (
        <div>
            <Head txt="Anna palautetta" />
            <Buttons feedback={this.state.feedback} addEvent={this.add} />
            <Head txt="Statistiikka" />
            <Statistics feedback={this.state.feedback} />
        </div>
    )

}


ReactDOM.render(<App />, document.getElementById('root'));