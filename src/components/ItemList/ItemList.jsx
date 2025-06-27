import './styles.css';

export const ItemList = ({ title, link, description }) => {
    return (
        <div className='item-list'>
            <h4>{title}</h4>
            <a href={link} target="_blank" rel="noopener noreferrer">Ver Repositório</a>
            <p>{description}</p>
            <hr />
        </div>
    )
}

