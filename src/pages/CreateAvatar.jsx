import React, { useState, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, Play, Pause, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Layout, BouncyButton, LoadingBounce } from '../components/Layout';

// Hardcoded ElevenLabs voices with their IDs
const VOICE_OPTIONS = [
  {
    id: 'pNInz6obpgDQGcFmaJgB',
    name: 'Adam',
    description: 'Deep, resonant voice',
    gender: 'Male',
    age: 'Middle-aged',
    accent: 'American'
  },
  {
    id: '21m00Tcm4TlvDq8ikWAM',
    name: 'Rachel',
    description: 'Calm, professional voice',
    gender: 'Female',
    age: 'Young',
    accent: 'American'
  },
  {
    id: 'EXAVITQu4vr4xnSDxMaL',
    name: 'Sarah',
    description: 'Soft, warm voice',
    gender: 'Female',
    age: 'Young',
    accent: 'American'
  },
  {
    id: 'nPczCjzI2devNBz1zQrb',
    name: 'Brian',
    description: 'Professional, clear voice',
    gender: 'Male',
    age: 'Middle-aged',
    accent: 'American'
  },
  {
    id: 'AZnzlk1XvdvUeBnXmlld',
    name: 'Domi',
    description: 'Strong, confident voice',
    gender: 'Female',
    age: 'Young',
    accent: 'American'
  },
  {
    id: 'ErXwobaYiN019PkySvjV',
    name: 'Antoni',
    description: 'Well-rounded, versatile voice',
    gender: 'Male',
    age: 'Young',
    accent: 'American'
  },
  {
    id: 'MF3mGyEYCl7XYWbV9V6O',
    name: 'Elli',
    description: 'Energetic, youthful voice',
    gender: 'Female',
    age: 'Young',
    accent: 'American'
  },
  {
    id: 'TxGEqnHWrfWFTfGW9XjX',
    name: 'Josh',
    description: 'Young, engaging voice',
    gender: 'Male',
    age: 'Young',
    accent: 'American'
  },
  {
    id: 'VR6AewLTigWG4xSOukaG',
    name: 'Arnold',
    description: 'Crisp, authoritative voice',
    gender: 'Male',
    age: 'Middle-aged',
    accent: 'American'
  },
  {
    id: 'pFZP5JQG7iQjIQuC4Bku',
    name: 'Lily',
    description: 'Raspy, expressive voice',
    gender: 'Female',
    age: 'Middle-aged',
    accent: 'British'
  }
];

export const CreateAvatar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [voiceId, setVoiceId] = useState(VOICE_OPTIONS[0].id);
  const [language, setLanguage] = useState('en');
  const [showCloneVoicePopup, setShowCloneVoicePopup] = useState(false);

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
                </div>

                {/* Step 3: Voice Selection */}
                <div className="bg-green-50 p-6 rounded-2xl space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">🎤 Step 3: Choose Voice</h3>
                  
                  <div className="space-y-3">
                    <label className="block text-lg font-bold text-slate-700 mb-2">
                      Select a Voice *
                    </label>
                    <p className="text-sm text-slate-500 mb-4">
                      Select a voice for your friend. You'll hear them in action once you create the avatar!
                    </p>
                    
                    {/* Clone Your Voice Button */}
                    <div className="mb-4">
                      <button
                        onClick={() => setShowCloneVoicePopup(true)}
                        className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-5 h-5" />
                        Clone Your Own Voice ✨
                      </button>
                      <p className="text-xs text-slate-500 text-center mt-2">
                        Premium feature - Use your own voice for your AI friend
                      </p>
                    </div>
                    
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      {VOICE_OPTIONS.map((voice) => (
                        <motion.div
                          key={voice.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setVoiceId(voice.id)}
                            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              voiceId === voice.id
                                ? 'border-green-500 bg-green-100 shadow-md'
                                : 'border-slate-200 bg-white hover:border-green-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-lg font-bold text-slate-800">
                                    {voice.name}
                                  </h4>
                                  {voice.gender && (
                                    <span className="text-xs px-2 py-1 bg-slate-200 text-slate-600 rounded-full">
                                      {voice.gender}
                                    </span>
                                  )}
                                  {voice.age && (
                                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                                      {voice.age}
                                    </span>
                                  )}
                                  {voice.accent && (
                                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded-full">
                                      {voice.accent}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-slate-600 mt-1">
                                  {voice.description || 'Professional voice'}
                                </p>
                              </div>
                              
                              {voiceId === voice.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="p-2 bg-green-500 rounded-full"
                                >
                                  <Check className="w-5 h-5 text-white" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                  </div>
                </div>

                {/* Step 4: Language */}
                <div className="bg-orange-50 p-6 rounded-2xl space-y-4">
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">🌍 Step 4: Language</h3>
                  
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

                {/* Step 5: Generate Personality */}
                <div className="bg-purple-50 p-6 rounded-2xl space-y-4">
                  <BouncyButton
                    onClick={handleGeneratePrompt}
                    disabled={!knowledgeBase || generatePromptMutation.isPending}
                    variant="primary"
                    className="w-full"
                  >
                    {generatePromptMutation.isPending ? '✨ Generating...' : '✨ Generate Personality'}
                  </BouncyButton>
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

        {/* Clone Voice Premium Popup */}
        {showCloneVoicePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={() => setShowCloneVoicePopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-purple-200"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  Clone Your Voice 🎤
                </h2>
                
                <p className="text-lg text-slate-600 mb-6">
                  Create an AI that sounds exactly like you! Upload voice samples and we'll train a custom voice model.
                </p>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-purple-600">$5</span>
                    <span className="text-slate-600">/month</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Premium Feature - Unlimited voice clones
                  </p>
                </div>
                
                <ul className="text-left text-slate-600 mb-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    High-quality voice cloning
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Unlimited custom voices
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Advanced voice editing
                  </li>
                </ul>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCloneVoicePopup(false)}
                    className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-300 transition-colors"
                  >
                    Maybe Later
                  </button>
                  <button
                    
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};
