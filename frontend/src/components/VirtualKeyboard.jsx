import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function VirtualKeyboard({ activeKey }) {
    const { colors } = useTheme();

    const keyboardLayout = [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
        ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Fn', 'Menu', 'Ctrl'],
    ];

    const getKeyWidth = (key) => {
        if (key === 'Backspace') return 'w-20';
        if (key === 'Tab') return 'w-16';
        if (key === 'Caps') return 'w-20';
        if (key === 'Enter') return 'w-20';
        if (key === 'Shift') return 'w-24';
        if (key === 'Space') return 'flex-1';
        if (['Ctrl', 'Win', 'Alt', 'Fn', 'Menu'].includes(key)) return 'w-16';
        return 'w-12';
    };

    const isActive = (key) => {
        if (!activeKey) return false;

        // Handle space
        if (activeKey === ' ' && key === 'Space') return true;

        // Handle regular keys (case insensitive)
        return key.toLowerCase() === activeKey.toLowerCase();
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="space-y-2">
                {keyboardLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-1">
                        {row.map((key, keyIndex) => (
                            <div
                                key={keyIndex}
                                className={`${getKeyWidth(key)} h-12 rounded flex items-center justify-center text-sm font-medium border shadow-sm ${isActive(key) ? 'key-glow' : ''
                                    }`}
                                style={{
                                    backgroundColor: isActive(key) ? colors.primary : colors.card,
                                    color: isActive(key) ? '#ffffff' : colors.text,
                                    borderColor: isActive(key) ? colors.primary : colors.border,
                                    boxShadow: isActive(key) ? `0 0 20px ${colors.primary}` : '',
                                }}
                            >
                                {key === 'Space' ? '' : key.toUpperCase()}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VirtualKeyboard;