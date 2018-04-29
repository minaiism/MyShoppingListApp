import React, {Component} from "react";
import "./App.css";
import SimpleStorage from "react-simple-storage";
import ItemEditModal from './components/Modal';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import Logo from './components/Logo/Logo';
// import ModalHistory from './components/ModalHistory/ModalHistory.js'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: "",
            list: []
        };

        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(key, value) {
        // update react state
        this.setState({[key]: value});

        // update localStorage
        localStorage.setItem(key, value);
    }

    addItem() {
        // create a new item
        const newItem = {
            id: 1 + Math.random(),
            value: this.state.newItem.slice()
        };

        // copy current list of items
        const list = [...this.state.list];

        // add the new item to the list
        list.push(newItem);

        // update state with new list, reset the new item input
        this.setState({
            list,
            newItem: ""
        });

        // update localStorage
        localStorage.setItem("list", JSON.stringify(list));
        localStorage.setItem("newItem", "");
    }

    deleteItem(id) {
        // copy current list of items
        const list = [...this.state.list];
        // filter out the item being deleted
        const updatedList = list.filter(item => item.id !== id);

        this.setState({list: updatedList});

        // update localStorage
        localStorage.setItem("list", JSON.stringify(updatedList));
    }

    incrementItem(id) {
        // copy current list of items
        const list = [...this.state.list];
        // filter out the item being deleted
        list.forEach(item => {
            if (item.id === id) {
                item.count++;
            }
        });

        this.setState({list: list});

        // update localStorage
        localStorage.setItem("list", JSON.stringify(list));

        console.log(this.state.list);
    }

    decrementItem(id) {
        // copy current list of items
        const list = [...this.state.list];
        // filter out the item being deleted
        list.forEach(item => {
            if (item.id === id) {
                item.count--;
            }
        });

        this.setState({list: list});

        // update localStorage
        localStorage.setItem("list", JSON.stringify(list));

        console.log(this.state.list);
    }


    render() {
        return (

            <div className="App">
                <Navbar inverse collapseOnSelect className="Navbar">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/"><Logo/></a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                        </Nav>
                        <Nav pullRight>
                            <NavItem eventKey={1} href="#">
                                <i class="fas fa-home"></i>
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                {/*<ModalHistory/>*/}
                                <i class="fas fa-shopping-basket"></i>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <SimpleStorage parent={this}/>
                <div className="shoppingBasket"><br/><h1>Shopping List <i class="fas fa-pencil-alt"></i></h1></div>
                <br/>
                <div className="jumbo"
                     style={{
                         padding: 50,
                         textAlign: "left",
                         maxWidth: 500,
                         margin: "auto"
                     }}
                >
                    <br/>
                    <input
                        type="text"
                        placeholder="What should I buy ...?"
                        value={this.state.newItem}
                        onChange={e => this.updateInput("newItem", e.target.value)}

                    />
                    <button className="addCard"
                            onClick={() => this.addItem()}
                            disabled={!this.state.newItem.length}>
                        <i class="fas fa-cart-plus"></i>
                    </button>
                    <br/> <br/>
                    <ul className="block">
                        {this.state.list.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.value}
                                    <button className="increment" onClick={() => this.incrementItem(item.id)}><i
                                        class="fas fa-plus"></i></button>
                                    <button className="increment" onClick={() => this.decrementItem(item.id)}><i
                                        class="fas fa-minus"></i></button>
                                    {item.count}
                                    <button className="remove" onClick={() => this.deleteItem(item.id)}>
                                        <i class="fas fa-trash"></i>
                                    </button>
                                    <button className="edit"><ItemEditModal item={item} updateItem={this.updateInput}
                                                                            incrementItem={this.incrementItem}/>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}


export default App;