import './ProductCard.css';
import type { ProductCardProps } from '../../../types/etsy'; 

const formatPrice = (currencyCode: string | undefined, price: string | number | undefined): string => {
  const priceNum = typeof price === 'number' ? price : parseFloat(price || '0');
  const formatted = priceNum.toFixed(2);
  const symbols: Record<string, string> = { USD: '$', EUR: '€', GBP: '£' };
  
  if (currencyCode && symbols[currencyCode]) {
    return `${symbols[currencyCode]}${formatted}`;
  }
  return `${currencyCode || 'USD'} ${formatted}`;
};

const getStockClass = (quantity: string | number | undefined): string => {
  const qty = typeof quantity === 'number' ? quantity : parseInt(quantity || '0', 10);
  
  if (qty <= 10) return 'stock-low';
  if (qty <= 20) return 'stock-medium';
  return 'stock-high';
};

const truncateTitle = (title: string | undefined, maxLength: number = 50): string => {
  if (!title || typeof title !== 'string') return 'No title';
  return title.length <= maxLength ? title : `${title.slice(0, maxLength)}…`;
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => { 
  const {
    listing_id,
    url = '#',
    MainImage = {},
    title,
    currency_code,
    price,
    quantity
  } = item;

  if (!listing_id) return null;

  const imageUrl = MainImage?.url_570xN || '';
  const altText = truncateTitle(title);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    event.currentTarget.src = 'https://via.placeholder.com/570x570?text=No+Image';
  };

  return (
    <div className="product-card" key={listing_id.toString()}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img 
          src={imageUrl} 
          alt={altText} 
          className="product-image"
          loading="lazy"
          onError={handleImageError}
        />
      </a>
      <div className="product-info">
        <h3 className="product-title" title={title}>
          {altText}
        </h3>
        <div className="price-container">
          <div className="product-price">
            {formatPrice(currency_code, price)}
          </div>
          <span className={`stock-badge ${getStockClass(quantity)}`}>
            {typeof quantity === 'number' ? quantity : parseInt(quantity || '0', 10)} left
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;