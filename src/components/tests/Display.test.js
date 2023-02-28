import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

test('renders without errors with no props', async () => {
	// renders with no errors
	render(<Display />);
});

test('renders Show component when the button is clicked ', async () => {
	render(<Display />);
	const button = screen.getByRole('button');
	fireEvent.click(button);
	await waitFor(() => {
		expect(screen.getByTestId('show-container')).toBeVisible();
	});
});

test('renders show season options matching your data when the button is clicked', async () => {
	render(<Display />);
	const button = screen.getByRole('button');
	fireEvent.click(button);

	await waitFor(() => {
		const select = screen.getByRole('combobox');
		select.change(select, { target: { value: '0' } });
		expect(screen.getByText('Chapter One: The Vanishing of Will Byers'));
	});
});
