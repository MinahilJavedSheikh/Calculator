import React, { useState, useEffect } from 'react';
import './Calculator.css';
import { evaluate } from 'mathjs';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('');

  const handleButtonClick = (value) => {
    setDisplayValue((prevValue) => prevValue + value);
  };

  const handleClear = () => {
    setDisplayValue('');
  };

  const handleDelete = () => {
    setDisplayValue((prevValue) => prevValue.slice(0, -1));
  };

  const handleEvaluate = () => {
    try {
      const result = evaluate(displayValue);
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key;
  
    if (/[0-9+\-*/.=]/.test(key)) {
      // Allow only numeric and operator keys
      handleButtonClick(key);
    } else if (key === 'Enter') {
      // Prevent default behavior to avoid form submission
      event.preventDefault();
      
      // Evaluate on Enter key
      handleEvaluate();
    } else if (key === 'Escape') {
      // Clear on Escape key
      handleClear();
    }
  };
  

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('keydown', handleKeyPress);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [displayValue]);

  return (
    <div className="container">
      <div className="calculator">
        <form>
          <div className="display">
            <input type="text" name="display" value={displayValue} readOnly />
          </div>
          <div>
            <input type="button" value="AC" onClick={handleClear} />
            <input type="button" value="DE" onClick={handleDelete} />
            <input type="button" value="." onClick={() => handleButtonClick('.')} />
            <input type="button" value="/" onClick={() => handleButtonClick('/')} />
          </div>
          <div>
            <input type="button" value="7" onClick={() => handleButtonClick('7')} />
            <input type="button" value="8" onClick={() => handleButtonClick('8')} />
            <input type="button" value="9" onClick={() => handleButtonClick('9')} />
            <input type="button" value="*" onClick={() => handleButtonClick('*')} />
          </div>
          <div>
            <input type="button" value="4" onClick={() => handleButtonClick('4')} />
            <input type="button" value="5" onClick={() => handleButtonClick('5')} />
            <input type="button" value="6" onClick={() => handleButtonClick('6')} />
            <input type="button" value="+" onClick={() => handleButtonClick('+')} />
          </div>
          <div>
            <input type="button" value="1" onClick={() => handleButtonClick('1')} />
            <input type="button" value="2" onClick={() => handleButtonClick('2')} />
            <input type="button" value="3" onClick={() => handleButtonClick('3')} />
            <input type="button" value="-" onClick={() => handleButtonClick('-')} />
          </div>
          <div>
            <input type="button" className="special" value="0" onClick={() => handleButtonClick('0')} />
            <input type="button" value="=" onClick={handleEvaluate} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Calculator;
