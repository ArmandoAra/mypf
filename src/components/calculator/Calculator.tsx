// Calculator.tsx
import React, { useState } from 'react';
import "./styles.css";

interface CalculatorProps {
    onClose: () => void;
    onApply: (amount: number) => void;
    currentAmount: number;
}

const Calculator: React.FC<CalculatorProps> = ({ onClose, onApply, currentAmount }) => {
    const [expression, setExpression] = useState(currentAmount.toString());

    const handleButtonClick = (value: string) => {
        setExpression((prev) => prev + value);
    };

    const handleClear = () => {
        setExpression('');
    };

    const handleCalculate = () => {
        try {
            const result = eval(expression);
            onApply(result.toFixed(2));
            onClose();
        } catch {
            alert('Invalid Expression');
            handleClear();
        }
    };

    return (
        <div className="calculator-modal">
            <div className="calculator-display">
                <label title='value'><input type="text" value={expression} readOnly /></label>
            </div>
            <div className="calculator-buttons">
                {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
                    <button key={btn} onClick={() => (btn === '=' ? handleCalculate() : handleButtonClick(btn))}>
                        {btn}
                    </button>
                ))}
                <button onClick={handleClear}>C</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Calculator;
