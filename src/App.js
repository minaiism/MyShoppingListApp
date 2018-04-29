import React, {Component} from "react";
import "./App.css";
import SimpleStorage from "react-simple-storage";
import ItemEditModal from './components/Modal';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import Logo from './components/Logo/Logo';
import ModalHistory from './components/ModalHistory/ModalHistory.js'
import Autocomplete from "./components/Autocomplete/Autocomplete";
import "./components/Autocomplete/Autocomplete.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItem: "",
            list: [],
            history: []
        };

        this.updateInput = this.updateInput.bind(this);
        this.checkout = this.checkout.bind(this);
    }

    checkout() {
        // copy current list of items
        this.state.history.push({
            list: [...this.state.list],
            time: Date.now()
        });

        this.setState({list: []});

        // update localStorage
        localStorage.setItem("list", JSON.stringify([]));
        localStorage.setItem("history", JSON.stringify(this.state.history));
    }

    updateInput(key, item) {
        // update react state
        this.setState({[key]: item});

        // update localStorage
        localStorage.setItem(key, item);
    }

    addItem() {
        const newValue = this.state.newItem.slice();

        // copy current list of items
        const list = [...this.state.list];
        let exists = false;

        list.forEach(item => {
            if (item.value === newValue) {
                item.count++;
                exists = true;
            }
        });

        // create a new item
        const newItem = {
            id: 1 + Math.random(),
            value: newValue,
            count: 1
        };

        if (!exists) {
            // add the new item to the list
            list.push(newItem);
        }

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
                                <i className={["fas", " fa-home"].join(" ")}/>
                            </NavItem>
                            <NavItem eventKey={2} href="#">
                                <ModalHistory history={this.state.history}/>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <SimpleStorage parent={this}/>
                <div className="shoppingBasket"><br/><h1>Shopping List <i
                    className={["fas", " fa-pencil-alt"].join(" ")}/></h1></div>
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
                    <div>
                        <Autocomplete className="Autocomplete" value={this.state.newItem}
                                      placeholder="What should I buy ...?"
                                      onChange={this.updateInput}
                                      onKeyUp={event => {
                                          event.key === "Enter" && this.addItem();
                                      }}
                        />
                        <div className="AddToCartContainer">
                            <button className="AddToCart"
                                    onClick={() => this.addItem()}
                                    disabled={!this.state.newItem.length}>
                                <i className={["fas", "fa-cart-plus"].join(" ")}/>
                            </button>
                        </div>
                    </div>
                    <br/> <br/>
                    <ul className="block">
                        {this.state.list.map(item => {
                            return (
                                <li key={item.id}>
                                    {item.value}
                                    <button className="increment" onClick={() => {
                                        if (item.count < 100) {
                                            this.incrementItem(item.id)
                                        }
                                    }}>
                                        <i className={["fas", "fa-plus"].join(" ")}/>
                                    </button>
                                    {item.count}
                                    <button className="increment" onClick={() => {
                                        if (item.count > 1) {
                                            this.decrementItem(item.id)
                                        }
                                    }}>
                                        <i className={["fas", "fa-minus"].join(" ")}/>
                                    </button>
                                    <button className="remove" onClick={() => this.deleteItem(item.id)}>
                                        <i className={["fas", "fa-trash"].join(" ")}/>
                                    </button>
                                    <button className="edit">
                                        <ItemEditModal item={item} updateItem={this.updateInput}
                                                       incrementItem={this.incrementItem}
                                                       decrementItem={this.decrementItem}/>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <button className="Checkout"
                            onClick={this.checkout}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        );
    }
}

export default App;