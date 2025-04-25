import styles from './app.module.css';
import { useState } from 'react';

const NUMS = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];
const OPERATORS = ['=', '+', '-', 'C'];

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [color, setColor] = useState('white');
	const [disabledOperation, setDisabledOperation] = useState(false);

	const display = (operand1 + operator + operand2).replace(/^0+(?!$)/, ''); // for delete zero in start

	const handleClick = (num) => {
		setColor('white');

		if (!operator) {
			setOperand1((prev) => prev + num);
		} else {
			setDisabledOperation(true);
			setOperand2((prev) => prev + num);
		}
	};

	const handleOperatorClick = (oper) => {
		if (oper === '=') {
			return handleEqualClick();
		}

		if (oper === 'C') {
			setColor('white');
			setOperand1('');
			setOperand2('');
			setOperator('');
			setDisabledOperation(false);
			return;
		}

		setOperator(oper);
	};

	const handleEqualClick = () => {
		setColor('#ab00ff');
		setDisabledOperation(false);

		if (operand1 && operator && operand2) {
			const result = calculate();
			setOperand1(result);
			setOperand2('');
			setOperator('');
		}
	};

	const calculate = () => {
		const num1 = parseFloat(operand1);
		const num2 = parseFloat(operand2);
		if (isNaN(num1) || isNaN(num2)) return operand1;

		const operations = {
			'+': (a, b) => a + b,
			'-': (a, b) => a - b,
		};

		const operation = operations[operator];
		return operation ? operation(num1, num2) : num1;
	};

	const getClassName = (btn) => {
		let className = styles.btn;

		if (OPERATORS.includes(btn)) {
			className += ` ${styles.operationBtn}`;
		}

		if (btn === '0') {
			className += ` ${styles.zero}`;
		}

		return className.trim();
	};

	const isDisabled = (oper) => {
		return disabledOperation && (oper === '+' || oper === '-');
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.display} style={{ color }}>
				{display || '0'}
			</div>
			<div style={{ display: 'flex' }}>
				<div className={styles.grid}>
					{NUMS.map((btn, idx) => (
						<button
							key={idx}
							className={getClassName(btn)}
							onClick={() => handleClick(btn)}
						>
							{btn}
						</button>
					))}
				</div>
				<div className={styles.operations}>
					{OPERATORS.map((oper, index) => (
						<button
							key={index}
							onClick={() => handleOperatorClick(oper)}
							className={getClassName(oper)}
							disabled={isDisabled(oper)}
						>
							{oper}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};
