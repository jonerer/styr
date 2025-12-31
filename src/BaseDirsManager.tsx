import React, { useState, useEffect } from 'react';

export function BaseDirsManager() {
  const [baseDirs, setBaseDirs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBaseDirs();
  }, []);

  const loadBaseDirs = async () => {
    try {
      const dirs = await window.baseDirsAPI.getBaseDirs();
      setBaseDirs(dirs);
    } catch (error) {
      console.error('Failed to load base directories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDirectory = async () => {
    try {
      const dir = await window.baseDirsAPI.browseDirectory();
      if (dir) {
        await window.baseDirsAPI.addBaseDir(dir);
        await loadBaseDirs();
      }
    } catch (error) {
      console.error('Failed to add directory:', error);
    }
  };

  const handleRemoveDirectory = async (dir: string) => {
    try {
      await window.baseDirsAPI.removeBaseDir(dir);
      await loadBaseDirs();
    } catch (error) {
      console.error('Failed to remove directory:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Base Directories</h2>
        <p className="text-gray-600 mb-6">
          Manage your base directories. These settings are persisted between restarts.
        </p>

        <button
          onClick={handleAddDirectory}
          className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
        >
          + Add Directory
        </button>

        {baseDirs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No directories configured. Click "Add Directory" to get started.
          </div>
        ) : (
          <ul className="space-y-2">
            {baseDirs.map((dir) => (
              <li
                key={dir}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150"
              >
                <span className="text-gray-800 font-mono text-sm flex-1 break-all">
                  {dir}
                </span>
                <button
                  onClick={() => handleRemoveDirectory(dir)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 text-sm font-medium flex-shrink-0"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
