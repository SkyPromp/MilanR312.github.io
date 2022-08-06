import './Header.css';
import test from './data.json'

function header() {
    var items = Object.keys(test).map((key, index) => {
        return (
        <li className="TopLinks" key={index}> 
            <a href={test[key]}> {key}</a>
        </li>
        )
    })
    return (
        <div className="Header">
            <ul>
                {items}
            </ul>
        </div>
    );
}

export default header;
