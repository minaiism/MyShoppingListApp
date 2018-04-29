import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import classes from './Modal.css';

class ItemEditModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleHide = this.handleHide.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.incrementItem = this.incrementItem.bind(this);

        this.state = {
            show: false,
            name: "",
            newValue: ""
        };
    }

    handleHide() {
        this.setState({show: false}
        );
    }

    updateItem() {
        this.props.updateItem(this.props.item.id, this.state.newValue);
        this.handleHide();
    }

    updateInputValue(evt) {
        this.setState({
            newValue: evt.target.value
        });

        this.props.item.value = evt.target.value;
    }

incrementItem(){
    this.props.incrementItem(this.props.item.id);
}

decrementItem(){

}

    render() {
        return (
            <div className={classes.Modal} style={{height: 100}}>
                <Button className="edit"
                    bsStyle="info"
                    bsSize="small"
                    onClick={() => this.setState({show: true})}
                >
                    <i class="fas fa-edit"></i>
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            <i class="fas fa-edit"></i>{" "}{this.props.item.value}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <button className="editForm"></button>
                        <form>
                            <label>
                                <input type="text" name="name" placeholder={this.props.item.value} value={this.state.newValue} onChange={evt => this.updateInputValue(evt)}/>
                            </label>
                            <button onClick={this.incrementItem} className="plusButton"><i class="fas fa-plus-square"></i></button>
                            <button className="minusButton"><i class="fas fa-minus-square"></i></button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.updateItem} className="saveButton"><i class="fas fa-save"></i></Button>
                        <Button onClick={this.handleHide} className="closeButton"><i class="fas fa-window-close"></i></Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ItemEditModal;