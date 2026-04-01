import './Listing.css';
import ProductCard from './ProductCard/ProductCard';
import type { ListingProps, EtsyItem } from '../../types/etsy'; 

const isValidItem = (item: unknown): item is EtsyItem => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'listing_id' in item &&
    item.listing_id !== undefined &&
    item.listing_id !== null
  );
};

const Listing: React.FC<ListingProps> = ({ items }) => { 
  if (!Array.isArray(items)) {
    console.error('❌ items должен быть массивом');
    return <div className="listing-empty">Error: Invalid data</div>;
  }

  if (items.length === 0) {
    return <div className="listing-empty">No items found</div>;
  }

  const validItems = items.filter(isValidItem);

  return (
    <div className="listing-grid">
      {validItems.map((item) => (
        <ProductCard key={item.listing_id.toString()} item={item} />
      ))}
    </div>
  );
};

export default Listing;