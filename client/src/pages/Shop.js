import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ShopBar from "../components/ShopBar";
import ProductList from "../components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchProducts, fetchShops} from "../http/productAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {product} = useContext(Context)

    useEffect(() => {
        fetchShops().then(data => product.setShops(data))
        fetchProducts(null, null, 1, 2).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchProducts(product.selectedShop.id, product.page, 2).then(data => {
            product.setDevices(data.rows)
            product.setTotalCount(data.count)
        })
    }, [product.page, product.selectedShop])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <ShopBar/>
                </Col>
                <Col md={9}>
                    <ProductList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
