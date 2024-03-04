import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const ShopBar = observer(() => {
    const {product} = useContext(Context)
    return (
        <ListGroup>
            {product.shops.map(shop =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={shop.id === product.selectedShop.id}
                    onClick={() => product.setSelectedShop(shop)}
                    key={shop.id}
                >
                    {shop.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default ShopBar;
