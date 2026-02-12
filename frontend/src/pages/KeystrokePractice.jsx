import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import VirtualKeyboard from '../components/VirtualKeyboard';

const PRACTICE_TEXTS = {
    beginner: {
        short: "aaa sss ddd fff jjj kkk lll ;;; asd asd jkl jkl",
        medium: "aaa sss ddd fff jjj kkk lll ;;; asd asd jkl jkl asdf asdf jkl; jkl; fff jjj ddd kkk sss lll aaa ;;; home row keys practice",
        long: "aaa sss ddd fff jjj kkk lll ;;; asd asd jkl jkl asdf asdf jkl; jkl; fff jjj ddd kkk sss lll aaa ;;; home row keys practice for building muscle memory and finger strength foundation base typing skills daily practice essential",
        extraLong: "aaa sss ddd fff jjj kkk lll ;;; asd asd jkl jkl asdf asdf jkl; jkl; fff jjj ddd kkk sss lll aaa ;;; home row keys practice for building muscle memory and finger strength foundation base typing skills daily practice essential asdf jkl; asdf jkl; repeated practice builds speed accuracy comfort confidence foundation fundamental basics beginner level progression systematic approach structured learning method"
    },
    intermediate: {
        short: "the quick brown fox jumps over the lazy dog",
        medium: "the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs how vexingly quick daft zebras jump sphinx of black quartz judge my vow",
        long: "the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs how vexingly quick daft zebras jump sphinx of black quartz judge my vow crazy fredrick bought many very exquisite opal jewels amazingly few discotheques provide jukeboxes practice typing complete sentences with proper punctuation and capitalization",
        extraLong: "the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs how vexingly quick daft zebras jump sphinx of black quartz judge my vow crazy fredrick bought many very exquisite opal jewels amazingly few discotheques provide jukeboxes practice typing complete sentences with proper punctuation and capitalization throughout your daily practice sessions improving speed while maintaining high accuracy levels consistently working toward professional typing competency building confidence keyboard mastery"
    },
    advanced: {
        short: "function calculateSum(a, b) { return a + b; }",
        medium: "function calculateSum(a, b) { return a + b; } const array = [1, 2, 3, 4, 5]; let result = array.map(x => x * 2); console.log(result);",
        long: "function calculateSum(a, b) { return a + b; } const array = [1, 2, 3, 4, 5]; let result = array.map(x => x * 2); console.log(result); class User { constructor(name, email) { this.name = name; this.email = email; } greet() { return `Hello, ${this.name}!`; } } Programming requires practice with special characters: @, #, $, %, ^, &, *, !, ?, /, \\, |, ~, `, ', \"",
        extraLong: "function calculateSum(a, b) { return a + b; } const array = [1, 2, 3, 4, 5]; let result = array.map(x => x * 2); console.log(result); class User { constructor(name, email) { this.name = name; this.email = email; } greet() { return `Hello, ${this.name}!`; } validateEmail() { const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/; return regex.test(this.email); } } Programming requires practice with special characters: @, #, $, %, ^, &, *, !, ?, /, \\, |, ~, `, ', \" and understanding syntax including parentheses (), brackets [], braces {}, comparison operators (==, !=, <=, >=), logical operators (&&, ||, !), and arithmetic operators (+, -, *, /, %, **) used throughout various programming languages coding development software engineering"
    }
};

function KeystrokePractice() {
    const [timeLeft, setTimeLeft] = useState(60);
    const [testDuration, setTestDuration] = useState(60);
    const [isActive, setIsActive] = useState(false);
    const [text, setText] = useState('');
    const [level, setLevel] = useState('beginner');
    const [sampleText, setSampleText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showSubmit, setShowSubmit] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [results, setResults] = useState(null);
    const { colors } = useTheme();
    const [isCustomMode, setIsCustomMode] = useState(false);
    const [customText, setCustomText] = useState('');
    const [isUsingCustomText, setIsUsingCustomText] = useState(false);

    // Load text for the given duration and level
    const loadTextForDuration = (duration, practiceLevel) => {
        let textLength;

        if (duration <= 60) {
            textLength = 'short';
        } else if (duration <= 180) {
            textLength = 'medium';
        } else if (duration <= 300) {
            textLength = 'long';
        } else {
            textLength = 'extraLong';
        }

        const baseText = PRACTICE_TEXTS[practiceLevel][textLength];
        const words = baseText.split(' ');

        // Fisher-Yates shuffle
        for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [words[i], words[j]] = [words[j], words[i]];
        }

        const newText = words.join(' ');
        setSampleText(newText);
    };

    // Initial load
    useEffect(() => {
        const savedCustom = localStorage.getItem("customPracticeText");

        if (savedCustom) {
            setSampleText(savedCustom);
            setIsUsingCustomText(true);
        } else {
            loadTextForDuration(testDuration, level);
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

    const calculateResults = () => {
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

        setResults({ wpm, accuracy, errors });
    };

    const handleReset = () => {
        setTimeLeft(testDuration);
        setIsActive(false);
        setText('');
        setCurrentIndex(0);
        setShowSubmit(false);
        setIsFinished(false);
        setResults(null);

        if (isUsingCustomText) {
            const savedCustom = localStorage.getItem("customPracticeText");
            if (savedCustom) {
                setSampleText(savedCustom);
            }
        } else {
            // Force new shuffle every reset
            loadTextForDuration(testDuration, level);
        }
    };

    const handleDurationChange = (duration) => {
        const newDuration = Number(duration);
        setTestDuration(newDuration);
        setTimeLeft(newDuration);
        setIsActive(false);
        setText('');
        setCurrentIndex(0);
        setShowSubmit(false);
        setIsFinished(false);
        setResults(null);

        if (!isUsingCustomText) {
            loadTextForDuration(newDuration, level);
        }
    };

    const handleLevelChange = (newLevel) => {
        setIsUsingCustomText(false);
        setLevel(newLevel);
        setTimeLeft(testDuration);
        setIsActive(false);
        setText('');
        setCurrentIndex(0);
        setShowSubmit(false);
        setIsFinished(false);
        setResults(null);
        loadTextForDuration(testDuration, newLevel);
    };

    const handleCustomTextSubmit = () => {
        if (customText.trim().length > 0) {
            localStorage.setItem("customPracticeText", customText);
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
        localStorage.removeItem("customPracticeText");
        setIsUsingCustomText(false);
        setCustomText('');
        setIsCustomMode(false);
        loadTextForDuration(testDuration, level);
        handleReset();
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
                {/* Header */}
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
                            <div className="relative">
                                <select
                                    value={level}
                                    onChange={(e) => handleLevelChange(e.target.value)}
                                    disabled={isActive || isUsingCustomText}
                                    className="px-4 py-2 rounded-lg font-medium cursor-pointer border"
                                    style={{
                                        backgroundColor: colors.card,
                                        color: colors.text,
                                        borderColor: colors.border,
                                        opacity: isUsingCustomText ? 0.5 : 1,
                                        cursor: isUsingCustomText ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
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

                {isCustomMode && (
                    <div
                        className="glass-card rounded-lg p-6 mb-6 shadow-xl"
                        style={{ backgroundColor: colors.card, borderColor: colors.border }}
                    >
                        <h3 className="text-xl font-bold mb-4" style={{ color: colors.text }}>
                            Custom Practice Text
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
                                Start Custom Practice
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
                                        Submit Practice
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
                            Practice Results
                        </h2>
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
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default KeystrokePractice;