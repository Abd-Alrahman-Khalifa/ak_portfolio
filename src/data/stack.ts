export interface StackItem {
  name: string
  group: 'Frontend' | 'Backend' | 'Database' | 'Tools'
  details?: string[]
}

export const stack: StackItem[] = [
  { name: 'Laravel', group: 'Backend', details: ['MVC', 'Eloquent ORM', 'Middleware', 'Authentication', 'Authorization', 'REST APIs'] },
  { name: 'PHP', group: 'Backend', details: ['Core language', 'OOP fundamentals', 'Server-side logic'] },
  { name: 'MySQL', group: 'Database', details: ['Relational design', 'Migrations', 'Relationships'] },
  { name: 'React', group: 'Frontend', details: ['Component architecture', 'Hooks', 'SPA routing'] },
  { name: 'JavaScript', group: 'Frontend', details: ['DOM manipulation', 'Async / Fetch', 'Event handling'] },
  { name: 'jQuery', group: 'Frontend', details: ['DOM utilities', 'AJAX calls'] },
  { name: 'AJAX', group: 'Frontend', details: ['Async requests', 'Live search', 'Filtering without reload'] },
  { name: 'Tailwind CSS', group: 'Frontend', details: ['Utility-first styling', 'Responsive design'] },
  { name: 'Bootstrap', group: 'Frontend', details: ['Grid system', 'Components'] },
  { name: 'Git', group: 'Tools', details: ['Version control', 'Branching', 'Collaboration'] },
]

export const pipeline = [
  { step: '01', label: 'Database', detail: 'Design relational schemas — tables, keys, and relationships that hold up under real queries.' },
  { step: '02', label: 'Backend', detail: 'Build the application logic in Laravel/PHP — models, validation, business rules.' },
  { step: '03', label: 'API', detail: 'Expose clean REST endpoints that the frontend can rely on.' },
  { step: '04', label: 'Frontend', detail: 'Turn data into interfaces people actually enjoy using.' },
  { step: '05', label: 'Authentication', detail: 'Protect routes and data with proper auth and authorization.' },
  { step: '06', label: 'User Experience', detail: 'Polish interactions until the whole thing feels considered.' },
]

export const dbTables = [
  { name: 'users', connectsTo: ['orders', 'wishlist', 'cart'] },
  { name: 'products', connectsTo: ['categories', 'cart', 'wishlist', 'order_items'] },
  { name: 'categories', connectsTo: ['products'] },
  { name: 'cart', connectsTo: ['users', 'products'] },
  { name: 'wishlist', connectsTo: ['users', 'products'] },
  { name: 'orders', connectsTo: ['users', 'order_items'] },
  { name: 'order_items', connectsTo: ['orders', 'products'] },
]
