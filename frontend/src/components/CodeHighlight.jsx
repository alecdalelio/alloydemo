/**
 * CodeHighlight Component
 * 
 * A simple and reliable code display component for technical presentations.
 * 
 * @author Alec Dalelio
 * @version 6.0.0
 * @since 2024-01-01
 * 
 * @component
 * @param {string} code - The code string to display
 * @param {string} language - The programming language
 * @param {Object} props - Additional props
 */

import React, { useState } from 'react';

const CodeHighlight = ({ code, language = 'javascript', ...props }) => {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Simple syntax highlighting without complex HTML manipulation
  const highlightCode = (code, lang) => {
    if (lang !== 'javascript' && lang !== 'jsx') {
      return code;
    }

    try {
      // Simple keyword highlighting only
      return code
        .replace(/\b(const|let|var|function|return|if|else|switch|case|default|for|while|do|break|continue|try|catch|finally|throw|new|delete|typeof|instanceof|void|this|super|class|extends|import|export|from|as|default|null|undefined|true|false|NaN|Infinity)\b/g, '<span class="keyword">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
        .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(')
        .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="number">$1</span>');
    } catch (error) {
      console.error('Syntax highlighting failed:', error);
      return code;
    }
  };

  const highlightedCode = highlightCode(code, language);

  const codeBlock = (
    <div className="code-highlight-container" {...props}>
      <div className="code-header">
        <div className="code-language">{language.toUpperCase()}</div>
        <div className="code-actions">
          <button 
            className="code-action-btn" 
            title="Expand Code"
            onClick={toggleFullscreen}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </button>
          <button 
            className="code-action-btn" 
            title={copied ? "Copied!" : "Copy Code"}
            onClick={handleCopy}
          >
            {copied ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
      <pre className="code-content">
        <code 
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="code-fullscreen-overlay" onClick={toggleFullscreen}>
        <div className="code-fullscreen-modal" onClick={(e) => e.stopPropagation()}>
          <div className="code-fullscreen-header">
            <div className="code-fullscreen-language">{language.toUpperCase()}</div>
            <div className="code-fullscreen-actions">
              <button 
                className="code-action-btn" 
                title={copied ? "Copied!" : "Copy Code"}
                onClick={handleCopy}
              >
                {copied ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                )}
              </button>
              <button 
                className="code-action-btn" 
                title="Close"
                onClick={toggleFullscreen}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
          </div>
          <pre className="code-fullscreen-content">
            <code 
              className={`language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        </div>
      </div>
    );
  }

  return codeBlock;
};

export default CodeHighlight;
