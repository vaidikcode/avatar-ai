import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Video, VideoOff, Mic, MicOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, BouncyButton } from '../components/Layout';
import { AgentChat } from '../components/AgentChat';

export const ChatPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const avatar = location.state?.avatar;

  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Redirect if no avatar data
  useEffect(() => {
    if (!avatar) {
      navigate('/dashboard');
    }
  }, [avatar, navigate]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      streamRef.current = stream;
      setIsCameraOn(true);
      setIsMicOn(true);
    } catch (error) {
      console.error('Error accessing webcam:', error);
      alert('Unable to access camera. Please check permissions!');
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    setIsMicOn(false);
  };

  const toggleCamera = () => {
    if (!streamRef.current) return;
    
    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsCameraOn(videoTrack.enabled);
    }
  };

  const toggleMic = () => {
    if (!streamRef.current) return;
    
    const audioTrack = streamRef.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  };

  const handleStartTalking = async () => {
    if (!isSessionActive) {
      await startWebcam();
      setIsSessionActive(true);
    } else {
      stopWebcam();
      setIsSessionActive(false);
    }
  };

  // Ensure video stream is attached when session becomes active (and video element mounts)
  useEffect(() => {
    if (isSessionActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isSessionActive]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopWebcam();
    };
  }, []);

  if (!avatar) {
    return null;
  }

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

          <div>
            <h1 className="text-5xl font-bold text-slate-800 mb-2">{avatar.name}</h1>
            <p className="text-2xl text-slate-500">Let's have a chat! 💬</p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-2xl p-8 border-4 border-white">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Avatar */}
            <div className="space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-2xl"
              >
                <img
                  src={avatar.image_url}
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Avatar Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  About {avatar.name}
                </h3>
                <p className="text-slate-600 text-lg line-clamp-4">
                  {avatar.system_prompt}
                </p>
              </motion.div>
            </div>

            {/* Right Side - Interaction */}
            <div className="space-y-6">
              {/* Start Talking Button */}
              {!isSessionActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', bounce: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <BouncyButton
                      onClick={handleStartTalking}
                      variant="success"
                      className="text-2xl px-12 py-6 shadow-2xl"
                    >
                      🎤 Start Talking
                    </BouncyButton>
                  </motion.div>
                  <p className="text-slate-500 text-lg mt-4 text-center">
                    Click to start your conversation!
                  </p>
                </motion.div>
              )}

              {/* Active Session */}
              {isSessionActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Webcam View */}
                  <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl aspect-video">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover scale-x-[-1]"
                    />
                    
                    {!isCameraOn && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                        <VideoOff className="w-16 h-16 text-slate-500" />
                      </div>
                    )}

                    {/* Overlay Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleCamera}
                        className={`p-4 rounded-full shadow-lg transition-colors ${
                          isCameraOn
                            ? 'bg-white text-slate-700'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {isCameraOn ? (
                          <Video className="w-6 h-6" />
                        ) : (
                          <VideoOff className="w-6 h-6" />
                        )}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMic}
                        className={`p-4 rounded-full shadow-lg transition-colors ${
                          isMicOn
                            ? 'bg-white text-slate-700'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {isMicOn ? (
                          <Mic className="w-6 h-6" />
                        ) : (
                          <MicOff className="w-6 h-6" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* ElevenLabs Chat Component */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <AgentChat agentId={avatar.agent_id} />
                  </div>

                  {/* End Session Button */}
                  <BouncyButton
                    onClick={handleStartTalking}
                    variant="danger"
                    className="w-full text-xl"
                  >
                    End Conversation
                  </BouncyButton>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
