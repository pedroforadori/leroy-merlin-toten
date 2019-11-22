import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './carousel.css';

import urlImg from "../../img/lixeira-para-banheiro-branca.png";
import { TextImage, Image, Box } from './style';

// list of items
const list = [
    { img: urlImg, desc: 'Persianas' },
    { img: urlImg, desc: 'Cortinas e Acessórios' },
    { img: urlImg, desc: 'Varão, Trilho e Acessórios' },
    { img: urlImg, desc: 'Persianas' },
    { img: urlImg, desc: 'Cortinas e Acessórios' },
    { img: urlImg, desc: 'Varão, Trilho e Acessórios' },
    { img: urlImg, desc: 'Persianas' },
    { img: urlImg, desc: 'Cortinas e Acessórios' },
    { img: urlImg, desc: 'Varão, Trilho e Acessórios' }

];

// One item component
// selected prop will be passed
const MenuItem = ({ imgUrl, selected, text }) => {
    return <Box className={`menu-item  ${selected ? 'active' : ''}`}>
        <Image src={imgUrl} />
        <TextImage>{text}</TextImage>
    </Box>;
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>

    list.map((el, i) => {
        const { img, desc } = el;

        return <MenuItem imgUrl={img} key={i} selected={selected} text={desc} />;
    });


const Arrow = ({ text, className }) => {
    return (
        <div
            className={className}
        >{text}</div>
    );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = '';

class CategoryCarousel extends Component {
    constructor(props) {
        super(props);
        // call it again if items count changes
        this.menuItems = Menu(list, selected);
    }

    state = {
        selected
    };

    onSelect = key => {
        this.setState({ selected: key });
    }


    render() {
        const { selected } = this.state;
        // Create menu from items
        const menu = this.menuItems;

        return (
            <div className="App">
                <ScrollMenu
                    data={menu}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    selected={selected}
                    onSelect={this.onSelect}
                />
            </div>
        );
    }
}

export default CategoryCarousel;