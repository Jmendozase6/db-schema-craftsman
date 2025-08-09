export type ChecklistCategory = 'Nomenclature' | 'Structure/Design' | 'Performance' | 'Security';

export type ChecklistItem = {
  id: string;
  description: string;
  category: ChecklistCategory;
  isAutoDetected: boolean;
}