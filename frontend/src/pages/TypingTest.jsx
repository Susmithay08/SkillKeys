import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTypingSession } from '../api';
import { useTheme } from '../contexts/ThemeContext';
import VirtualKeyboard from '../components/VirtualKeyboard';

const SAMPLE_TEXTS = {
    short: [
        "During the quiet early morning hours, Maya carefully organized the project files across her desk, reviewed every note line by line, and adjusted the schedule before the meeting began. She knew that missing even one small detail could delay the entire team's progress and create confusion later in the day, so she focused deeply while the office remained silent.",

        "Heavy rain fell steadily against the office windows as commuters hurried across crowded streets holding umbrellas tightly. Cars moved slowly through traffic while reflections of bright lights shimmered across the wet pavement, creating a blurry glow that filled the city with movement even on a gloomy morning.",

        "Improving typing speed requires more than rushing through words quickly. It involves building accuracy, maintaining steady rhythm, and practicing consistently each day. Over time, fingers develop muscle memory, mistakes decrease, and confidence grows naturally with every focused practice session."
    ],

    medium: [
        "Early in the afternoon, the school staff gathered inside the large auditorium to prepare for the annual science exhibition. Long tables were arranged neatly in rows, colorful posters were placed carefully on the walls, and students gently set up their projects with excitement. Parents soon arrived asking thoughtful questions, while teachers proudly explained each experiment in detail. From simple plant growth studies to complex robotic demonstrations, the room buzzed with learning and curiosity. Visitors moved slowly from display to display, taking photos and encouraging the students' creativity. By the end of the event, everyone felt inspired by the effort and imagination that filled the hall.",

        "On a bright Saturday morning, neighbors from every street worked together to clean and restore the local park. Some trimmed overgrown bushes along the walking paths, others collected trash near benches and playgrounds, and children painted old wooden seats with fresh colors. Laughter filled the air as people shared stories while working side by side. After several hours of teamwork, the park looked completely transformed, with clean grass, colorful benches, and clear walking paths. Families gathered to admire the improvements, proud of what cooperation had accomplished.",

        "Typing improvement is not about rushing through words quickly but about maintaining accuracy while gradually increasing speed. Daily practice strengthens finger coordination and builds strong muscle memory. Over time, mistakes become rare, confidence increases, and typing begins to feel natural rather than forced. Setting small goals, tracking progress, and staying consistent helps learners develop long-term skills. With patience and focus, anyone can improve their typing performance significantly."
    ],

    long: [
        "As the sun slowly rose over the quiet town, shop owners unlocked their doors and began arranging colorful displays in their windows. Fresh bread was stacked neatly on shelves, flowers were watered along the sidewalks, and delivery trucks unloaded new supplies for the day. People filled the streets on their way to work and school, stopping for coffee or quick conversations with familiar faces. The town felt alive with movement, routine, and a comforting sense of community that marked the beginning of another busy morning.\n\nLater in the day, markets grew crowded as shoppers searched for fresh produce, baked goods, and handmade items. Street performers played music near busy corners while children watched with excitement. The sound of laughter mixed with footsteps and conversations, creating a lively atmosphere. Even as evening approached, the town remained active, proving how daily life connected everyone through shared spaces and simple moments.",

        "The company's yearly training conference focused on improving communication, productivity, and teamwork across all departments. Employees openly shared challenges they had faced during projects and discussed practical solutions together. Workshops taught time management techniques, collaboration strategies, and problem-solving methods that could be applied immediately in daily work.\n\nManagers encouraged honest feedback rather than blame, reminding everyone that mistakes were part of growth. By the end of the sessions, clear goals were set for the coming months, and motivation across teams felt stronger than before. People left the conference feeling confident, supported, and ready to perform better in their roles.",

        "Learning to type efficiently is similar to learning to play a musical instrument. At first, movements feel slow and awkward, and fingers must consciously search for each key. With consistent practice, rhythm begins to develop naturally, and muscle memory strengthens with every session.\n\nOver time, fingers start finding keys automatically, allowing ideas to flow without interruption. Speed increases while accuracy remains strong, turning typing into a powerful everyday skill. With patience and dedication, typing becomes effortless and supports productivity in school, work, and creative tasks."
    ],

    veryLong: [
        "The town's annual spring festival was held in the wide green park near the river, drawing families from nearby neighborhoods and visitors from surrounding towns. Booths lined the walking paths, selling handmade crafts, warm meals, fresh fruit, and colorful decorations. Children laughed as they moved between games, while musicians performed cheerful songs near the main stage. Volunteers guided crowds, answered questions, and ensured everything ran smoothly throughout the day.\n\nAs the afternoon continued, more visitors arrived, filling picnic areas and open spaces with blankets and chairs. Performers took turns on stage, including dancers, singers, and local bands who played a variety of music styles. Food aromas drifted through the park as grills sizzled and fresh desserts were served. Families gathered together to eat, talk, and enjoy the warm weather.\n\nWhen the sun began to set, soft lights glowed across the park, reflecting on the river and creating a peaceful evening atmosphere. People slowed their pace, watching the sky change colors and listening to calmer music. Friends shared stories, children grew tired but happy, and everyone appreciated the sense of community that the festival created before heading home.",

        "Throughout the busy workweek, the office remained filled with constant movement and communication. Designers revised layouts, developers fixed software issues, marketing teams reviewed campaign data, and managers tracked deadlines carefully. Meetings were held frequently to ensure projects stayed on schedule and obstacles were addressed quickly.\n\nWhen challenges appeared, teams collaborated to find practical solutions rather than placing blame. Ideas were shared openly, improvements were tested immediately, and progress continued steadily. The workplace atmosphere remained supportive and focused.\n\nBy Friday afternoon, major goals were achieved and deadlines were met. A strong sense of accomplishment spread across the office as coworkers celebrated small wins together. The week ended with everyone feeling motivated and confident about the work ahead."
    ],

    marathon: [
        "The annual community celebration filled the park with laughter, music, and colorful decorations from early morning until late evening. Families arrived carrying picnic baskets, folding chairs, and blankets while vendors prepared fresh food and handmade crafts along the walking paths. Children ran between game stations as performers practiced on the main stage. Volunteers guided visitors, answered questions, and helped organize activities, creating an atmosphere of excitement that spread across the entire park.\n\nAs the afternoon continued, the park grew more crowded. Long lines formed at food stalls serving grilled sandwiches, roasted corn, fresh lemonade, and warm desserts. Musicians played upbeat songs that encouraged people to dance, while artists displayed paintings and handmade jewelry beneath shaded tents. Friends reunited, neighbors shared stories, and laughter echoed through the open spaces. The celebration became a gathering point for people of all ages.\n\nWhen the sun began to lower in the sky, soft lights were turned on across the park, reflecting beautifully on the nearby river. The air cooled slightly, and families settled onto blankets to relax and enjoy calmer performances. Children grew tired but remained excited, watching dancers and listening to slow music as the evening approached. Conversations became quieter and more meaningful as people enjoyed the peaceful moment together.\n\nLater in the evening, the final performances began on the main stage, drawing large crowds. The band played popular songs that everyone recognized, and many people sang along happily. Volunteers prepared the area for fireworks while visitors found good viewing spots along the riverbank. When the sky darkened, brilliant colors burst overhead, lighting up faces with joy and amazement. Cheers followed each display as memories were created that would last for years.\n\nBeyond community events, mastering typing follows a similar journey of patience, practice, and growth. At first, progress may feel slow and challenging, but consistent daily effort builds coordination and confidence. Accuracy should always be the main focus, because speed naturally improves with experience. Over time, fingers begin to move automatically without conscious thought, allowing ideas to flow smoothly onto the screen.\n\nSetting goals, tracking performance, and practicing regularly leads to steady improvement. Some days will feel easier than others, but persistence is what brings long-term success. With dedication, typing becomes an effortless skill that supports productivity in school, professional work, and creative projects. Just like the community celebration brings people together year after year, consistent typing practice builds strong habits that last a lifetime."
    ]
};

