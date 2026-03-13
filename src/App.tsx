import { useState, useEffect } from 'react';
import { Part, NewPart } from './types';
import { fetchParts, createPart } from './services/api';
import PartCard from './components/PartCard';
import PartForm from './components/PartForm';
import SearchBar from './components/SearchBar';
import { Wrench, AlertCircle, Loader2 } from 'lucide-react';

function App() {
  const [parts, setParts] = useState<Part[]>([]);
  const [filteredParts, setFilteredParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadParts();
  }, []);

  useEffect(() => {
    filterParts();
  }, [parts, searchTerm, selectedCategory]);

  const loadParts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchParts();
      setParts(data);
    } catch (err) {
      setError('Failed to load parts. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterParts = () => {
    let filtered = parts;

    if (searchTerm) {
      filtered = filtered.filter(part =>
        part.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(part => part.category === selectedCategory);
    }

    setFilteredParts(filtered);
  };

  const handleSubmit = async (newPart: NewPart) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await createPart(newPart);
      setSuccessMessage('Part listed successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      await loadParts();
    } catch (err) {
      setError('Failed to create listing. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Wrench className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">AutoParts Board</h1>
          </div>
          <p className="mt-2 text-gray-600">Find quality auto parts from sellers near you</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : filteredParts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No parts found. Be the first to list one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParts.map((part, index) => (
              <PartCard key={index} part={part} />
            ))}
          </div>
        )}
      </main>

      <PartForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}

export default App;
