import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookOverviewAndDetails from '../../components/BookOverviewAndDetails';

test('BookOverviewAndDeatils component', () => {
    let object = {
        book_description: "abc",
        genre_type: "xzy",
        release_date: 2024,
        number_of_page: 123
    };
    render(<BookOverviewAndDetails bookData={object} />);
    const bookDescription = screen.getByText(/abc/i);
    const genreType = screen.getByText(/xzy/i);
    const releaseDate = screen.getByText(/2024/i);
    const numberOfPage = screen.getByText(/123/i);
    expect(bookDescription).toBeInTheDocument();  
    expect(genreType).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(numberOfPage).toBeInTheDocument();
})