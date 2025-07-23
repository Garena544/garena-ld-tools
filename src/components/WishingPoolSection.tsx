import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, Send, CheckCircle, Clock, XCircle, Edit3, Trash2 } from 'lucide-react';
import { useWishingPool, WishForm } from '../hooks/useWishingPool';

export default function WishingPoolSection() {
  const { t } = useLanguage();
  const { wishItems, loading, addWish, updateWishStatus, deleteWish } = useWishingPool();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<WishForm>({
    requester: '',
    wish: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.requester.trim() || !formData.wish.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      addWish(formData);
      setFormData({ requester: '', wish: '' });
      alert(t('wishingPool.successMessage'));
    } catch (err) {
      setError('Failed to submit wish');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-yellow-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return t('wishingPool.status.approved');
      case 'rejected':
        return t('wishingPool.status.rejected');
      default:
        return t('wishingPool.status.pending');
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleStatusChange = (id: string, currentStatus: string) => {
    const statuses = ['pending', 'approved', 'rejected'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length] as 'pending' | 'approved' | 'rejected';
    updateWishStatus(id, nextStatus);
  };

  const handleDeleteWish = (id: string) => {
    if (confirm('确定要删除这个愿望吗？')) {
      deleteWish(id);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <Heart className="mr-3 text-red-600" size={32} />
          {t('wishingPool.title')}
        </h1>
        <p className="text-gray-600 text-lg">
          {t('wishingPool.description')}
        </p>
      </div>

      {/* 提交表单 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('wishingPool.submitTitle')}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="requester" className="block text-sm font-medium text-gray-700 mb-2">
              Requester
            </label>
            <input
              type="text"
              id="requester"
              value={formData.requester}
              onChange={(e) => setFormData(prev => ({ ...prev, requester: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="wish" className="block text-sm font-medium text-gray-700 mb-2">
              {t('wishingPool.form.wish')}
            </label>
            <textarea
              id="wish"
              value={formData.wish}
              onChange={(e) => setFormData(prev => ({ ...prev, wish: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder={t('wishingPool.form.wishPlaceholder')}
              required
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            <span>{submitting ? t('wishingPool.submitting') : t('wishingPool.submit')}</span>
          </button>
        </form>
      </div>

      {/* 愿望列表 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('wishingPool.listTitle')}
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('wishingPool.table.sn')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('wishingPool.table.wish')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('wishingPool.table.status')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wishItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.sn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.requester}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs truncate" title={item.wish}>
                      {item.wish}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleStatusChange(item.id, item.status)}
                        className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded"
                        title="Click to change status"
                      >
                        {getStatusIcon(item.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteWish(item.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete wish"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {wishItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('wishingPool.noItems')}</p>
          </div>
        )}
      </div>
    </div>
  );
} 