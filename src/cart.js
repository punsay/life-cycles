import React, { Component } from 'react';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: '',
            itemList: [],
        };
    }

    onInputChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    addItem = e => {
        const { detail, itemList } = this.state;
        const arr = `${detail}`.replace(/'/ig, "").split("-");
        const itemName = arr[0];
        const itemPrice = arr[1];
// const total = null;
        itemList.push({
            name: itemName,
            price: itemPrice,
            quantity: 4
        });

        this.setState({
            itemList,
            detail: ''
        });
    }

    deleteItem = index => {
        const { itemList } = this.state;
        itemList.splice(index, 1);
        this.setState({ itemList });
    };

    increasequantity = index => {
        const{ itemList } = this.state;
        itemList[index].quantity++;
        this.setState({itemList});
    }

    decreasequantity = index => {
        const{ itemList } = this.state;
        itemList[index].quantity--;
        this.setState({itemList});
    }

    render() {
        const { detail, itemList } = this.state;
        let totalPrice = 0;
        const itemMarkUp = itemList.map((item, index) => {
            if(item.quantity && item.price){
                totalPrice += (item.quantity * item.price);
            }
            return (
                <li key={`item-${index}`} style={{listStyleType:"none"}}>
                    Item Name:{item.name} &nbsp; &nbsp;
                    Quantity: {item.quantity} &nbsp; &nbsp;
                    Price: {item.price} &nbsp; &nbsp;
                    Quantity: {item.price*item.quantity} &nbsp; &nbsp;
                    <input type="button" value="delete item"
                           onClick={(e) => this.deleteItem(index)} /> &nbsp; &nbsp;
                    <input type="button" value="+"
                           onClick={() => this.increasequantity(index)} /> &nbsp; &nbsp;
                    <input type="button" value="-"
                           onClick={() => this.decreasequantity(index)} /> &nbsp; &nbsp;
                </li>
            );
        });

        return (

            <div style={{border:"1px dashed green", padding:"30px", backgroundColor:"lightpink"}}>
                <header className="heading" >
                    <h3>Add Items to Your Shopping Cart</h3>
                </header>
                <main className="content-wrapper">
                    <form className="form-group">
                        <div className="form-control">
                            <input name="detail" className="text" value={detail} type="text" onChange={(e) => this.onInputChange(e)} />&nbsp;&nbsp;
                            <input type="button" className="button" value="Add Item" onClick={(e) => this.addItem(e)} disabled={!detail} /><br/>
                            <label>(For example : papaya-50)</label>
                        </div>
                        <ul className="row">
                            {itemMarkUp}
                        </ul>
                    </form>
                </main>
                <footer className="totalprice">
                    Total:{totalPrice}
                </footer>
            </div>

        );
    }
}





