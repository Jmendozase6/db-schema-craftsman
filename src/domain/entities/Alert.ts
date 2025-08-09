export type AlertType = 'Nomenclature' | 'Performance' | 'Data Type' | 'Security';

export type Alert = {
  type: AlertType;
  message: string;
  line?: number;
}; 