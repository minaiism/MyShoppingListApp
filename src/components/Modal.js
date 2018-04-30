import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import classes from './Modal.css';

class ItemEditModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleHide = this.handleHide.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.incrementItem = this.incrementItem.bind(this);
        this.decrementItem = this.decrementItem.bind(this);

        this.state = {
            show: false,
            name: "",
            newValue: "",
            newCount: this.props.item.count
        };
    }

    handleHide() {
        this.setState({show: false}
        );
    }

    updateItem() {
        this.props.updateItem(this.props.item.id, JSON.stringify({
            value: this.state.newValue,
            count: this.state.newCount
        }));

        this.handleHide();
    }

    updateInputValue(evt) {
        this.setState({
            newValue: evt.target.value
        });

        this.props.item.value = evt.target.value;
    }

    incrementItem() {
        if (this.state.newCount < 100) {
            this.setState({
                newCount: ++this.state.newCount
            });

            this.props.item.count = this.state.newCount;
        }
    }

    decrementItem() {
        if (this.state.newCount > 1) {
            this.setState({
                newCount: --this.state.newCount
            });

            this.props.item.count = this.state.newCount;
        }
    }

    render() {
        return (
            <div className={classes.Modal} className="editButtons" style={{height: 50}}>
                <Button className="edit"
                        bsStyle="info"
                        bsSize="small"
                        onClick={() => this.setState({show: true})}
                >
                    <i className={["fas", "fa-edit"].join(" ")}/>
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            <i className={["fas", "fa-edit"].join(" ")}/>
                            {" "}{this.props.item.value}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <button className="editForm"/>
                        <label className="inputStyle">
                            <input type="text" name="name" placeholder={this.props.item.value}
                                   value={this.state.newValue} onChange={evt => this.updateInputValue(evt)}/>
                        </label>
                        <button onClick={this.incrementItem} className="plusButton">
                            <i className={["fas", "fa-plus-square"].join(" ")}/>
                        </button>
                        {this.state.newCount}
                        <button onClick={this.decrementItem} className="minusButton">
                            <i className={["fas", "fa-minus-square"].join(" ")}/>
                        </button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.updateItem} className="saveButton">
                            <i className={["fas", "fa-save"].join(" ")}/>
                        </Button>
                        <Button onClick={this.handleHide} className="closeButton">
                            <i className={["fas", "fa-window-close"].join(" ")}/>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ItemEditModal;