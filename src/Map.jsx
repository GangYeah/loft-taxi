import './map.css'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import 'mapbox-gl/dist/mapbox-gl.css';

import React from 'react';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { requestAddressList, selectAddressList } from "./modules/addressList";
import { requestCard, selectCardDetails, selectCardDetailsError, selectIsCardDetailsIsFill } from "./modules/payment";
import { requestRoute, selectRoute, routeInit, selectRouteError } from "./modules/route";
import { selectAuthToken } from './modules/authorization';

class Map extends React.Component {
    state = { adresses: { address1: "", address2: "" }, isOrdered: false };

    drawRoute = () => {
        const coordinates = this.props.route;
        this.map.flyTo({
            center: coordinates[0],
            zoom: 15
        });
        this.map.addLayer({
            id: "route",
            type: "line",
            source: {
                type: "geojson",
                data: {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates
                    }
                }
            },
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": "#ffc617",
                "line-width": 8
            }
        });
    }

    componentDidMount() {
        this.props.requestCard(this.props.authToken);
        this.props.requestAddressList();
        mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FuZ3llYWgiLCJhIjoiY2t1c2MzbmJpMGRnMDJubWZ0NzhuM2t2YSJ9.HO4P6pztHjVahUFt2pnNWg';
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [30.2, 59.95],
            zoom: 10
        });
    }
    componentDidUpdate() {
        if (this.props.route.length && this.map && !this.props.routeError) {
            this.drawRoute();
        }
    }
    componentWillUnmount() {
        this.map.remove();
        this.props.routeInit();
    }

    handleChange(field, value) {
        if (value) {
            this.setState({ adresses: { ...this.state.adresses, [field]: value } });
        }
        else {
            this.setState({ adresses: { ...this.state.adresses, [field]: "" } });
        }
    };

    handleSubmit(event) {
        event.preventDefault();
        const { address1, address2 } = this.state.adresses;
        this.props.requestRoute(address1, address2);
        this.setState({ isOrdered: true });
    }

    handleSubmitAfterOrdering(event) {
        event.preventDefault();
        this.props.routeInit();
        this.map.removeLayer('route');
        this.map.removeSource('route')
        this.map.flyTo({
            center: [30.2, 59.95],
            zoom: 10
        });
        this.setState({ adresses: { address1: "", address2: "" }, isOrdered: false });
    }

    isValid() {
        return Object.values(this.state.adresses).filter(item => item === "").length !== 0;
    }

    render() {
        const style = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%'
        };
        let arr1 = this.props.addressList, arr2 = this.props.addressList, value;
        if ((value = this.state.adresses.address1) !== "") {
            arr2 = arr2.filter(item => item !== value)
        }
        if ((value = this.state.adresses.address2) !== "") {
            arr1 = arr1.filter(item => item !== value)
        }
        return (
            <>
                <div data-testid="map" style={style} ref={el => this.mapContainer = el} />
                {
                    this.props.isCardDetailsIsFill ? (
                        this.state.isOrdered ? (
                            <form style={{ textAlign: 'left' }} onSubmit={this.handleSubmitAfterOrdering.bind(this)} className="form map__form">
                                <h2 style={{ textAlign: 'left', marginBottom: '0' }}>Заказ размещен</h2>
                                <p style={{ margin: '15px 0', }}>Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.</p>
                                <Button style={{ marginBottom: '0 !important' }} variant="contained" type="submit">Сделать новый заказ</Button>
                            </form>
                        ) : (
                            <form onSubmit={this.handleSubmit.bind(this)} className="form map__form">
                                <div className="error">{this.props.cardDetailsError}</div>
                                <Autocomplete
                                    className="map__input"
                                    disablePortal
                                    onChange={(event, value) => { this.handleChange("address1", value) }}
                                    options={arr1}
                                    renderInput={(params) => <TextField {...params} label="Откуда" />}
                                />
                                <Autocomplete
                                    className="map__input"
                                    disablePortal
                                    onChange={(event, value) => { this.handleChange("address2", value) }}
                                    options={arr2}
                                    renderInput={(params) => <TextField {...params} label="Куда" />}
                                />
                                <Button variant="contained" className="form__button" disabled={this.isValid()} type="submit">Заказать</Button>
                            </form>
                        )

                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); this.props.history.push('/profile') }} className="form map__form">
                            <p style={{ margin: '15px 0' }}>Ваши платежные данные не заполнены</p>
                            <Button variant="contained" type="submit">Перейти в профиль</Button>
                        </form>
                    )
                }
            </>
        );
    }
}

Map.propTypes = {
    isCardDetailsIsFill: PropTypes.bool,
    cardDetails: PropTypes.object,
    cardDetailsError: PropTypes.string,
    addressList: PropTypes.array,
    authToken: PropTypes.string,
    routeError: PropTypes.string,
    route: PropTypes.array,
    requestAddressList: PropTypes.func,
    requestCard: PropTypes.func, 
    requestRoute: PropTypes.func, 
    routeInit: PropTypes.func,
}

export default connect(
    (state) => ({
        isCardDetailsIsFill: selectIsCardDetailsIsFill(state),
        cardDetails: selectCardDetails(state),
        cardDetailsError: selectCardDetailsError(state),
        addressList: selectAddressList(state),
        authToken: selectAuthToken(state),
        routeError: selectRouteError(state),
        route: selectRoute(state)
    }),
    { requestAddressList, requestCard, requestRoute, routeInit }
)(Map);