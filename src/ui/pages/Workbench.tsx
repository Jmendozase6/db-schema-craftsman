import React from "react";
import { useProject } from "../hooks/useProject";
import MonacoEditor from "../components/editor/MonacoEditor";
import { Database, FilePlus } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ChecklistPanel from "../components/checklist/Checklist";

const StatusBar: React.FC<{ error: { message: string, line?: number } | null }> = ({ error }) => {
  if (error) {
    return (
      <div className="bg-status-error text-white px-4 py-1 text-xs flex items-center">
        Error en línea {error.line || 'N/A'}: {error.message}
      </div>
    );
  }
  return <div className="bg-status-success text-white px-4 py-1 text-xs">Sintaxis Válida</div>;
};

const Workbench: React.FC = () => {

  const { project, isLoading, syntaxError, updateProject, createNewProject } = useProject();

  const handleSqlChange = (newSql: string | undefined) => {
    if (project && typeof newSql === 'string') {
      const updatedProject = { ...project, sqlScript: newSql };
      updateProject(updatedProject);
    }
  };

  if (isLoading) {
    return <div className="bg-gray-900 text-white min-h-screen p-4">Cargando DB Schema Craftsman...</div>
  }

  if (!project) {
    return <div className="bg-gray-900 text-white min-h-screen p-4">Error al cargar proyecto.</div>;
  }

  return (
    <div className="bg-gray-100 h-screen flex flex-col font-sans">
      <header className="gradient-bg text-white shadow-md p-3 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <Database size={24} />
          <h1 className="text-lg font-bold">DB Schema Craftsman</h1>
        </div>
        <button
          onClick={createNewProject}
          className="bg-white text-brand-primary font-semibold py-1 px-3 rounded text-sm hover:bg-purple-100 transition-colors flex items-center gap-2"
        >
          <FilePlus size={16} />
          Nuevo Proyecto
        </button>
      </header>

      <PanelGroup direction="horizontal" className="flex-grow p-4 gap-4">
        <Panel defaultSize={60} minSize={30}>
          <div className="h-full rounded-lg overflow-hidden shadow-lg">
            <MonacoEditor
              language={project.dialect}
              value={project.sqlScript}
              onChange={handleSqlChange}
            />
          </div>
        </Panel>
        <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-brand-primary rounded-full transition-colors" />
        <Panel defaultSize={40} minSize={25}>
          <ChecklistPanel />
        </Panel>
      </PanelGroup>

      <footer className="flex-shrink-0">
        <StatusBar error={syntaxError} />
      </footer>
    </div>
  );
}
export default Workbench;