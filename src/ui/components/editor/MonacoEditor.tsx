import React from "react";
import Editor from '@monaco-editor/react';
import type { OnChange } from '@monaco-editor/react';

interface MonacoEditorProps {
  value: string;
  language: string;
  onChange: OnChange;
  errorLine?: number;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ value, language, onChange, errorLine }) => {
  // Mapeamos nuestros dialectos a los lenguajes que Monaco entiende.
  const mapDialectToLanguage = (dialect: string) => {
    const mapping: { [key: string]: string } = {
      postgresql: 'pgsql',
      sqlserver: 'sql',
      mysql: 'mysql',
      sqlite: 'sql',
    };
    return mapping[dialect] || 'sql';
  };

  return (
    <Editor
      height="100%"
      language={mapDialectToLanguage(language)}
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: true },
        fontSize: 14,
        wordWrap: 'on',
        automaticLayout: true,
        scrollBeyondLastLine: false,
      }}
    />
  );
};

export default MonacoEditor;