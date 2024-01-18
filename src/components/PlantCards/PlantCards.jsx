import React, { useState, useEffect } from 'react'
import PlantCard from '../PlantCard/PlantCard'
import './PlantCards.css'

const Cards = () => {
    const [cards, setCards] = useState([])

    const fetchData = () => {
        fetch('http://localhost:4000/PlantData')
            .then(res => res.json())
            .then(data => {setCards(data);})
            .catch(e => console.log(e.message));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className = "Cards">
            {
                cards && cards.length > 0 &&
                cards.map(card => <PlantCard key={card._id} card={card} />)
            }
        </div>
    )
}

export default Cards