import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: keyof typeof variantClass
	size?: 'icon' | 'default' | 'lg' | 'sm'
}

const variantClass = {
	default: 'bg-slate-900 text-white',
	primary: 'bg-primary text-white',
	secondary: 'bg-slate-200',
	success: 'bg-success',
	danger: 'bg-danger',
	warning: 'bg-warning',
	info: 'bg-info',
	outline: 'border border-slate-500 text-slate-800',
	ghost: 'hover:bg-accent hover:text-accent-foreground',
	link: 'text-primary underline-offset-4 hover:underline'
}

const sizeClass = {
	default: 'h-9 px-4 py-2',
	sm: 'h-8 rounded-md px-3 text-xs',
	lg: 'h-10 rounded-md px-8',
	icon: 'h-9 w-9 inline-flex justify-center items-center'
}

const Button: React.FC<ButtonProps> = ({
	size = 'default',
	className,
	variant = 'default',
	children,
	...props
}) => {
	return (
		<button
			className={`cursor-pointer rounded-md transition-transform duration-300 hover:brightness-90 ${sizeClass[size]} ${className} ${variantClass[variant]} `}
			{...props}
		>
			{children}
		</button>
	)
}

export default Button
