import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const tabs = [
  {
    id: 'laravel',
    label: 'Laravel',
    code: `class OrderController extends Controller
{
    public function store(StoreOrderRequest $request)
    {
        $order = Order::create([
            'user_id' => $request->user()->id,
            'status'  => 'pending',
        ]);

        foreach ($request->items as $item) {
            $order->items()->create($item);
        }

        return response()->json($order->load('items'), 201);
    }
}`,
  },
  {
    id: 'php',
    label: 'PHP',
    code: `function connect(): PDO
{
    $dsn = "mysql:host=localhost;dbname=app;charset=utf8mb4";
    return new PDO($dsn, 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
}`,
  },
  {
    id: 'react',
    label: 'React',
    code: `function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems((prev) => [...prev, toCartItem(product)]);
  };

  return { items, addItem };
}`,
  },
  {
    id: 'ajax',
    label: 'AJAX',
    code: `$('#category-select').on('change', function () {
  $.ajax({
    url: '/products/filter',
    data: { category: $(this).val() },
    success: (html) => $('#product-grid').html(html),
  });
});`,
  },
  {
    id: 'sql',
    label: 'SQL',
    code: `SELECT o.id, u.name, SUM(oi.quantity * p.price) AS total
FROM orders o
JOIN users u ON u.id = o.user_id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON p.id = oi.product_id
GROUP BY o.id, u.name;`,
  },
]

export default function CodeEditor() {
  const [active, setActive] = useState(tabs[0].id)
  const current = tabs.find((t) => t.id === active)!

  return (
    <section id="code" className="relative container-px py-32">
      <SectionHeading
        index="06"
        label="CODE"
        title="CONCEPTS I WORK WITH"
        description="Illustrative snippets representing patterns I actually use — not copied from a production system."
      />

      <Reveal delay={0.15}>
        <div
          className="mt-10 max-w-3xl rounded-2xl border overflow-hidden"
          style={{ borderColor: 'var(--border)', background: '#050507' }}
        >
          <div className="flex overflow-x-auto border-b" style={{ borderColor: 'var(--border)' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="px-5 py-3 font-mono text-xs whitespace-nowrap transition-colors relative"
                style={{ color: active === tab.id ? 'var(--text-primary)' : 'var(--text-muted)' }}
              >
                {tab.label}
                {active === tab.id && (
                  <motion.div
                    layoutId="editor-tab"
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: 'var(--accent)' }}
                  />
                )}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.pre
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="p-6 overflow-x-auto text-[12px] leading-relaxed font-mono"
              style={{ color: 'var(--text-secondary)' }}
            >
              <code>{current.code}</code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
