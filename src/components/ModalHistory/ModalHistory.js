import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import classes from './ModalHistory.css';

class ModelHistory extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleHide = this.handleHide.bind(this);

        this.state = {
            show: false
        };

    }

    handleHide() {
        this.setState({show: false}
        );
    }

    render() {
        return (
            <div className={[classes.modal, "shopping-basket"].join(' ')} style={{height: 100}}>
                <Button className="edit2"
                        bsStyle="info"
                        bsSize="small"
                        onClick={() => this.setState({show: true})}
                >
                    <i className={["fas", "fa-shopping-basket"].join(" ")}/>
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Checkout history
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <button className="editForm"/>
                        <ul className="block">
                            {
                                this.props.history.map(checkout => {
                                    return (
                                        <li key={checkout.time}>
                                            <div>
                                                {(new Date(checkout.time)).toLocaleDateString()}
                                            </div>
                                            <div>
                                                {checkout.list.map(element => {
                                                    return (
                                                        <div>
                                                            {element.value + ": " + element.count}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleHide} className="closeButton">
                            <i className={["fas", "fa-window-close"].join(" ")}/>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ModelHistory;