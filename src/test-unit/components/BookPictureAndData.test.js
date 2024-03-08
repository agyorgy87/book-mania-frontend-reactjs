import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookPictureAndData from '../../components/BookPictureAndData';

test('BookPictureAndData component', () => {
    let object = {
        img_directory: "folder",
        image_big: "picturepng",
        title: "xzy",
        author_name: "asd"
    };
    render(<BookPictureAndData bookData={object} />);
    //const img_directory = screen.getByText(/folder/i);
    //const image_big = screen.getByText(/picturepng/i);
    const title = screen.getByText(/xzy/i);
    const author_name = screen.getByText(/asd/i);
    //expect(img_directory).toBeInTheDocument();  
    //expect(image_big).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(author_name).toBeInTheDocument();
})