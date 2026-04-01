import { useState, useEffect } from 'react';
import Listing from './components/Listing/Listing';
import type { EtsyItem } from './types/etsy'; // 👈 Добавлено 'type'

function App() { // 👈 Убрали явный тип возврата
  const [items, setItems] = useState<EtsyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect((): void => {
    console.log('🔄 Начало загрузки...');
    
    fetch(`${import.meta.env.BASE_URL}data/etsy.json`)
      .then((response) => {
        console.log('📡 Статус:', response.status);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('✅ Данные получены:', data);
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Ошибка:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>Загрузка каталога...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Ошибка загрузки</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Etsy Catalog</h1>
      <p>Найдено товаров: {items.length}</p>
      {items.length === 0 ? <p>Список пуст</p> : <Listing items={items} />}
    </div>
  );
}

export default App;