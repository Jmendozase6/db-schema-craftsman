import type { Alert } from './Alert';

export type SchemaStats = {
  tables: number;
  views: number;
  indexes: number;
  foreignKeys: number;
};

export type Report = {
  qualityScore: number; // Porcentaje de 0 a 100
  syntaxValidation: {
    isValid: boolean;
    error?: string;
  };
  qualityAlerts: Alert[];
  schemaStats: SchemaStats;
  checklistStatus: Record<string, 'passed' | 'failed' | 'unchecked'>;
};