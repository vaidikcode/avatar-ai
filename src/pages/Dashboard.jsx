import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Layout, LoadingBounce, Card } from '../components/Layout';
import { AvatarModal } from '../components/AvatarModal';

const fetchAvatars = async () => {
  const response = await axios.get('/api/avatars');
  return response.data.avatars;
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Fetch avatars
  const { data: avatars = [], isLoading, error } = useQuery({
    queryKey: ['avatars'],
    queryFn: fetchAvatars,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingBounce text="Loading your friends..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-4">
            <Heart className="text-pink-500 w-12 h-12" />
            My AI Friends
            <Sparkles className="text-yellow-500 w-12 h-12" />
          </h1>
          <p className="text-2xl text-slate-600">
            Chat, play, and learn together! 🎉
          </p>
        </motion.div>

        {/* Avatar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Existing Avatars */}
          {avatars.map((avatar, index) => (
            <motion.div
              key={avatar.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card
                onClick={() => setSelectedAvatar(avatar)}
                className="cursor-pointer group"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-blue-100 to-purple-100">
                  <motion.img
                    src={avatar.image_url}
                    alt={avatar.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 text-center">
                  {avatar.name}
                </h3>
                <p className="text-slate-500 text-center mt-2 text-lg">
                  Tap to chat! 💬
                </p>
              </Card>
            </motion.div>
          ))}

          {/* Create New Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: avatars.length * 0.1, duration: 0.4 }}
          >
            <Card
              onClick={() => navigate('/create')}
              className="cursor-pointer group h-full flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-br from-green-50 to-emerald-50"
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <Plus className="w-24 h-24 text-green-500" strokeWidth={3} />
              </motion.div>
              <h3 className="text-2xl font-bold text-slate-800 text-center">
                Create New Friend
              </h3>
              <p className="text-slate-500 text-center mt-2 text-lg">
                Let's make a new buddy! ✨
              </p>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Avatar Modal */}
      <AnimatePresence>
        {selectedAvatar && (
          <AvatarModal
            avatar={selectedAvatar}
            onClose={() => setSelectedAvatar(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};
