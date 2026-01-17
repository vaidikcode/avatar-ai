import React, { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, Heart } from 'lucide-react';
import axios from 'axios';
import { Layout, BouncyButton, LoadingBounce, Card } from './Layout';
import { AvatarModal } from './AvatarModal';

const fetchAvatars = async () => {
  const response = await axios.get('/api/avatars');
  return response.data.avatars;
};

export const Dashboard = () => {
  const queryClient = useQueryClient();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showCreationSection, setShowCreationSection] = useState(false);
  const creationRef = useRef(null);

  // Form states
  const [name, setName] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [voiceId, setVoiceId] = useState('21m00Tcm4TlvDq8ikWAM');
  const [language, setLanguage] = useState('en');

  // Fetch avatars
  const { data: avatars = [], isLoading, error } = useQuery({
    queryKey: ['avatars'],
    queryFn: fetchAvatars,
  });

  // Generate image mutation
  const generateImageMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post('/api/generate-image', data);
      return response.data;
    },
    onSuccess: (data) => {
      setImageUrl(data.image_url);
    },
  });

  // Generate prompt mutation
  const generatePromptMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post('/api/generate-prompt', data);
      return response.data;
    },
    onSuccess: (data) => {
      setSystemPrompt(data.system_prompt);
    },
  });

  // Create avatar mutation
  const createAvatarMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post('/api/create-agent', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['avatars']);
      // Reset form
      setName('');
      setKnowledgeBase('');
      setImageUrl('');
      setSystemPrompt('');
      setShowCreationSection(false);
    },
  });

  // Auto-trigger image generation when name changes
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (newName.length >= 3) {
      generateImageMutation.mutate({
        name: newName,
        description: 'friendly cartoon portrait, colorful, happy',
      });
    }
  };

  // Auto-trigger prompt generation when knowledge base changes
  const handleKnowledgeChange = (e) => {
    const newKnowledge = e.target.value;
    setKnowledgeBase(newKnowledge);
    if (newKnowledge.length >= 20) {
      generatePromptMutation.mutate({
        knowledge_base: newKnowledge,
      });
    }
  };

  const handleSaveFriend = () => {
    if (name && imageUrl && systemPrompt) {
      createAvatarMutation.mutate({
        name,
        image_url: imageUrl,
        system_prompt: systemPrompt,
        voice_id: voiceId,
        language,
        first_message: `Hi! I'm ${name}. Let's chat!`,
        model_id: language === 'en' ? 'eleven_turbo_v2' : 'eleven_turbo_v2_5',
      });
    }
  };

  const scrollToCreation = () => {
    setShowCreationSection(true);
    setTimeout(() => {
      creationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

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
              onClick={scrollToCreation}
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

        {/* Creation Section */}
        <AnimatePresence>
          {showCreationSection && (
            <motion.div
              ref={creationRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="mt-20"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border-4 border-purple-200">
                <h2 className="text-4xl font-bold text-slate-800 mb-8 text-center flex items-center justify-center gap-3">
                  <Sparkles className="text-yellow-500 w-10 h-10" />
                  Creation Station
                  <Sparkles className="text-yellow-500 w-10 h-10" />
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Side - Form */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xl font-bold text-slate-700 mb-2">
                        Name your friend *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="e.g., Buddy the Robot"
                        className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xl font-bold text-slate-700 mb-2">
                        What do they know? *
                      </label>
                      <textarea
                        value={knowledgeBase}
                        onChange={handleKnowledgeChange}
                        placeholder="Tell us what your friend is good at! Like helping with homework, telling jokes, or teaching science..."
                        rows={6}
                        className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all resize-none"
                      />
                      <p className="text-sm text-slate-500 mt-2">
                        Type at least 20 characters to generate AI personality!
                      </p>
                    </div>

                    <div>
                      <label className="block text-xl font-bold text-slate-700 mb-2">
                        Voice & Language
                      </label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                      >
                        <option value="en">English 🇬🇧</option>
                        <option value="hi">Hindi 🇮🇳</option>
                        <option value="es">Spanish 🇪🇸</option>
                        <option value="fr">French 🇫🇷</option>
                      </select>
                    </div>
                  </div>

                  {/* Right Side - Preview */}
                  <div className="flex flex-col items-center justify-center">
                    {generateImageMutation.isPending ? (
                      <LoadingBounce text="Creating your friend's face..." />
                    ) : imageUrl ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5 }}
                        className="space-y-6 w-full"
                      >
                        <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-xl">
                          <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {generatePromptMutation.isPending && (
                          <LoadingBounce text="Crafting personality..." />
                        )}

                        {systemPrompt && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-green-50 rounded-2xl p-4"
                          >
                            <p className="text-sm text-slate-600 line-clamp-4">
                              {systemPrompt}
                            </p>
                          </motion.div>
                        )}

                        <BouncyButton
                          onClick={handleSaveFriend}
                          disabled={!systemPrompt || createAvatarMutation.isPending}
                          variant="success"
                          className="w-full text-xl"
                        >
                          {createAvatarMutation.isPending
                            ? '✨ Creating...'
                            : '💾 Save Friend!'}
                        </BouncyButton>
                      </motion.div>
                    ) : (
                      <div className="text-center text-slate-400 text-xl">
                        <div className="w-64 h-64 rounded-3xl bg-slate-100 flex items-center justify-center mb-4">
                          <Sparkles className="w-24 h-24 text-slate-300" />
                        </div>
                        <p>Your friend will appear here!</p>
                      </div>
                    )}
                  </div>
                </div>

                {createAvatarMutation.isError && (
                  <div className="mt-6 p-4 bg-red-50 rounded-2xl border-2 border-red-200">
                    <p className="text-red-600 text-center text-lg">
                      Oops! Something went wrong. Try again!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
