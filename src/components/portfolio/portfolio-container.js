import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";

export default class PortfoloiContanier extends Component {
    constructor() {
        super();

      this.state = {
          pageTitle: "Welcome to my portfolio",
          isLoading: false, 
          data: []
      };

      this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
      this.setState({
        data: this.state.data.filter(item => {
            return item.category === filter;
        })  
      })
    } 

     getPortfolioItems() {
      axios
        .get('https://carlbooth.devcamp.space/portfolio/portfolio_items')
        .then(response => {
          this.setState({
            data: response.data.portfolio_items
          })
        })
        .catch=(error => {
          console.log(error);
        });
    }

    PortfolioItems() {
        return this.state.data.map(item => {
            return <PortfolioItem key={item.id} item={item}/>;
        })
    }

    componentDidMount() {
      this.getPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
          return <div>Its loading... or is it?</div>;
        }


        return (
        <div>
            <h2>{this.state.pageTitle}</h2>

            <button onClick={() => this.handleFilter('eCommerce')}>
              eCommerce
            </button>
            <button onClick={() => this.handleFilter('scheduling')}>
              scheduling
            </button>
            <button onClick={() => this.handleFilter('Enterprise')}>
              Enterprise
            </button>

            {this.PortfolioItems()}
        </div>
        );
    }
}