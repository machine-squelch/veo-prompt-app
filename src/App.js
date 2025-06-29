import React, { useState, useRef } from 'react';

// Main App Component
const App = () => {
    // Define the prompt categories, their options, and tooltip hints
    const promptOptions = {
        'Scene': {
            hint: 'Describe the setting, time of day, atmosphere, and general environment. E.g., "Bustling Tokyo street at night, neon reflections, light rain."',
            options: [
                { value: '', label: 'Select Scene...' },
                { value: 'Bustling metropolis, perpetual night, neon-drenched streets', label: 'Bustling Metropolis (Night)' },
                { value: 'Quiet suburban street, autumn leaves, morning mist', label: 'Quiet Suburban Street (Autumn)' },
                { value: 'Gritty industrial district, flickering lights, steam rising', label: 'Gritty Industrial District' },
                { value: 'Ancient Redwood forest, dappled sunlight, ethereal fog', label: 'Ancient Redwood Forest' },
                { value: 'Vast desolate desert, shimmering heat haze, distant mountains', label: 'Vast Desolate Desert' },
                { value: 'Serene moonlit lake, silent, stars reflecting on water', label: 'Serene Moonlit Lake' },
                { value: 'Grand Victorian library, dusty shelves, warm fireplace glow', label: 'Grand Victorian Library' },
                { value: 'Sleek minimalist apartment, panoramic city views, soft ambient light', label: 'Sleek Minimalist Apartment' },
                { value: 'Chaotic artist\'s studio, scattered canvases, vibrant colors', label: 'Chaotic Artist\'s Studio' },
                { value: 'High-tech spaceship bridge, holographic displays, distant stars', label: 'High-Tech Spaceship Bridge' },
                { value: 'Cyberpunk alleyway, rain-slicked, glowing advertisements', label: 'Cyberpunk Alleyway' },
                { value: 'Medieval castle courtyard, bustling activity, stone walls', label: 'Medieval Castle Courtyard' },
                { value: 'Roaring Twenties speakeasy, smoky, jazz music', label: 'Roaring Twenties Speakeasy' },
                { value: 'Futuristic floating city, anti-gravity vehicles, glowing pathways', label: 'Futuristic Floating City' },
                { value: 'Underwater reef, vibrant coral, schools of tropical fish', label: 'Underwater Reef' },
                { value: 'Frozen Arctic landscape, shimmering ice, distant aurora borealis', label: 'Frozen Arctic Landscape' },
                { value: 'Ancient temple ruins, overgrown with vines, mystical mist', label: 'Ancient Temple Ruins' },
                { value: 'Cozy rustic cabin, snow falling outside, crackling fireplace', label: 'Cozy Rustic Cabin' },
                { value: 'CUSTOM_INPUT', label: 'Custom...' }
            ]
        },
        'Subject': {
            hint: 'Who or what is the main focus? Describe their appearance, state, or key characteristics. E.g., "A lone wolf, piercing blue eyes, poised to howl."',
            options: [
                { value: '', label: 'Select Subject...' },
                { value: 'Determined young woman, worn leather jacket, sharp eyes', label: 'Determined Young Woman' },
                { value: 'Elderly gentleman, tweed suit, thoughtful expression', label: 'Elderly Gentleman' },
                { value: 'Energetic child, brightly colored raincoat, skipping', label: 'Energetic Child' },
                { value: 'Majestic dragon, scales shimmering, smoke curling from nostrils', label: 'Majestic Dragon' },
                { value: 'Playful golden retriever, wagging tail, muddy paws', label: 'Playful Golden Retriever' },
                { value: 'Vintage classic car, gleaming chrome, speeding down a highway', label: 'Vintage Classic Car' },
                { value: 'Intricate antique clock, gears turning, slow pendulum swing', label: 'Intricate Antique Clock' },
                { value: 'Swirling vortex of cosmic dust, pulsating light', label: 'Swirling Cosmic Vortex' },
                { value: 'Ethereal spirit, translucent, softly glowing', label: 'Ethereal Spirit' },
                { value: 'A group of diverse individuals, engaged in lively conversation', label: 'Diverse Group Conversing' },
                { value: 'A sleek, autonomous drone, silently hovering', label: 'Sleek Autonomous Drone' },
                { value: 'An ancient, gnarled tree, standing solitary on a hill', label: 'Ancient Gnarled Tree' },
                { value: 'A bustling marketplace, filled with vibrant stalls and people', label: 'Bustling Marketplace' },
                { value: 'CUSTOM_INPUT', label: 'Custom...' }
            ]
        },
        'Shot + Lens': {
            hint: 'Specify the shot type and lens choice. E.g., "Extreme Wide Shot (EWS), shot on 14mm anamorphic lens."',
            options: [
                { value: '', label: 'Select Shot & Lens...' },
                { value: 'Extreme Close-Up (ECU), shot on macro lens', label: 'ECU (Macro Lens)' },
                { value: 'Close-Up (CU), shot on 85mm prime lens', label: 'CU (85mm Prime)' },
                { value: 'Medium Shot (MS), eye-level, shot on 50mm lens', label: 'MS (50mm Lens)' },
                { value: 'Medium Full Shot (MFS), shot on 35mm lens', label: 'MFS (35mm Lens)' },
                { value: 'Full Shot (FS), shot on 24mm lens', label: 'FS (24mm Lens)' },
                { value: 'Long Shot (LS), establishing, shot on 18mm lens', label: 'LS (18mm Lens)' },
                { value: 'Extreme Long Shot (ELS), shot on 18mm lens', label: 'ELS (18mm Read)' },
                { value: 'Over-the-shoulder close-up, shot on 50mm lens', label: 'Over-the-Shoulder (50mm)' },
                { value: 'Point of View (POV), handheld, shot on 35mm lens', label: 'POV (Handheld 35mm)' },
                { value: 'Dutch Angle, shot on 24mm lens', label: 'Dutch Angle (24mm)' },
                { value: 'Two-Shot, medium close-up, shot on 100mm lens', label: 'Two-Shot (MC, 100mm)' },
                { value: 'Insert Shot, extreme close-up of hands, shot on macro lens', label: 'Insert Shot (Hands)' },
                { value: 'Master Shot, wide angle, capturing entire scene, shot on 21mm lens', label: 'Master Shot (Wide 21mm)' },
                { value: 'Worm\'s Eye View, shot on 14mm lens', label: 'Worm\'s Eye View (14mm)' },
                { value: 'Bird\'s Eye View, high angle, shot on drone with wide lens', label: 'Bird\'s Eye View (Drone Wide)' },
                { value: 'CUSTOM_INPUT', label: 'Custom...' }
            ]
        },
        'Camera Movement': {
            hint: 'Describe how the camera moves. E.g., "Smooth crane up, revealing vast landscape."',
            options: [
                { value: '', label: 'Select Camera Movement...' },
                { value: 'Static/Locked-Off camera', label: 'Static/Locked-Off' },
                { value: 'Slow Push-In (Dolly-In), focusing on details', label: 'Slow Push-In (Dolly)' },
                { value: 'Slow Pull-Out (Dolly-Out), revealing context', label: 'Slow Pull-Out (Dolly)' },
                { value: 'Smooth Left Pan, following subject', label: 'Smooth Pan Left' },
                { value: 'Smooth Right Pan, following subject', label: 'Smooth Pan Right' },
                { value: 'Gentle Up Tilt, revealing ceiling', label: 'Gentle Tilt Up' },
                { value: 'Gentle Down Tilt, focusing on ground', label: 'Gentle Tilt Down' },
                { value: 'Slow Track Left, maintaining distance from subject', label: 'Slow Track Left' },
                { value: 'Slow Track Right, maintaining distance from subject', label: 'Slow Track Right' },
                { value: 'Smooth Crane Up, revealing surroundings', label: 'Smooth Crane Up' },
                { value: 'Smooth Crane Down, focusing on a detail', label: 'Smooth Crane Down' },
                { value: 'Handheld, slightly shaky, immersing viewer in action', label: 'Handheld/Shaky Immersion' },
                { value: 'Smooth Steadicam Follow, tracking character\'s walk', label: 'Smooth Steadicam Follow' },
                { value: 'Fast Zoom In, sudden focus on expression', label: 'Fast Zoom In (Sudden Focus)' },
                { value: 'Slow Zoom Out, revealing hidden elements', label: 'Slow Zoom Out (Reveal)' },
                { value: 'Circular Orbit around subject, revealing different angles', label: 'Circular Orbit' },
                { value: 'Rack Focus, shifting focus from foreground to background', label: 'Rack Focus' },
                { value: 'Vertigo Effect (Dolly Zoom), unsettling perspective shift', label: 'Vertigo Effect' },
                { value: 'CUSTOM_INPUT', label: 'Custom...' }
            ]
        },
        'Composition': {
            hint: 'Define the arrangement of elements within the frame. E.g., "Balanced symmetry, subject centered, leading lines converging."',
            options: [
                { value: '', label: 'Select Composition...' },
                { value: 'Rule of thirds, subject on left third, balanced foreground', label: 'Rule of Thirds (Left)' },
                { value: 'Rule of thirds, subject on right third, open space', label: 'Rule of Thirds (Right)' },
                { value: 'Perfect Symmetry, subject centered, reflective surface', label: 'Perfect Symmetry (Centered)' },
                { value: 'Strong Leading Lines drawing eye to subject, e.g., road receding into distance', label: 'Strong Leading Lines' },
                { value: 'Natural Framing through an archway, creating depth', label: 'Natural Framing (Archway)' },
                { value: 'Negative Space emphasis, subject small in frame, vast empty background', label: 'Negative Space Emphasis' },
                { value: 'Golden Ratio Spiral, subject aligned at key point', label: 'Golden Ratio Spiral' },
                { value: 'Deep Focus, all elements sharp from foreground to background, no blur', label: 'Deep Focus' },
                { value: 'Shallow Depth of Field (Bokeh), background heavily blurred, subject sharp', label: 'Shallow Depth of Field (Bokeh)' },
                { value: 'Prominent Foreground Element, slightly blurred, adding depth', label: 'Prominent Foreground Element' },
                { value: 'Dynamic Diagonal Lines, creating tension and movement', label: 'Dynamic Diagonal Lines' },
                { value: 'Triangle Composition, subjects forming a stable triangle', label: 'Triangle Composition' },
                { value: 'Frame within a frame, subject seen through a window', label: 'Frame Within Frame' },
                { value: 'CUSTOM_INPUT', label: 'Custom...' }
            ]
        },
        'Lighting/Mood': {
            hint: 'Describe the illumination and emotional tone. E.g., "Warm, flickering candlelight, intimate and melancholic mood."',
            options: [
                { value: '', label: 'Select Lighting & Mood...' },
                { value: 'High-Key lighting, bright, open, optimistic mood', label: 'High-Key (Optimistic)' },
                { value: 'Low-Key lighting, dark, dramatic shadows, mysterious mood', label: 'Low-Key (Mysterious)' },
                { value: 'Natural, soft, diffused light, peaceful mood', label: 'Natural Light (Peaceful)' },
                { value: 'Hard, sharp light, stark shadows, tense atmosphere', label: 'Hard Light (Tense)' },
                { value: 'Subtle Rim lighting, outlining subject, ethereal mood', label: 'Rim Light (Ethereal)' },
                { value: 'Visible Practical Lights, warm glow, cozy mood', label: 'Practical Lights (Cozy)' },
                { value: 'Volumetric Lighting (God Rays), dust particles visible, spiritual mood', label: 'Volumetric Lighting (Spiritual)' },
                { value: 'Cool, harsh fluorescent light, tense atmosphere', label: 'Cool Fluorescent (Tense)' },
                { value: 'Warm, golden hour glow, nostalgic feel', label: 'Golden Hour (Nostalgic)' },
                { value: 'Eerie, flickering light, unsettling mood', label: 'Flickering Light (Unsettling)' },
                { value: 'Chiaroscuro, high contrast between light and dark, dramatic mood', label: 'Chiaroscuro (Dramatic)' },
                { value: 'Silhouetted against a bright background, mysterious and impactful', label: 'Silhouetted (Mysterious)' },
                { value: 'Neon glow, vibrant and futuristic mood', label: 'Neon Glow (Futuristic)' },
                { value: 'Soft blue moonlight, calm and serene atmosphere', label: 'Blue Moonlight (Serene)' },
                { value: 'CUSTOM_INPUT', label: 'Custom...' }
            ]
        },
        'Action': {
            hint: 'What is happening in the scene? Focus on character actions or environmental changes. E.g., "A swift martial arts sequence, fluid movements, impactful strikes."',
            options: [
                { value: '', label: 'Select Action...' },
                { value: 'Character performs a subtle gesture, e.g., glances nervously at a ticking pocket watch', label: 'Subtle Gesture (Nervous Glance)' },
                { value: 'Character performs a subtle gesture, e.g., smiles faintly while observing', label: 'Subtle Gesture (Faint Smile)' },
                { value: 'Object subtly transforms, e.g., a flower slowly blooms', label: 'Object Transformation (Flower Blooms)' },
                { value: 'Object subtly transforms, e.g., smoke gracefully curls and dissipates', label: 'Object Transformation (Smoke Curls)' },
                { value: 'Environmental change, e.g., wind gently picks up leaves, creating a swirl', label: 'Environmental Change (Wind & Leaves)' },
                { value: 'Environmental change, e.g., light shifts dramatically from dawn to day', label: 'Environmental Change (Light Shifts)' },
                { value: 'Dynamic physical action, e.g., running through a bustling market, weaving through crowds', label: 'Dynamic Action (Running)' },
                { value: 'Dynamic physical action, e.g., jumping over an obstacle fluidly, landing softly', label: 'Dynamic Action (Jumping)' },
                { value: 'Character interacts with an object, e.g., picking up an old photograph, examining it closely', label: 'Interaction (Picking up Object)' },
                { value: 'Character interacts with an object, e.g., carefully observing a strange artifact with curiosity', label: 'Interaction (Observing Artifact)' },
                { value: 'Sudden, impactful event, e.g., a distant explosion momentarily lights up the sky', label: 'Sudden Event (Distant Explosion)' },
                { value: 'Sudden, impactful event, e.g., a mysterious figure suddenly appears in the frame, startling the subject', label: 'Sudden Event (Figure Appears)' },
                { value: 'Slow motion walk, rain falling in droplets, dramatic', label: 'Slow Motion Walk (Rain)' },
                { value: 'Fast-paced chase sequence, parkour over rooftops', label: 'Fast-Paced Chase' },
                { value: 'Quiet meditation, subtle breathing, serene stillness', label: 'Quiet Meditation' },
                { value: 'CUSTOM_INPUT', label: 'Custom...' }
            ]
        },
        'Audio': {
            hint: 'Describe sounds, dialogue, and music. E.g., "SFX: Crashing waves, distant seagulls; dialogue: \'I\'m home.\'; haunting cello score."',
            options: [
                { value: '', label: 'Select Audio...' },
                { value: 'Dialogue: "I’m late… again." SFX: rumbling train, distant chatter; light suspenseful piano underscore', label: 'Dialogue & SFX (Nervous)' },
                { value: 'SFX: gentle chirping birds, rustling leaves; peaceful orchestral score', label: 'SFX & Music (Peaceful Nature)' },
                { value: 'SFX: chaotic city sounds, sirens, distant shouts; fast-paced electronic music', label: 'SFX & Music (Chaotic City)' },
                { value: 'Silence, broken only by a single, sharp, metallic clang, echoing', label: 'Silence (Single Clang)' },
                { value: 'Voiceover: "The world had changed..." SFX: eerie wind howls; unsettling ambient drone', label: 'Voiceover & SFX (Eerie)' },
                { value: 'No Dialogue, SFX: crunching footsteps on snow; lone, melancholic violin', label: 'SFX & Music (Melancholic)' },
                { value: 'Uplifting orchestral music swells; SFX: cheering crowd, confetti falling', label: 'Music & SFX (Uplifting)' },
                { value: 'Minimalist ambient soundscape, subtle hum, distant chimes', label: 'Minimalist Ambient' },
                { value: 'Heavy bass drops, pulsating synth, driving techno beat', label: 'Heavy Bass & Synth' },
                { value: 'Soft murmuring voices, background cafe chatter, light jazz', label: 'Cafe Chatter & Jazz' },
                { value: 'CUSTOM_INPUT', label: 'Custom...' }
            ]
        },
        'Style/Genre': {
            hint: 'Define the visual style and overall genre. E.g., "Neo-noir, stylized shadows, gritty realism."',
            options: [
                { value: '', label: 'Select Style & Genre...' },
                { value: 'Neo-noir, dark alleys, rain-slicked streets, cynical mood', label: 'Neo-noir' },
                { value: 'Cyberpunk, vibrant neon, advanced technology, dystopian cityscape', label: 'Cyberpunk' },
                { value: 'Fantasy Epic, lush landscapes, magical creatures, grand scale', label: 'Fantasy Epic' },
                { value: 'Gritty Documentary Style, handheld, natural lighting, raw aesthetic', label: 'Gritty Documentary' },
                { value: 'Dreamlike Surrealism, distorted reality, soft focus, ethereal colors', label: 'Dreamlike Surrealism' },
                { value: 'Vintage 80s Sci-Fi, retrofuturistic, synthwave colors, practical effects feel', label: 'Vintage 80s Sci-Fi' },
                { value: 'Classic Hollywood Glamour, dramatic lighting, rich textures, elegant', label: 'Classic Hollywood Glamour' },
                { value: 'Anime Aesthetic, vibrant colors, dynamic lines, expressive characters', label: 'Anime Aesthetic' },
                { value: 'Minimalist, stark, clean lines, focus on essential forms', label: 'Minimalist' },
                { value: 'Horror, unsettling, jump scares, atmospheric tension', label: 'Horror' },
                { value: 'Comedy, bright, slapstick, exaggerated expressions', label: 'Comedy' },
                { value: 'CUSTOM_INPUT', label: 'Custom...' }
            ]
        },
        'Aspect Ratio/Resolution': {
            hint: 'Specify the video output format. E.g., "21:9 cinematic aspect ratio, 4K resolution."',
            options: [
                { value: '', label: 'Select Aspect Ratio & Resolution...' },
                { value: '16:9 aspect ratio, 1080p resolution', label: '16:9, 1080p' },
                { value: '21:9 cinematic aspect ratio, 4K resolution', label: '21:9 Cinematic, 4K' },
                { value: '4:3 aspect ratio, vintage film grain, 720p resolution', label: '4:3 Vintage, 720p' },
                { value: '9:16 vertical aspect ratio, 1080p resolution, optimized for mobile', label: '9:16 Vertical, 1080p' },
                { value: 'Square 1:1 aspect ratio, 1080p resolution', label: '1:1 Square, 1080p' },
                { value: 'Ultra-wide 32:9 aspect ratio, 8K resolution', label: '32:9 Ultra-wide, 8K' },
                { value: 'CUSTOM_INPUT', label: 'Custom...' }
            ]
        }
    };

    // State to hold the selected value for each prompt category
    const [selectedPromptParts, setSelectedPromptParts] = useState(
        Object.keys(promptOptions).reduce((acc, key) => ({ ...acc, [key]: '' }), {})
    );

    // State to hold the visibility and value of custom input fields
    const [customInputs, setCustomInputs] = useState(
        Object.keys(promptOptions).reduce((acc, key) => ({ ...acc, [key]: { value: '', visible: false } }), {})
    );

    // State for AI-generated refined prompt
    const [aiRefinedPrompt, setAiRefinedPrompt] = useState('');
    // State for loading indicator during AI call
    const [isLoadingAIResponse, setIsLoadingAIResponse] = useState(false);

    // Ref for the textarea to allow copying text
    const generatedPromptRef = useRef(null);

    // Effect to update the generated prompt whenever selectedPromptParts or customInputs change
    const generatedPrompt = Object.keys(promptOptions)
        .map(category => {
            if (selectedPromptParts[category] === 'CUSTOM_INPUT') {
                return customInputs[category].value ? `${category}: ${customInputs[category].value}` : '';
            }
            return selectedPromptParts[category] ? `${category}: ${selectedPromptParts[category]}` : '';
        })
        .filter(Boolean) // Remove empty strings
        .join(' | ');

    // Handler for dropdown changes
    const handleSelectChange = (category, event) => {
        const value = event.target.value;
        setSelectedPromptParts(prev => ({ ...prev, [category]: value }));

        if (value === 'CUSTOM_INPUT') {
            setCustomInputs(prev => ({
                ...prev,
                [category]: { ...prev[category], visible: true }
            }));
            // Focus on the custom input field if it just became visible
            // This is typically handled by React's rendering, but can be forced if needed.
        } else {
            setCustomInputs(prev => ({
                ...prev,
                [category]: { ...prev[category], visible: false, value: '' } // Clear custom input value when not 'Custom'
            }));
        }
        // Clear AI response when prompt changes
        setAiRefinedPrompt('');
    };

    // Handler for custom input changes
    const handleCustomInputChange = (category, event) => {
        const value = event.target.value;
        setCustomInputs(prev => ({
            ...prev,
            [category]: { ...prev[category], value: value }
        }));
        // Clear AI response when prompt changes
        setAiRefinedPrompt('');
    };

    // Function to show a custom alert message
    const alertMessage = (message, type) => {
        // In a real React app, you'd use a dedicated Toast/Snackbar component.
        // For this self-contained example, we'll re-use the simple DOM manipulation.
        const existingAlert = document.getElementById('custom-alert');
        if (existingAlert) existingAlert.remove();

        const alertDiv = document.createElement('div');
        alertDiv.id = 'custom-alert';
        let bgColor = '';
        if (type === 'success') {
            bgColor = 'bg-green-600';
        } else if (type === 'error') {
            bgColor = 'bg-red-600';
        } else { // info
            bgColor = 'bg-blue-600';
        }

        alertDiv.className = `fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl text-white text-sm font-semibold transition-all duration-300 ease-in-out z-50 ${bgColor}`;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.classList.add('opacity-0', 'translate-y-4');
            alertDiv.addEventListener('transitionend', () => alertDiv.remove());
        }, 2500);
    };

    // Copy to Clipboard functionality
    const copyPrompt = (textToCopy) => {
        if (textToCopy) {
            // Create a temporary textarea element to hold the text
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = textToCopy;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea); // Clean up the temporary element
            alertMessage('Prompt copied to clipboard!', 'success');
        } else {
            alertMessage('No prompt to copy yet!', 'error');
        }
    };

    // Reset Form functionality
    const resetForm = () => {
        setSelectedPromptParts(
            Object.keys(promptOptions).reduce((acc, key) => ({ ...acc, [key]: '' }), {})
        );
        setCustomInputs(
            Object.keys(promptOptions).reduce((acc, key) => ({ ...acc, [key]: { value: '', visible: false } }), {})
        );
        setAiRefinedPrompt(''); // Clear AI response on reset
        alertMessage('All selections reset!', 'info');
    };

    // ✨ Gemini API Integration: Refine Prompt with AI
    const refinePromptWithAI = async () => {
        if (!generatedPrompt) {
            alertMessage('Please select some prompt options first!', 'error');
            return;
        }

        setIsLoadingAIResponse(true);
        setAiRefinedPrompt(''); // Clear previous AI response

        const prompt = `Given the following partial video prompt for a text-to-video AI (like Veo 3), expand and refine it to be more detailed, evocative, and visually rich. Suggest specific camera angles, lighting nuances, mood descriptors, or unique actions that would enhance the scene. Do NOT just list categories, but weave them into a coherent and expanded narrative prompt. Focus on generating ONE refined prompt version.

Original prompt: "${generatedPrompt}"

Refined prompt:`;

        let chatHistory = [];
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });

        const payload = { contents: chatHistory };
        const apiKey = process.env.REACT_APP_GEMINI_API_KEY || ""; // If you want to use models other than gemini-2.0-flash, provide an API key here. Otherwise, leave this as-is.
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setAiRefinedPrompt(text);
                alertMessage('AI prompt refined!', 'success');
            } else {
                console.error("Gemini API returned an unexpected structure:", result);
                alertMessage('Failed to refine prompt: Unexpected AI response.', 'error');
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            alertMessage('Failed to refine prompt: Network or API error.', 'error');
        } finally {
            setIsLoadingAIResponse(false);
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-center p-4 selection:bg-cyan-600 selection:text-white">
            {/* Global Styles for Animated Background */}
            <style>
                {`
                body {
                    background: linear-gradient(270deg, #0d1a26, #1c3c4e, #132d3d, #2f526b);
                    background-size: 800% 800%;
                    animation: gradient-animation 15s ease infinite;
                }

                @keyframes gradient-animation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* Required for Safari/old WebKit browsers */
                @-webkit-keyframes gradient-animation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* Styling for dropdowns with custom arrow */
                select {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.75rem center;
                    background-size: 1.5em;
                    padding-right: 2.5rem;
                }

                /* Tooltip styling */
                .tooltip-container {
                    position: relative;
                    display: inline-block;
                }

                .tooltip-text {
                    visibility: hidden;
                    width: 240px;
                    background-color: #334155;
                    color: #e2e8f0;
                    text-align: center;
                    border-radius: 6px;
                    padding: 8px 10px;
                    position: absolute;
                    z-index: 10;
                    bottom: 125%;
                    left: 50%;
                    margin-left: -120px;
                    opacity: 0;
                    transition: opacity 0.3s, transform 0.3s;
                    transform: translateY(10px);
                    font-size: 0.75rem;
                }

                .tooltip-container:hover .tooltip-text {
                    visibility: visible;
                    opacity: 1;
                    transform: translateY(0);
                }

                .tooltip-text::after {
                    content: "";
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    margin-left: -5px;
                    border-width: 5px;
                    border-style: solid;
                    border-color: #334155 transparent transparent transparent;
                }
                `}
            </style>

            <div className="container mx-auto p-8 bg-white/5 shadow-2xl rounded-2xl max-w-4xl border border-white/20 backdrop-blur-lg transform transition-all duration-300 hover:shadow-cyan-500/30">
                {/* Logo Placeholder */}
                <div className="flex justify-center mb-8">
                    <img src="promptomato-logo.png" alt="Promptomato Logo" className="h-16 w-auto" />
                </div>

                <h1 className="text-4xl lg:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500 mb-8 drop-shadow-lg">
                    Veo 3 Prompt Constructor
                </h1>

                <p className="text-center text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto text-lg">
                    Craft world-class video prompts for Veo 3 by selecting from cinematic best practices or entering custom details. Unleash your creative vision.
                </p>

                <div id="prompt-sections" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {Object.entries(promptOptions).map(([category, data]) => (
                        <div key={category} className="flex flex-col relative">
                            <div className="flex items-center mb-2">
                                <label htmlFor={category.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')} className="text-slate-200 font-semibold mr-2 text-lg">
                                    {category}:
                                </label>
                                <span className="tooltip-container cursor-help">
                                    <svg className="w-5 h-5 text-emerald-300 hover:text-emerald-500 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                    <span className="tooltip-text">{data.hint}</span>
                                </span>
                            </div>

                            <select
                                id={category.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}
                                className="bg-slate-900/40 border border-slate-600/60 text-slate-100 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none shadow-md transition-all duration-200"
                                value={selectedPromptParts[category]}
                                onChange={(e) => handleSelectChange(category, e)}
                            >
                                {data.options.map(optionData => (
                                    <option key={optionData.value} value={optionData.value}>
                                        {optionData.label}
                                    </option>
                                ))}
                            </select>

                            {customInputs[category]?.visible && (
                                <input
                                    type="text"
                                    placeholder={`Enter custom ${category.toLowerCase()}...`}
                                    className="mt-3 p-3 rounded-lg bg-slate-900/40 border border-slate-600/60 text-slate-100 focus:ring-2 focus:ring-cyan-500 outline-none shadow-md transition-all duration-200 placeholder-slate-400"
                                    value={customInputs[category].value}
                                    onChange={(e) => handleCustomInputChange(category, e)}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-white/5 p-6 rounded-xl mb-8 border border-white/20 shadow-inner backdrop-blur-md">
                    <h2 className="text-xl font-semibold text-slate-200 mb-4">Generated Prompt:</h2>
                    <textarea
                        ref={generatedPromptRef}
                        readOnly
                        className="w-full h-48 p-4 rounded-lg bg-slate-900/50 text-slate-100 border border-slate-700 focus:ring-2 focus:ring-cyan-500 outline-none resize-none text-base leading-relaxed placeholder-slate-400 shadow-md"
                        value={generatedPrompt}
                        placeholder="Your crafted prompt will appear here..."
                    ></textarea>
                </div>

                {/* AI Refined Prompt Section */}
                {aiRefinedPrompt && (
                    <div className="bg-white/5 p-6 rounded-xl mt-8 mb-8 border border-white/20 shadow-inner backdrop-blur-md">
                        <h2 className="text-xl font-semibold text-slate-200 mb-4 flex items-center">
                            ✨ AI Refined Prompt:
                            <button
                                className="ml-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
                                onClick={() => copyPrompt(aiRefinedPrompt)}
                            >
                                Copy AI Prompt
                            </button>
                        </h2>
                        <textarea
                            readOnly
                            className="w-full h-48 p-4 rounded-lg bg-slate-900/50 text-slate-100 border border-slate-700 outline-none resize-none text-base leading-relaxed placeholder-slate-400 shadow-md"
                            value={aiRefinedPrompt}
                            placeholder="AI refined prompt will appear here..."
                        ></textarea>
                    </div>
                )}


                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button
                        id="refinePromptBtn"
                        className={`px-10 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold rounded-xl shadow-xl hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900 text-lg tracking-wide
                            ${isLoadingAIResponse ? 'opacity-70 cursor-not-allowed' : ''}`}
                        onClick={refinePromptWithAI}
                        disabled={isLoadingAIResponse}
                    >
                        {isLoadingAIResponse ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Refining...
                            </span>
                        ) : (
                            '✨ Refine Prompt with AI'
                        )}
                    </button>
                    <button
                        id="copyPrompt"
                        className="px-10 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-bold rounded-xl shadow-xl hover:from-cyan-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 text-lg tracking-wide"
                        onClick={() => copyPrompt(generatedPrompt)}
                    >
                        Copy Current Prompt
                    </button>
                    <button
                        id="resetForm"
                        className="px-10 py-4 bg-slate-700 text-white font-bold rounded-xl shadow-xl hover:bg-slate-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 text-lg tracking-wide"
                        onClick={resetForm}
                    >
                        Reset All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
