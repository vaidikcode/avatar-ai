import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Layout, BouncyButton, LoadingBounce } from '../components/Layout';

export const CreateAvatar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [voiceId, setVoiceId] = useState('21m00Tcm4TlvDq8ikWAM');
  const [language, setLanguage] = useState('en');

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
      navigate('/dashboard');
    },
  });

  // Generate image with both name and description
  const handleGenerateImage = () => {
    if (name.trim()) {
      generateImageMutation.mutate({
        name: name,
        description: description || 'portrait',
      });
    }
  };

  // Generate prompt from knowledge base
  const handleGeneratePrompt = () => {
    if (knowledgeBase.trim()) {
      generatePromptMutation.mutate({
        knowledge_base: knowledgeBase,
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header with Back Button */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="mb-12"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6 text-lg font-semibold transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Dashboard
          </button>

          <h1 className="text-6xl font-bold text-slate-800 mb-4 flex items-center gap-4">
            <Sparkles className="text-yellow-500 w-12 h-12" />
            Create New Friend
          </h1>
          <p className="text-2xl text-slate-600">
            Let's bring your AI friend to life! ✨
          </p>
        </motion.div>

        {/* Creation Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border-4 border-purple-200">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Side - Form */}
              <div className="space-y-6">
                {/* Step 1: Image Generation Fields */}
                <div className="bg-blue-50 p-6 rounded-2xl space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">📸 Step 1: Create Avatar Image</h3>
                  
                  <div>
                    <label className="block text-lg font-bold text-slate-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Buddy the Robot"
                      className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-slate-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g., friendly cartoon, colorful, happy"
                      className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                    />
                    <p className="text-sm text-slate-500 mt-2">
                      Describe how your friend should look (optional, defaults to "portrait")
                    </p>
                  </div>

                  <BouncyButton
                    onClick={handleGenerateImage}
                    disabled={!name || generateImageMutation.isPending}
                    variant="primary"
                    className="w-full"
                  >
                    {generateImageMutation.isPending ? '🎨 Generating...' : '🎨 Generate Image'}
                  </BouncyButton>
                </div>

                {/* Step 2: System Prompt Field */}
                <div className="bg-purple-50 p-6 rounded-2xl space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">💭 Step 2: Create Personality</h3>
                  
                  <div>
                    <label className="block text-lg font-bold text-slate-700 mb-2">
                      Knowledge Base *
                    </label>
                    <textarea
                      value={knowledgeBase}
                      onChange={(e) => setKnowledgeBase(e.target.value)}
                      placeholder="Tell us what your friend is good at! Like helping with homework, telling jokes, or teaching science..."
                      rows={5}
                      className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all resize-none"
                    />
                    <p className="text-sm text-slate-500 mt-2">
                      Describe what your friend should know and how they should behave
                    </p>
                  </div>

                  <BouncyButton
                    onClick={handleGeneratePrompt}
                    disabled={!knowledgeBase || generatePromptMutation.isPending}
                    variant="primary"
                    className="w-full"
                  >
                    {generatePromptMutation.isPending ? '✨ Generating...' : '✨ Generate Personality'}
                  </BouncyButton>
                </div>

                {/* Step 3: Voice & Language */}
                <div className="bg-green-50 p-6 rounded-2xl space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">🎤 Step 3: Voice & Language</h3>
                  
                  <div>
                    <label className="block text-lg font-bold text-slate-700 mb-2">
                      Language
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
                        <p className="text-sm font-semibold text-slate-700 mb-2">
                          Generated Personality:
                        </p>
                        <p className="text-sm text-slate-600 line-clamp-6">
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
                    <p className="text-sm mt-2">Start by entering a name and generating an image</p>
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

            {(generateImageMutation.isError || generatePromptMutation.isError) && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
                <p className="text-yellow-700 text-center text-lg">
                  {generateImageMutation.isError && 'Failed to generate image. '}
                  {generatePromptMutation.isError && 'Failed to generate personality. '}
                  Please try again!
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
