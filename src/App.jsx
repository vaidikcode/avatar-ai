import { useState } from 'react'
import axios from 'axios'

function App() {
  // Step 1: Name & Image Generation
  const [name, setName] = useState('')
  const [description, setDescription] = useState('portrait')
  const [imageUrl, setImageUrl] = useState('')
  const [imageLoading, setImageLoading] = useState(false)
  const [imageError, setImageError] = useState('')

  // Step 2: Prompt Generation
  const [knowledgeBase, setKnowledgeBase] = useState('')
  const [systemPrompt, setSystemPrompt] = useState('')
  const [promptLoading, setPromptLoading] = useState(false)
  const [promptError, setPromptError] = useState('')

  // Step 3: Agent Creation
  const [voiceId, setVoiceId] = useState('21m00Tcm4TlvDq8ikWAM') // Rachel voice
  const [language, setLanguage] = useState('en')
  const [firstMessage, setFirstMessage] = useState('Hello, how can I help you?')
  const [agentId, setAgentId] = useState('')
  const [agentLoading, setAgentLoading] = useState(false)
  const [agentError, setAgentError] = useState('')
  const [agentSuccess, setAgentSuccess] = useState(false)

  // Auto-select model based on language
  const getModelForLanguage = (lang) => {
    return lang === 'en' ? 'eleven_turbo_v2' : 'eleven_turbo_v2_5'
  }

  const handleGenerateImage = async (e) => {
    e.preventDefault()
    setImageLoading(true)
    setImageError('')
    setImageUrl('')

    try {
      const response = await axios.post('/api/generate-image', {
        name,
        description
      })
      setImageUrl(response.data.image_url)
    } catch (error) {
      setImageError(error.response?.data?.detail || 'Failed to generate image')
    } finally {
      setImageLoading(false)
    }
  }

  const handleGeneratePrompt = async (e) => {
    e.preventDefault()
    setPromptLoading(true)
    setPromptError('')
    setSystemPrompt('')

    try {
      const response = await axios.post('/api/generate-prompt', {
        knowledge_base: knowledgeBase
      })
      setSystemPrompt(response.data.system_prompt)
    } catch (error) {
      setPromptError(error.response?.data?.detail || 'Failed to generate prompt')
    } finally {
      setPromptLoading(false)
    }
  }

  const handleCreateAgent = async (e) => {
    e.preventDefault()
    setAgentLoading(true)
    setAgentError('')
    setAgentId('')
    setAgentSuccess(false)

    try {
      const response = await axios.post('/api/create-agent', {
        name,
        image_url: imageUrl,
        system_prompt: systemPrompt,
        voice_id: voiceId,
        language,
        first_message: firstMessage,
        model_id: getModelForLanguage(language)
      })
      setAgentId(response.data.agent_id)
      setAgentSuccess(true)
    } catch (error) {
      setAgentError(error.response?.data?.detail || 'Failed to create agent')
    } finally {
      setAgentLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>🤖 2D Avatar Creator</h1>
      <p className="subtitle">Create your AI-powered conversational avatar in 3 easy steps</p>

      {/* STEP 1: Generate Image */}
      <div className="step">
        <h2>
          <span className="step-number">1</span>
          Generate Avatar Image
        </h2>
        <form onSubmit={handleGenerateImage}>
          <div className="form-group">
            <label htmlFor="name">Avatar Name *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Sarah Johnson"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., portrait, professional, smiling"
            />
            <p className="info-text">Describe the visual style of your avatar</p>
          </div>

          <button type="submit" disabled={imageLoading || !name}>
            {imageLoading ? 'Generating...' : 'Generate Image'}
          </button>
        </form>

        {imageLoading && <div className="loading">⏳ Generating your avatar image...</div>}
        {imageError && <div className="error">{imageError}</div>}
        
        {imageUrl && (
          <div className="image-preview">
            <h3>✅ Image Generated Successfully!</h3>
            <img src={imageUrl} alt={name} />
            <div className="result-box">
              <h3>Image URL:</h3>
              <pre>{imageUrl}</pre>
            </div>
          </div>
        )}
      </div>

      {/* STEP 2: Generate System Prompt */}
      <div className="step">
        <h2>
          <span className="step-number">2</span>
          Generate System Prompt
        </h2>
        <form onSubmit={handleGeneratePrompt}>
          <div className="form-group">
            <label htmlFor="knowledgeBase">Knowledge Base / Agent Description *</label>
            <textarea
              id="knowledgeBase"
              value={knowledgeBase}
              onChange={(e) => setKnowledgeBase(e.target.value)}
              placeholder="Describe what your agent should know and how it should behave. E.g., 'A friendly customer service agent for a tech company that helps users with product inquiries and troubleshooting.'"
              required
            />
            <p className="info-text">Provide details about your agent's expertise and personality</p>
          </div>

          <button type="submit" disabled={promptLoading || !knowledgeBase}>
            {promptLoading ? 'Generating...' : 'Generate System Prompt'}
          </button>
        </form>

        {promptLoading && <div className="loading">⏳ Generating system prompt with AI...</div>}
        {promptError && <div className="error">{promptError}</div>}
        
        {systemPrompt && (
          <div className="result-box">
            <h3>✅ System Prompt Generated:</h3>
            <pre>{systemPrompt}</pre>
          </div>
        )}
      </div>

      {/* STEP 3: Create Agent */}
      <div className="step">
        <h2>
          <span className="step-number">3</span>
          Create Conversational Agent
        </h2>
        <form onSubmit={handleCreateAgent}>
          <div className="form-group">
            <label htmlFor="voiceId">ElevenLabs Voice ID *</label>
            <input
              type="text"
              id="voiceId"
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
              placeholder="21m00Tcm4TlvDq8ikWAM"
              required
            />
            <p className="info-text">Get voice IDs from ElevenLabs dashboard</p>
          </div>

          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="pt">Portuguese</option>
            </select>
            <p className="info-text">
              Model: {language === 'en' ? 'eleven_turbo_v2 (English-optimized)' : 'eleven_turbo_v2_5 (Multilingual)'}
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="firstMessage">First Message</label>
            <input
              type="text"
              id="firstMessage"
              value={firstMessage}
              onChange={(e) => setFirstMessage(e.target.value)}
              placeholder="Hello, how can I help you?"
            />
            <p className="info-text">The greeting message your agent will say first</p>
          </div>

          <button 
            type="submit" 
            disabled={agentLoading || !name || !imageUrl || !systemPrompt || !voiceId}
          >
            {agentLoading ? 'Creating Agent...' : 'Create Agent'}
          </button>

          {(!imageUrl || !systemPrompt) && (
            <p className="info-text" style={{ marginTop: '10px', textAlign: 'center' }}>
              ⚠️ Complete steps 1 and 2 first
            </p>
          )}
        </form>

        {agentLoading && <div className="loading">⏳ Creating your conversational agent...</div>}
        {agentError && <div className="error">{agentError}</div>}
        
        {agentSuccess && agentId && (
          <div className="success">
            <h3>🎉 Agent Created Successfully!</h3>
            <div className="result-box">
              <h3>Agent ID:</h3>
              <pre>{agentId}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
