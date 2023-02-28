import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

test('renders without errors', () => {
	render(<Show />);
});

test('renders Loading component when prop show is null', () => {
	render(<Show show={false} />);
	screen.getByText('Fetching data...');
});

test('renders same number of options seasons are passed in', () => {
	render(
		<Show
			show={{
				seasons: [
					{
						id: 1,
						name: 'Season 1',
					},
					{
						id: 2,
						name: 'Season 2',
					},
					{
						id: 3,
						name: 'Season 3',
					},
				],
			}}
			selectedSeason={'none'}
		/>
	);

	expect(screen.getAllByTestId('season-option')).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {
	const mockHandleSelect = jest.fn();
	render(
		<Show
			handleSelect={mockHandleSelect}
			show={{
				seasons: [
					{
						id: 1,
						name: 'Season 1',
					},
					{
						id: 2,
						name: 'Season 2',
					},
					{
						id: 3,
						name: 'Season 3',
					},
				],
			}}
			selectedSeason={'none'}
		/>
	);

	const select = screen.getByRole('combobox');
	fireEvent.change(select, { target: { value: 1 } });
	expect(select.value).toBe('1');

	fireEvent.change(select, { target: { value: 3 } });
	expect(select.value).toBe('3');
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
	const { rerender } = render(
		<Show
			show={{
				seasons: [],
			}}
			selectedSeason={'none'}
		/>
	);

	rerender(
		<Show
			show={{
				seasons: [
					{
						id: 1,
						name: 'Season 1',
						episodes: [
							{
								id: 1,
							},
							{
								id: 2,
							},
						],
					},
					{
						id: 2,
						name: 'Season 2',
						episodes: [
							{
								id: 3,
							},
						],
					},
					{
						id: 3,
						name: 'Season 3',
						episodes: [
							{
								id: 4,
							},
						],
					},
				],
			}}
			selectedSeason={'1'}
		/>
	);
});