function TypingTest() {
    const [timeLeft, setTimeLeft] = useState(60);
    const [testDuration, setTestDuration] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [text, setText] = useState('');
    const [sampleText, setSampleText] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const [results, setResults] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showSubmit, setShowSubmit] = useState(false);
    const [isCustomMode, setIsCustomMode] = useState(false);
    const [customText, setCustomText] = useState('');
    const [isUsingCustomText, setIsUsingCustomText] = useState(false);
    const isGuest = localStorage.getItem('guestMode') === 'true';
    const navigate = useNavigate();
    const { colors } = useTheme();

    // Load text for the given duration
    const loadTextForDuration = (duration) => {
        let textArray;

        if (duration === 60) textArray = SAMPLE_TEXTS.short;
        else if (duration === 180) textArray = SAMPLE_TEXTS.medium;
        else if (duration === 300) textArray = SAMPLE_TEXTS.long;
        else if (duration === 480) textArray = SAMPLE_TEXTS.veryLong;
        else if (duration === 600) textArray = SAMPLE_TEXTS.marathon;

        const randomText = textArray[Math.floor(Math.random() * textArray.length)];
        setSampleText(randomText);
    };

    // Initial load
    useEffect(() => {
        const savedCustom = localStorage.getItem("customTestText");

        if (savedCustom) {
            setSampleText(savedCustom);
            setIsUsingCustomText(true);
        } else {
            loadTextForDuration(testDuration);
        }
    }, []);

    // Timer effect
    useEffect(() => {
        let interval = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            setIsFinished(true);
            calculateResults();
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Check if all text is typed
    useEffect(() => {
        if (text.length > 0 && text.length === sampleText.length) {
            setShowSubmit(true);
        } else {
            setShowSubmit(false);
        }
    }, [text, sampleText]);

    const handleStart = () => {
        setIsActive(true);
    };

    const handleKeyPress = (e) => {
        // Don't handle keypresses if custom mode modal is open
        if (isCustomMode) return;

        if (!isActive && e.key.length === 1) {
            handleStart();
        }

        if (e.key.length === 1 || e.key === 'Backspace') {
            if (e.key === 'Backspace') {
                setText((prev) => prev.slice(0, -1));
                setCurrentIndex((prev) => Math.max(0, prev - 1));
            } else if (currentIndex < sampleText.length) {
                setText((prev) => prev + e.key);
                setCurrentIndex((prev) => prev + 1);
            }
        }
    };

    const handleSubmit = () => {
        setIsActive(false);
        setIsFinished(true);
        calculateResults();
    };

    const calculateResults = async () => {
        const timeElapsed = testDuration - timeLeft;
        const typedWords = text.trim().split(/\s+/).length;
        const wpm = timeElapsed > 0 ? Math.round((typedWords / timeElapsed) * 60) : 0;

        const sampleChars = sampleText.slice(0, text.length).split('');
        const typedChars = text.split('');

        let correctChars = 0;
        let errors = 0;

        sampleChars.forEach((char, index) => {
            if (typedChars[index] === char) {
                correctChars++;
            } else {
                errors++;
            }
        });

        const accuracy = sampleChars.length > 0
            ? Math.round((correctChars / sampleChars.length) * 100)
            : 0;

        const resultData = {
            wpm,
            accuracy,
            errors,
        };

        setResults(resultData);

        if (!isGuest) {
            try {
                await createTypingSession(resultData);
            } catch (error) {
                console.error('Failed to save session:', error);
            }
        }
    };

    const handleReset = () => {
        setTimeLeft(testDuration);
        setIsActive(false);
        setText('');
        setIsFinished(false);
        setResults(null);
        setCurrentIndex(0);
        setShowSubmit(false);

        if (isUsingCustomText) {
            const savedCustom = localStorage.getItem("customTestText");
            if (savedCustom) {
                setSampleText(savedCustom);
            }
        } else {
            loadTextForDuration(testDuration);
        }
    };

    const handleDurationChange = (duration) => {
        const newDuration = Number(duration);
        setTestDuration(newDuration);
        setTimeLeft(newDuration);
        setIsActive(false);
        setText('');
        setIsFinished(false);
        setResults(null);
        setCurrentIndex(0);
        setShowSubmit(false);

        if (!isUsingCustomText) {
            loadTextForDuration(newDuration);
        }
    };

    const handleCustomTextSubmit = () => {
        if (customText.trim().length > 0) {
            localStorage.setItem("customTestText", customText);
            setIsUsingCustomText(true);
            setSampleText(customText);
            setTimeLeft(testDuration);
            setIsActive(false);
            setText('');
            setCurrentIndex(0);
            setShowSubmit(false);
            setIsFinished(false);
            setResults(null);
            setIsCustomMode(false);
        }
    };

    const handleClearCustomText = () => {
        localStorage.removeItem("customTestText");
        setIsUsingCustomText(false);
        setCustomText('');
        setIsCustomMode(false);
        setTimeLeft(testDuration);
        setIsActive(false);
        setText('');
        setCurrentIndex(0);
        setShowSubmit(false);
        setIsFinished(false);
        setResults(null);
        loadTextForDuration(testDuration);
    };

    const getCharStyle = (index) => {
        if (index < text.length) {
            if (text[index] === sampleText[index]) {
                return { color: colors.text, opacity: 1 };
            } else {
                return { color: colors.error, opacity: 1 };
            }
        } else if (index === currentIndex) {
            return {
                color: colors.textSecondary,
                opacity: 0.6,
                backgroundColor: `${colors.primary}30`,
                padding: '2px 4px',
                borderRadius: '2px'
            };
        } else {
            return { color: colors.textSecondary, opacity: 0.4 };
        }
    };

    const getActiveKey = () => {
        if (currentIndex < sampleText.length) {
            return sampleText[currentIndex];
        }
        return '';
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div
            className="min-h-screen py-8 px-4"
            style={{ backgroundColor: colors.bg }}
            onKeyDown={handleKeyPress}
            tabIndex={0}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header with Timer and Options */}
                <div
                    className="glass-card rounded-lg p-6 mb-6 shadow-xl"
                    style={{ backgroundColor: colors.card, borderColor: colors.border }}
                >
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="text-5xl font-bold" style={{ color: colors.primary }}>
                                {formatTime(timeLeft)}
                            </div>
                            <p className="text-sm text-gray-400 mt-1" style={{ color: colors.textSecondary }}>
                                Type anything to start
                            </p>

                            <div className="relative">
                                <select
                                    value={testDuration}
                                    onChange={(e) => handleDurationChange(e.target.value)}
                                    disabled={isActive}
                                    className="px-4 py-2 rounded-lg font-medium cursor-pointer border"
                                    style={{
                                        backgroundColor: colors.card,
                                        color: colors.text,
                                        borderColor: colors.border,
                                    }}
                                >
                                    <option value={60}>1 Minute Test</option>
                                    <option value={180}>3 Minute Test</option>
                                    <option value={300}>5 Minute Test</option>
                                    <option value={480}>8 Minute Test</option>
                                    <option value={600}>10 Minute Test</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleReset}
                                className="px-6 py-2 rounded-lg font-medium border"
                                style={{
                                    backgroundColor: colors.card,
                                    color: colors.text,
                                    borderColor: colors.border,
                                }}
                            >
                                Reset
                            </button>
                            <button
                                onClick={() => {
                                    setIsCustomMode(true);
                                    // Reset test state when opening custom mode
                                    setIsActive(false);
                                    setText('');
                                    setCurrentIndex(0);
                                    setShowSubmit(false);
                                }}
                                className="px-6 py-2 rounded-lg font-medium text-white"
                                style={{ backgroundColor: colors.secondary }}
                            >
                                Custom
                            </button>
                            {isUsingCustomText && (
                                <button
                                    onClick={handleClearCustomText}
                                    className="px-6 py-2 rounded-lg font-medium border"
                                    style={{
                                        backgroundColor: colors.error,
                                        color: 'white',
                                        borderColor: colors.error,
                                    }}
                                >
                                    Clear Custom
                                </button>
                            )}
                        </div>
                    </div>
                    {isUsingCustomText && (
                        <div className="mt-4">
                            <p className="text-sm" style={{ color: colors.primary }}>
                                ✓ Using custom text
                            </p>
                        </div>
                    )}
                </div>

                {/* Custom Text Modal */}
                {isCustomMode && (
                    <div
                        className="glass-card rounded-lg p-6 mb-6 shadow-xl"
                        style={{ backgroundColor: colors.card, borderColor: colors.border }}
                    >
                        <h3 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
                            Custom Test Text
                        </h3>
                        <textarea
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            placeholder="Paste your custom text here..."
                            className="w-full p-4 rounded-md border"
                            rows={6}
                            style={{
                                backgroundColor: colors.bg,
                                color: colors.text,
                                borderColor: colors.border,
                            }}
                        />

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={handleCustomTextSubmit}
                                className="px-6 py-2 rounded-lg text-white"
                                style={{ backgroundColor: colors.primary }}
                                disabled={customText.trim().length === 0}
                            >
                                Start Custom Test
                            </button>
                            <button
                                onClick={() => {
                                    setIsCustomMode(false);
                                    setCustomText('');
                                }}
                                className="px-6 py-2 rounded-lg border"
                                style={{
                                    backgroundColor: colors.card,
                                    color: colors.text,
                                    borderColor: colors.border,
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {!isFinished ? (
                    <>
                        {/* Typing Area */}
                        <div
                            className="glass-card rounded-lg p-8 mb-6 shadow-xl"
                            style={{ backgroundColor: colors.card, borderColor: colors.border }}
                        >
                            <div className="mb-6 text-2xl leading-relaxed" style={{ fontFamily: 'monospace', wordWrap: 'break-word', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                                {sampleText.split('').map((char, index) => (
                                    <span
                                        key={index}
                                        style={getCharStyle(index)}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </div>

                            {showSubmit && (
                                <div className="text-center mt-6">
                                    <button
                                        onClick={handleSubmit}
                                        className="px-8 py-3 rounded-lg font-medium text-white text-lg"
                                        style={{ backgroundColor: colors.success }}
                                    >
                                        Submit Test
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Virtual Keyboard */}
                        <div
                            className="glass-card rounded-lg p-6 shadow-xl"
                            style={{ backgroundColor: colors.card, borderColor: colors.border }}
                        >
                            <VirtualKeyboard activeKey={getActiveKey()} />
                        </div>
                    </>
                ) : (
                    <div
                        className="glass-card rounded-lg p-8 shadow-xl text-center"
                        style={{ backgroundColor: colors.card, borderColor: colors.border }}
                    >
                        <h2 className="text-3xl font-bold mb-8" style={{ color: colors.text }}>
                            Test Results
                        </h2>
                        {isGuest && (
                            <div
                                className="mb-6 px-4 py-3 rounded border"
                                style={{
                                    backgroundColor: `${colors.secondary}20`,
                                    borderColor: colors.secondary,
                                    color: colors.text
                                }}
                            >
                                <p className="font-medium">Guest Mode - Results not saved</p>
                                <p className="text-sm mt-1">Create an account to track your progress!</p>
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <div
                                className="glass-card p-6 rounded-lg"
                                style={{
                                    backgroundColor: `${colors.primary}20`,
                                    borderColor: colors.primary,
                                    border: '1px solid'
                                }}
                            >
                                <p className="mb-2" style={{ color: colors.textSecondary }}>WPM</p>
                                <p className="text-5xl font-bold" style={{ color: colors.primary }}>
                                    {results?.wpm}
                                </p>
                            </div>
                            <div
                                className="glass-card p-6 rounded-lg"
                                style={{
                                    backgroundColor: `${colors.success}20`,
                                    borderColor: colors.success,
                                    border: '1px solid'
                                }}
                            >
                                <p className="mb-2" style={{ color: colors.textSecondary }}>Accuracy</p>
                                <p className="text-5xl font-bold" style={{ color: colors.success }}>
                                    {results?.accuracy}%
                                </p>
                            </div>
                            <div
                                className="glass-card p-6 rounded-lg"
                                style={{
                                    backgroundColor: `${colors.error}20`,
                                    borderColor: colors.error,
                                    border: '1px solid'
                                }}
                            >
                                <p className="mb-2" style={{ color: colors.textSecondary }}>Errors</p>
                                <p className="text-5xl font-bold" style={{ color: colors.error }}>
                                    {results?.errors}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleReset}
                                className="px-8 py-3 rounded-lg font-medium text-white"
                                style={{ backgroundColor: colors.primary }}
                            >
                                Try Again
                            </button>
                            {!isGuest && (
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="px-8 py-3 rounded-lg font-medium text-white"
                                    style={{ backgroundColor: colors.success }}
                                >
                                    View Dashboard
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TypingTest;