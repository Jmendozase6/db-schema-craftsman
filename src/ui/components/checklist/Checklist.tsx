import React, { useState } from "react";
import Card from "../shared/Card";
import { Check, DraftingCompass, FileText, Gauge, ShieldCheck, XSquare } from "lucide-react";

// Datos estáticos basados en el PDD
const checklistData = {
  'Estructura/Diseño': [
    { id: 'pk-present', text: 'Toda tabla tiene una Clave Primaria (PK)', auto: true },
    { id: 'fk-defined', text: 'Las relaciones están definidas con Claves Foráneas (FK)', auto: true },
    { id: 'fk-indexed', text: 'Toda FK tiene un índice asociado para el rendimiento', auto: true },
  ],
  'Nomenclatura': [
    { id: 'naming-consistent', text: 'La nomenclatura de tablas y columnas es consistente', auto: false },
    { id: 'names-descriptive', text: 'Los nombres son descriptivos y evitan abreviaturas ambiguas', auto: false },
  ],
  'Rendimiento': [
    { id: 'data-types-ok', text: 'Se usan tipos de datos apropiados (ej: no FLOAT para dinero)', auto: true },
    { id: 'varchar-length', text: 'Los `VARCHAR` tienen longitudes razonables', auto: false },
  ],
  'Seguridad': [
    { id: 'no-autoincrement-pk', text: 'Evitar PKs autoincrementales predecibles si son expuestas externamente', auto: false },
  ]
};

const CategoryIcon = ({ category }: { category: string }) => {
  switch (category) {
    case 'Estructura/Diseño': return <DraftingCompass className="inline-block mr-2 text-brand-primary" />
    case 'Nomenclatura': return <FileText className="inline-block mr-2 text-brand-primary" />;
    case 'Rendimiento': return <Gauge className="inline-block mr-2 text-brand-primary" />;
    case 'Seguridad': return <ShieldCheck className="inline-block mr-2 text-brand-primary" />;
    default: return null;
  }
};

const ChecklistPanel: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleToggle = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalItems = Object.values(checklistData).flat().length;
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <Card className="flex flex-col">
      <div className="flex justify-between items-center mb-4 pb-2 border-b">
        <h3 className="text-xl font-semibold text-gray-700">Checklist de Calidad</h3>
        <div className="flex gap-2">
          <button className="text-xs text-gray-500 hover:text-brand-primary transition-colors" onClick={() => setCheckedItems({})}>
            <XSquare size={16} className="inline-block mr-1">Limpiar</XSquare>
          </button>
        </div>
      </div>

      <div className="space-y-4 overflow-y-auto flex-grow">
        {Object.entries(checklistData).map(([category, items]) => (
          <div key={category}>
            <h4 className="font-semibold text-base mb-2 text-brand-primary-dark">
              <CategoryIcon category={category} />
              {category}
            </h4>
            <div className="space-y-2 ml-4">
              {items.map(item => (
                <label
                  key={item.id}
                  className={`flex items-center p-2 border rounded-md cursor-pointer transition-all duration-200 ${checkedItems[item.id]
                    ? 'bg-green-50 border-status-success'
                    : 'hover:bg-gray-50'}`}
                  onClick={() => handleToggle(item.id)}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedItems[item.id]}
                    readOnly
                    className="mr-3 w-4 h-4 accent-brand-primary"
                  />
                  <span className={`flex-1 text-sm ${checkedItems[item.id] ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                    {item.text}
                  </span>
                  {item.auto && <Check size={14} xlinkTitle="Detección automática" className="ml-2 text-blue-500" />}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">{progress}% completado</span>
          <div className="w-1/2 bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-brand-primary to-brand-primary-dark h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}>
            </div>
          </div>
        </div>
      </div>

    </Card>
  );
}
export default ChecklistPanel