import React from "react";

function Button({ text, children, onClick, className = "", disabled = false, ...props }) {
	return (
		<button onClick={onClick} disabled={disabled}
			className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all  
						focus:outline-none focus:ring-2 focus:ring-offset-2 
						${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
        	${className} `} {...props} >
			{children || text}
		</button>
	);
}

export default Button;