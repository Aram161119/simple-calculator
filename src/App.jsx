import styles from './app.module.css';
import { useState } from 'react';

const buttons = ['7', '8', '9', 'C', '4', '5', '6', '+', '1', '2', '3', '-', '0', '='];
const operationBtns = ['-', '+', '=', 'C'];

export const App = () => {
	const [input, setInput] = useState('');
	const [color, setColor] = useState('white');

	const handleClick = (value) => {
		if (value === 'C') return setInput('');
		if (value === '=') {
			try {
				setInput(eval(input).toString()); //eval usage is danger
				setColor('#d014ff');
			} catch {
				setInput('Ошибка');
			}
			return;
		}

		setColor('white');
		setInput((prev) => prev + value);
	};

	const getClassName = (btn) => {
		let className = styles.calcBtn;

		if (operationBtns.includes(btn)) {
			className += ` ${styles.operationBtn}`;
		}

		if (btn === '0') {
			className += ` ${styles.zero}`;
		}

		return className.trim();
	};

	return (
		<>
			<div className={styles.calcWrapper}>
				<input
					type="text"
					className={styles.calcDisplay}
					style={{ color }}
					value={input}
					disabled
				/>
				<div className={styles.calcGrid}>
					{buttons.map((btn, idx) => (
						<button
							key={idx}
							className={getClassName(btn)}
							onClick={() => handleClick(btn)}
						>
							{btn}
						</button>
					))}
				</div>
			</div>
		</>
	);
};
