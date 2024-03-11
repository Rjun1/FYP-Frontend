import bokChoy from "../imgs/bokChoy.png";
import choySum from "../imgs/choySum.jpeg";
import kaiLan from "../imgs/kaiLan.jpg";
// import mizuna from "../imgs/mizuna.jpg";
// import basil from "../imgs/basil.jpg";
import mizuna from "../imgs/mizuna-microgreen.jpg";
import basil from "../imgs/basil-microgreen.jpg";

import {
    UilTimes,
    UilHeart,
    UilMedicalSquare,
    UilHeartBreak,
  } from "@iconscout/react-unicons";



export function formatDate(date) {
    const dateObj = new Date(date);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedPlanted = `${dateObj.getDate()} ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
    return formattedPlanted;
}

export function getStyle(status) {
    const styles = {
        'Healthy': {
            'color': { color: '#559f89'},
            'backgroundColor': '#FFF',
            'icon': <UilHeart/>
        },
        'Attention': {
            'color': { color: '#FFF'},
            'backgroundColor': '#ffc9b4',
            'icon': <UilMedicalSquare/>
        },
        'Critical': {
            'color': { color: '#FFF'},
            'backgroundColor': '#ff6d71',
            'icon': <UilHeartBreak/>
        },
    }
    return styles[status];
}

export function getTopRowStyle(status) {
    const styles = {
        'Healthy': {
            'color': { color: '#065c4a'},
            'backgroundColor': 'linear-gradient(to bottom right, #83ceb7, #defff4)',
            'icon': <UilHeart/>
        },
        'Attention': {
            'color': { color: '#ff747b'},
            'backgroundColor': 'linear-gradient(to bottom right, #ffc9b4, #faeae4)',
            'icon': <UilMedicalSquare/>
        },
        'Critical': {
            'color': { color: '#FFF'},
            'backgroundColor': 'linear-gradient(to bottom right, #ff6d71, #f8bdbf)',
            'icon': <UilHeartBreak/>
        },
    }
    return styles[status];
}

function getStatusIndex(status) {
    switch (status) {
        case 'Healthy':
            return 0;
        case 'Attention':
            return 1;
        case 'Critical':
            return 2;
        default:
            return {};
    }
}
  
export function getPic(PlantName) {
    switch (PlantName) {
        case 'Bok Choy':
            return bokChoy;
        case 'Choy Sum':
            return choySum;
        case 'Kai Lan':
            return kaiLan;
        case 'Mizuna':
            return mizuna;
        case 'Basil':
            return basil;
        default:
            return {};
    }
}